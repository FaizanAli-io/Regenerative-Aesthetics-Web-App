'use client';

import React from 'react';
import OrderSummary from '../OrderSummary';
import ButtonOutline from '@/app/components/ButtonOutline';
import { useCart } from '@/lib/stores/cart';
import { toast } from 'sonner';
import { useAddToCart } from '@/lib/hooks/cart/use-add-to-cart';
import { useCheckout } from '@/lib/hooks/cart/use-checkout';
import { useRouter } from 'next/navigation';

const SectionPay = () => {
  const address = useCart(state => state.address);
  const router = useRouter(); // Use useRouter for navigation

  const { items: products } = useCart(state => state.cart);
  const { mutate: addToCart, isPending: pendingCart } = useAddToCart();
  const { mutate: checkout, isPending: pendingCheckout } = useCheckout();

  const handleCheckApi = () => {
    if (!address) return;

    checkout(address, {
      onSuccess: () => {
        toast.success('Order placed successfully!');
        router.push('/favorites');
      },
      onError: () => {
        toast.error('Failed to place order!');
      },
    });
  };

  const handleCheckout = () => {
    if (products.length < 0) return toast.error('Your cart is empty!');

    if (!address) {
      console.log(address);
      toast.error('Please add your address!');
      return;
    }

    const cartItems = products.map(item => ({
      id: item.id,
      product_quantity: item.quantity,
    }));

    cartItems.forEach((item, index) => {
      addToCart(item, {
        onSuccess: () => {
          if (index === cartItems.length - 1) handleCheckApi();
        },
        onError: () => {
          toast.error('Failed to add items to cart! ' + index);
        },
      });
    });
  };

  return (
    <section className='grid grid-cols-2 gap-x-10 px-20 py-28'>
      <OrderSummary />
      <div>
        <h2 className='text-3xl mb-5'>Payment</h2>

        <p>
          Prefer to pay only when your order arrives? No problem! With our Cash
          on Delivery option, you can shop confidently and pay in cash when your
          order is delivered to your doorstep.
        </p>
        <p>How it works:</p>

        <ul>
          <li>Select Cash on Delivery at checkout.</li>

          <li>Confirm your shipping details and complete the order.</li>

          <li>
            Pay the total amount in cash to the delivery agent upon receiving
            your package.
          </li>

          <li></li>
        </ul>

        <p>Please Note:</p>
        <ul>
          <li>
            Kindly prepare the exact amount as our delivery personnel may not
            carry change.
          </li>
          <li>A small service fee is applicable for COD orders.</li>
        </ul>

        <ButtonOutline
          className='flex-1 bg-primary-variant2 text-white mt-5'
          onClick={handleCheckout}
          disabled={pendingCart || pendingCheckout}
        >
          Confirm Order
        </ButtonOutline>
      </div>
    </section>
  );
};

export default SectionPay;
