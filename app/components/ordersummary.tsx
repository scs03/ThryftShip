'use client';
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type Product = {
  name: string;
  quantity: string;
  image: string;
  price: number;
};

type FormData = {
  instagramHandle: string;
  products: Product[];
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  aptSuite?: string;
  city: string;
  state: string;
  zipCode: string;
};

const Summary = () => {
  const router = useRouter();

  // Wrap useSearchParams in Suspense
  const searchParams = useSearchParams();
  const formDataString = searchParams.get('data');
  const formData: FormData = formDataString ? JSON.parse(decodeURIComponent(formDataString)) : { products: [] };

  const totalAmount = formData.products.reduce((total, product) => total + product.price * Number(product.quantity), 0);

  const handleSubmit = () => {
    router.push(`/confirmation`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='hero h-screen '>
        <div className='card max-h-screen w-5/6 md:w-1/3 min-h-3/4 relative -mt-20'>
          <div className='hero-content flex-col'>
            <div>
              <img src='./assets/cubeLogo.svg' alt='Flying Package' className='w-20 justify-center opacity-0 md:opacity-100'/>
            </div>
            <div className='w-full'>
              <h1 className='text-2xl font-bold border-b w-full flex'>Order Placed!</h1>
            </div>
            <div className='max-h-96 overflow-y-auto '>
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody className='border-b'>
                  {formData.products.map((product, index) => (
                    <tr key={index}>
                      <th><img src={product.image} alt={product.name} className='w-16'/></th>
                      <td>{product.name}<br /> Qty: {product.quantity}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>${(product.price * Number(product.quantity)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='w-full grid grid-cols-2'>
              <div className='col-span-1'>
                <div className='w-full'>
                  <div className='flex flex-col justify-normal m-4'>
                    <div className='text-center text-sm text-gray-400 mb-4'>
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.addressLine1} {formData.city}</p>
                      <p>{formData.state}, {formData.zipCode}, USA</p>
                    </div>
                    <p className='text-center text-xs md:text-sm text-gray-400'>{formData.email}</p>
                  </div>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='w-full'>
                  <h2 className='text-xl font-bold text-right mr-8'>Total: ${totalAmount.toFixed(2)}</h2>
                </div>
                <div className='w-full'>
                  <h2 className='text-md font-medium text-right text-gray-400 mr-8 '>Estimated Delivery: </h2>
                  <h2 className='text-sm font-normal text-right text-gray-400 mr-8 '>Jul 28, 2024 </h2>
                </div>
              </div>
            </div>
            <div className='w-full flex justify-end '>
              <button className='btn btn-primary w-1/8 mr-8 mt-4' onClick={handleSubmit}>Continue</button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:opacity-100 fixed top-12 left-4 md:bottom-4 md:right-4 mt-6 pt-4 w-auto flex-col items-center justify-center z-50">
            <img className="w-12" src="./assets/cubeLogo.svg" alt="Flying Package" />
            <p className="text-gray-500">powered by Thryft Ship</p>
        </div>


      </div>
    </Suspense>
  );
};

export default Summary;