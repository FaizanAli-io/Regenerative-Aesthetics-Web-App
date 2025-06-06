import { useQuery } from '@tanstack/react-query';
import { CATEGORIES_KEY } from '@/lib/hooks/_cache-keys';
import category, { Category } from '@/lib/services/category-services';

const useCategories = () =>
  useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: async () => {
      try {
        const response = await category.getAll<Category>().request;
        return response.data || [];
      } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
    },
    initialData: [],
  });

export { useCategories };
