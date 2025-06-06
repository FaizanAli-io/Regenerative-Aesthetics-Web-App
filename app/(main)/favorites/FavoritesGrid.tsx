'use client';

import React from 'react';
import Loader from '@/app/components/Loader';
import ProductCard from '@/app/components/ProductCard';
import { useWishlist } from '@/lib/hooks/wishlist/use-wishlist';

const FavoritesGrid = () => {
  const { data: wishlist, isLoading, isFetching } = useWishlist();

  return (
    <div className='space-y-10'>
      <div className='grid grid-cols-4 grid-rows-3 gap-5'>
        {isLoading || isFetching ? <Loader /> : <p>No Favorites found</p>}

        {wishlist &&
          wishlist.wishlistItems.length &&
          wishlist.wishlistItems?.map(item => (
            <ProductCard
              product={item.product}
              theme={'light'}
              key={item.id}
              favorite
            >
              <p>{item.product.title}</p>
            </ProductCard>
          ))}
      </div>
    </div>
  );
};

export default FavoritesGrid;
