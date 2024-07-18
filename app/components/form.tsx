'use client'
import React, { useRef, useState } from 'react';
import Router, { useRouter } from 'next/navigation';


type Product = {
  name: string;
  quantity: string;
  image: string;
  price: number;
  shippingStyle: string;
};

type FormData = {
  instagramHandle: string;
  products: Product[];
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  aptSuite: string;
  city: string;
  state: string;
  zipCode: string;
};

type FormErrors = {
  [key: string]: string;
};

const ShippingForm: React.FC = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    instagramHandle: '',
    products: [{ name: '', quantity: '1', image: '', price: 0, shippingStyle: 'Next Day' }],
    email: '',
    confirmEmail: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    aptSuite: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    confirmEmail: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    products: ''
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formErrors: FormErrors = {};
    let hasErrors = false;

    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
      hasErrors = true;
    }
    if (!formData.confirmEmail.trim()) {
      formErrors.confirmEmail = 'Confirm Email is required';
      hasErrors = true;
    }
    if (!formData.firstName.trim()) {
      formErrors.firstName = 'First Name is required';
      hasErrors = true;
    }
    if (!formData.lastName.trim()) {
      formErrors.lastName = 'Last Name is required';
      hasErrors = true;
    }
    if (!formData.addressLine1.trim()) {
      formErrors.addressLine1 = 'Address Line 1 is required';
      hasErrors = true;
    }
    if (!formData.city.trim()) {
      formErrors.city = 'City is required';
      hasErrors = true;
    }
    if (!formData.state.trim()) {
      formErrors.state = 'State is required';
      hasErrors = true;
    }
    if (!formData.zipCode.trim()) {
      formErrors.zipCode = 'Zip Code is required';
      hasErrors = true;
    }

    if (formData.email.trim() !== formData.confirmEmail.trim()) {
      formErrors.confirmEmail = 'Email addresses do not match';
      hasErrors = true;
    }

    formData.products.forEach((product, index) => {
      if (!product.name.trim()) {
        formErrors[`product-${index}`] = 'Product is required';
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(formErrors);
      return;
    } else {
      setErrors({
        email: '',
        confirmEmail: '',
        firstName: '',
        lastName: '',
        addressLine1: '',
        city: '',
        state: '',
        zipCode: '',
        products: ''
      });
    }

    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = event.target;
    if (index !== undefined) {
      setFormData(prevState => {
        const updatedProducts = [...prevState.products];
        if (name.startsWith('product-')) {
          const selectedProduct = products.find(product => product.name === value);
          updatedProducts[index] = {
            ...updatedProducts[index],
            name: value,
            price: selectedProduct ? selectedProduct.price : 0,
            image: selectedProduct ? selectedProduct.image : '',
            shippingStyle: 'Next Day'
          };
        } else if (name.startsWith('shippingStyle-')) {
          updatedProducts[index] = {
            ...updatedProducts[index],
            shippingStyle: value
          };
        } else {
          updatedProducts[index] = {
            ...updatedProducts[index],
            quantity: value
          };
        }
        return {
          ...prevState,
          products: updatedProducts
        };
      });
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const addMore = () => {
    setFormData(prevState => ({
      ...prevState,
      products: [...prevState.products, { name: '', quantity: '1', price: 0, image: '', shippingStyle: '' }]
    }));
  };

  const deleteLast = () => {
    if (formData.products.length > 1) {
      setFormData(prevState => ({
        ...prevState,
        products: prevState.products.slice(0, -1)
      }));
    }
  };

  const calculateTotalCost = () => {
    return formData.products.reduce((total, product) => {
      return total + product.price * parseInt(product.quantity, 10);
    }, 0).toFixed(2);
  };

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const products = [
    { id: 1, name: 'Orange Kendama', price: 10.99, quantity: 10, image: './assets/orangeKendama.jpg' },
    { id: 2, name: 'Plain Kendama', price: 5.99, quantity: 10, image: './assets/plainKendama.jpg' },
    { id: 3, name: 'Black Kendama', price: 12.99, quantity: 10, image: './assets/blackKendama.jpg' },
    { id: 4, name: 'Green Kendama', price: 4.99, quantity: 10, image: './assets/greenKendama.jpg' },
    { id: 5, name: 'Gray Kendama', price: 10.99, quantity: 10, image: './assets/grayKendama.jpg' }
  ];

  const shippingStyles = [
    'Next Day',
    '3-5 Business Days'
  ];

  const handleModalSubmit = () => {
    modalRef.current?.close();

    const serializedData = encodeURIComponent(JSON.stringify(formData));
    console.log(formData.products);
    router.push(`/orderconfirmation?data=${serializedData}`);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-11/12 md:w-2/5 bg-white p-6 rounded-lg">
      <div className="relative mb-16 text-right ">
        <h1 className="relative text-2xl font-bold mt-8">
          Thank you for <br /> purchasing <br />from <a href="#" className="text-blue-600">[thryfter]</a>
        </h1>
        <div className=" w-24 h-24 md:w-72 md:h-72 mx-auto ml-12 -mt-32 bg-center bg-no-repeat bg-contain" style={{ backgroundImage: "url('/assets/onlineshopping.svg')" }}></div>
      </div>

        <div className="mb-6 pb-4">
          <h2 className="text-xl font-bold">Your Shipping Information</h2>
          <p>Your Instagram Handle helps us match your address to your purchase. We will send your shipment tracking information to your email.</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Instagram Handle</span>
            </label>
            <input 
              type="text"
              name="instagramHandle"
              value={formData.instagramHandle}
              onChange={(e) => handleChange(e)}
              placeholder="@"
              className="input input-bordered w-full"
            />
          </div>

          {formData.products.map((product, index) => (
            <div key={index} className="grid grid-cols-12 gap-2">
              <div className="form-control mb-4 col-span-6 md:col-span-8">
                <label className="label">
                  <span className="label-text">Product {index + 1}</span>
                </label>
                <select
                  name={`product-${index}`}
                  value={formData.products[index]?.name || ''}
                  onChange={(e) => handleChange(e, index)}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name} - ${product.price}
                    </option>
                  ))}
                </select>
                {errors[`product-${index}`] && (
                  <span className="text-red-500">{errors[`product-${index}`]}</span>
                )}
              </div>
              <div className="form-control mb-4 col-span-3 md:col-span-2">
                <label className="label">
                  <span className="label-text">Shipping</span>
                </label>
                <select
                  name={`shippingStyle-${index}`}
                  value={formData.products[index]?.shippingStyle || 'Next Day'}
                  onChange={(e) => handleChange(e, index)}
                  className="select select-bordered w-full"
                >
                  {shippingStyles.map((style, idx) => (
                    <option key={idx} value={style}>{style}</option>
                  ))}
                </select>
                {errors[`shippingStyle-${index}`] && (
                  <span className="text-red-500">{errors[`shippingStyle-${index}`]}</span>
                )}
              </div>
              <div className="form-control mb-4 col-span-3 md:col-span-2">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.products[index]?.quantity || ''}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Qty"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          ))}



          <div className="grid grid-cols-6 gap-1 mb-4">
            <button type="button" className="text-primary col-span-1 text-xs" onClick={addMore}>Add More</button>
            <button type="button" className="text-primary col-span-1 text-xs" onClick={deleteLast}>Delete Last</button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="form-control col-span-2 md:col-span-1 mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full"
              />
              {errors && errors.email && (
                <p className="text-red-500 text-sm mt-1 -mb-4">{errors.email}</p>
              )}
            </div>
            <div className="form-control col-span-2 md:col-span-1 mb-4">
              <label className="label">
                <span className="label-text">Confirm Email</span>
              </label>
              <input 
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full"
              />
              {errors && errors.confirmEmail && (
                <p className="text-red-500 text-sm mt-1 -mb-4">{errors.confirmEmail}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input 
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full"
              />
              {errors && errors.firstName && (
                <p className="text-red-500 text-sm mt-1 -mb-4">{errors.firstName}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input 
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full"
              />
              {errors && errors.lastName && (
                <p className="text-red-500 text-sm mt-1 -mb-4">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Address Line 1</span>
            </label>
            <input 
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={(e) => handleChange(e)}
              className="input input-bordered w-full"
            />
            {errors && errors.addressLine1 && (
              <p className="text-red-500 text-sm mt-1 -mb-4">{errors.addressLine1}</p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Apartment, Suite, Etc. (opt)</span>
            </label>
            <input 
              type="text"
              name="aptSuite"
              value={formData.aptSuite}
              onChange={(e) => handleChange(e)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input 
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full"
                placeholder='City'
              />
              {errors && errors.city && (
                <p className="text-red-500 text-sm mt-1 -mb-4">{errors.city}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">State</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={(e) => handleChange(e)}
                className="select select-bordered w-full"
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
              {errors && errors.state && (
                <p className="text-red-500 text-sm mt-1 -mb-4">{errors.state}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Zip Code</span>
              </label>
              <input 
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleChange(e)}
                placeholder='XXXXX'
                className="input input-bordered w-full"
              />
              {errors && errors.zipCode && (
                <p className="text-red-500 text-sm mt-1 -mb-4">{errors.zipCode}</p>
              )}
            </div>
          </div>

          <div className="form-control mb-4 mt-8 items-center">
            <button type="submit" className="w-1/2 flex items-center btn btn-primary">Submit</button>
          </div>
        </form>

        <div className="text-center mt-6 border-t pt-4">
          <p className="text-gray-500">powered by Thryft Ship</p>
          <p className="text-gray-500">© 2024 Sriram Sendhil</p>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal bg-opacity-50 bg-blue-600" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Confirm Shipping Details</h3>
          <div className='text-center'>
            <p>{formData.firstName} {formData.lastName}</p>
            <p>{formData.addressLine1} {formData.city} {formData.state} {formData.zipCode}</p>
            <p>{formData.email}</p>
             <h4 className="font-bold mt-4 place-items-center">Products:</h4>
             {formData.products.map((product, index) => (
                <div className='grid grid-cols-3 gap-2 items-center mb-2' key={index}>
                  <p className='col-span-2'> {product.name}: {product.quantity} - {product.shippingStyle}</p>
                  <img src={product.image} alt={`Product ${index + 1}`} className="w-16" />
                </div>
              ))}

              <h4 className="font-bold mt-4">Total Cost: ${calculateTotalCost()}</h4>
          </div>
          <div className="modal-action flex justify-center">
            <button className="btn border-primary border-2 text-primary" onClick={() => modalRef.current?.close()}>Cancel and Edit</button>
            <button className="btn btn-primary ml-4" onClick={handleModalSubmit}>Submit</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ShippingForm;
