'use client';
import React, { useState, useEffect } from 'react';
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RadioGroup } from '@/components/ui/radio-group';
import AddressItem from '../_components/AddressItem';
import AddressForm from '../_forms/AddressForm';
import { useUserDetails } from '@/lib/hooks/user-details/use-user-details';
import { useCart } from '@/lib/stores/cart';

const SectionAddress = () => {
  const { data: userDetails, isLoading } = useUserDetails();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  // Using the cart store for selectedAddress instead of local state
  const selectedAddress = useCart(state => state.selectedAddress);
  const setSelectedAddress = useCart(state => state.setSelectedAddress);

  const handleEditAddress = (address: any) => {
    console.log('Edit address clicked:', address);
    setEditingAddress(address);
    setDialogOpen(true);
  };

  const handleAddressFormComplete = () => {
    setDialogOpen(false);
    setEditingAddress(null);
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    // Find the selected address data
    const selectedAddressData = userDetails?.find(
      item => String(item.id) === id
    );
    setSelectedAddress(selectedAddressData);
    console.log('Selected address:', selectedAddressData);
  };

  // Set default selected address if available
  useEffect(() => {
    if (userDetails?.length && !selectedAddressId && !selectedAddress) {
      setSelectedAddressId(String(userDetails[0].id));
      setSelectedAddress(userDetails[0]);
    }
  }, [userDetails, selectedAddressId, selectedAddress, setSelectedAddress]);

  const renderAddresses = () => {
    if (isLoading) return <p>Loading...</p>;
    if (!userDetails || userDetails.length === 0) {
      return <p>No addresses found.</p>;
    }
    return userDetails.map((item, index) => (
      <AddressItem
        title={item.label}
        label={item.label}
        address={item.address}
        phone={item.phone}
        id={String(item.id)}
        key={index}
        onEdit={() => handleEditAddress(item)}
        isSelected={selectedAddressId === String(item.id)}
        onSelect={() => handleSelectAddress(String(item.id))}
      />
    ));
  };

  return (
    <section className='px-20 py-28'>
      <Dialog
        open={dialogOpen}
        onOpenChange={open => {
          setDialogOpen(open);
          if (!open) setEditingAddress(null);
        }}
      >
        <h2 className='text-2xl font-semibold mb-8'>Select Address</h2>
        <div className='space-y-5'>
          <RadioGroup
            value={selectedAddressId || ''}
            onValueChange={setSelectedAddressId}
            className='space-y-5'
          >
            {renderAddresses()}
          </RadioGroup>
          <DialogTrigger asChild>
            <img
              src='/icons/add-new-address.svg'
              alt='Add address button'
              className='w-full cursor-pointer'
              onClick={() => setEditingAddress(null)}
            />
          </DialogTrigger>
        </div>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>
              {editingAddress
                ? 'Edit shipping details'
                : 'Add the shipping details'}
            </DialogTitle>
            <DialogDescription>
              Make sure to provide the correct details for shipping.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <AddressForm
              addressData={editingAddress}
              onComplete={handleAddressFormComplete}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SectionAddress;
