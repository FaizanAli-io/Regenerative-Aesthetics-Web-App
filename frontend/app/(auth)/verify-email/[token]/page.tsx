import api from '@/lib/services/api-client';
import axios from 'axios';
import React from 'react';
type Props = {
  params: Promise<{
    token: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { token } = await params;

  try {
    const res = await axios.post(
      'http://localhost:3000/api/v1/users/verify-email/' + token
    );
    // const res = await api.get('/users/verify-email/' + 'asf-234jk');

    console.log(res);
  } catch (ex) {
    console.error('Error verifying email:', ex);
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold'>Verify Email</h1>
      <p className='mt-4 text-lg'>Your email has been verified</p>
      <p className='mt-2 text-lg'>You can now login to your account.</p>
      <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
        Go to login
      </button>
    </div>
  );
};

export default page;
