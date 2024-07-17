import React, { useRef } from 'react';

const ShippingForm: React.FC = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <div className="w-11/12 md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <div className="relative mb-6 text-center">
          <h1 className="relative text-2xl font-bold mt-8">
            Thank you for purchasing from <a href="#" className="text-blue-600">[thryfter]</a>
          </h1>
          <img src="/assets/flying-package.svg" alt="Flying Package" className="relative w-16 h-16 mx-auto mt-4" />
        </div>
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl font-bold">Your Shipping Information</h2>
          <p>Your Instagram Handle helps us match your address to your purchase. We will send your shipment tracking information to your email.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Instagram Handle</span>
            </label>
            <input type="text" placeholder="@" className="input input-bordered w-full" />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Product(s)</span>
            </label>
            <input type="text" className="input input-bordered w-full" />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" className="input input-bordered w-full" />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Confirm Email</span>
            </label>
            <input type="email" className="input input-bordered w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input type="text" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input type="text" className="input input-bordered w-full" />
            </div>
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Address Line 1</span>
            </label>
            <input type="text" className="input input-bordered w-full" />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Apartment, Suite, Etc. (opt)</span>
            </label>
            <input type="text" className="input input-bordered w-full" />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input type="text" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">State</span>
              </label>
              <input type="text" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Zip Code</span>
              </label>
              <input type="text" className="input input-bordered w-full" />
            </div>
          </div>
          <div className="form-control mb-4">
            <button type="submit" className="btn btn-primary w-full">Submit</button>
          </div>
        </form>
        <div className="text-center mt-6 border-t pt-4">
          <p className="text-gray-500">powered by Thryft Ship</p>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal" ref={modalRef}>
        <div className="modal-box bg-opacity-50 bg-blue-600">
          <h3 className="font-bold text-lg">Submission Successful</h3>
          <p className="py-4">Thank you for your submission. We will get back to you shortly.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => modalRef.current?.close()}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ShippingForm;
