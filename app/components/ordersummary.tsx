'use client';
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// define types to use in the component logic and UI design

// breaks down the product data into its individual parts
type Product = {
    name: string;
    quantity: string;
    image: string;
    price: number;
    shippingStyle: string;
  };

  // takes in the form data from the previous page
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
    shippingMethod: string;
  };
  
  interface GroupedProducts {
    [key: string]: Product[];
  }
  
  const Trying = () => {
    const router = useRouter();
  
    // Wrap useSearchParams in Suspense
    const searchParams = useSearchParams();
    const formDataString = searchParams.get('data'); // takes in prior page information
    const formData: FormData = formDataString ? JSON.parse(decodeURIComponent(formDataString)) : { products: [] }; // breaks down the Serialized data into its individual parts 
    
    // calculates the total amount of
    const totalAmount = formData.products.reduce((total, product) => total + product.price * Number(product.quantity), 0);
    
    const handleSubmit = () => {
      router.push(`/confirmation`);
    };
  
    // Group products by shipping style
    const groupedProducts: GroupedProducts = formData.products.reduce((groups: GroupedProducts, product) => {
        const style = product.shippingStyle || 'Standard';
        if (!groups[style]) {
            groups[style] = [];
        }
        groups[style].push(product);
        return groups;
        }, {});

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='w-full mt-4 min-h-full flex justify-center bg-repeat-x bg-bottom' style={{ backgroundImage: "url('')" }}>
                <div className='w-7/8 md:w-1/2 flex flex-col justify-center'>
                <img src="./assets/cubeLogo.svg" alt="" className='w-24 justify-center mx-auto' />
                <div className='flex flex-col card p-4 0 w-full'>
                    <h1 className='text-2xl font-bold w-full flex '>Order&nbsp;<span className='text-primary'> Placed</span>!</h1>
                    
                    {Object.keys(groupedProducts).map((style, index) => (
                    <div key={index} className='card mt-4 w-full border-2 p-4'>
                        <p className='border-b-2 pb-2 text-lg font-semibold'>Arriving: &nbsp;<span className='text-primary'>{style}</span></p>
                        <div className='max-h-96 overflow-y-auto'>
                        <table className="table w-full">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody className='border-b'>
                            {groupedProducts[style].map((product, index) => (
                                <tr key={index}>
                                <th><img src={product.image} alt={product.name} className='w-16' /></th>
                                <td>{product.name}<br /> <p className='text-xs text-gray-500'>Qty: {product.quantity}</p></td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>${(product.price * Number(product.quantity)).toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    ))}

                    <div className='w-full grid grid-cols-2 mt-4'>
                    <div className='col-span-1'>
                        <div className='w-full'>
                        <div className='flex flex-col justify-normal m-4'>
                            <div className='text-left text-sm text-gray-400 mb-4'>
                            <p>{formData.firstName} {formData.lastName}</p>
                            <p>{formData.addressLine1} {formData.aptSuite}</p>
                            <p>{formData.city}, {formData.state}, {formData.zipCode}, USA</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='w-full'>
                        <h2 className='text-xl font-bold text-right mr-8'>Total: ${totalAmount.toFixed(2)}</h2>
                        </div>
                        <div className='w-full'>
                        <h2 className='text-sm font-normal text-right text-gray-400 mr-8 '>Email: <br />{formData.email}</h2>
                        </div>
                    </div>
                    </div>

                    <div className='w-full flex justify-end '>
                    <button className='btn btn-primary w-1/8 mr-8 mt-2' onClick={handleSubmit}>Continue</button>
                    </div>
                </div>
                </div>
                <div className="hidden max-w-max max-h-max md:flex bottom-0 md:bottom-4 md:right-4 mt-6 pt-4 flex-col fixed items-center justify-center z-50">
                <img className="w-1 md:w-12" src="./assets/cubeLogo.svg" alt="Flying Package" />
                <p className="text-gray-500 text-xs md:text-sm">powered by Thryft Ship</p>
                </div>
            </div>
        </Suspense>
        );
    };

export default Trying;
