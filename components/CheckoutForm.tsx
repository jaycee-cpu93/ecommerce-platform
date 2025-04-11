"use client"
import { useState } from "react";
import { useDarkModeStore } from "@/store/darkMode"; 

const CheckoutForm = () => {
  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const { darkMode } = useDarkModeStore();

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!form.address) tempErrors.address = "Address is required";
    if (!form.phone.match(/^\d{11}$/)) tempErrors.phone = "Enter a valid 11-digit phone number";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) tempErrors.email = "Enter a valid email address";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={`p-4 border rounded-lg`}>
        <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Shipping Details</h2>
        <input type="text" placeholder="Name" className={`w-full p-2 my-2 border rounded ${darkMode ?'text-white bg-night': 'text-night bg-white'}`} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
        <input type="text" placeholder="Address" className={`w-full p-2 my-2 border rounded ${darkMode ?'text-white bg-night': 'text-night bg-white'}`} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        {errors.address && <p className="text-red-500">{errors.address}</p>}
        <input type="tel" placeholder="Phone" className={`w-full p-2 my-2 border rounded ${darkMode ?'text-white bg-night': 'text-night bg-white'}`} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        <input type="email" placeholder="Email" className={`w-full p-2 my-2 border rounded ${darkMode ?'text-white bg-night': 'text-night bg-white'}`} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mt-4">Complete Purchase</button>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`p-6 rounded shadow-lg ${darkMode ? "bg-night": "bg-white"}`}>
            <div className={darkMode? "text-white": "text-night"}>
               <h2 className="text-lg font-bold">Confirm Checkout</h2>
              <p>Are you sure you want to complete this purchase?</p>
            </div>
            <div className="mt-4 flex justify-between">
              <button onClick={() => setShowModal(false)} className="bg-gray-300 p-2 rounded">Cancel</button>
              <button onClick={() => alert(`Thank you for your purchase, ${form.name}!`)} className="bg-green-500 text-white p-2 rounded">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CheckoutForm;