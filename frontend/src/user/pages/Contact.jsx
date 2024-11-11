// pages/Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      description: '',
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto  mb-10 mt-10">
      <h1 className="text-4xl font-bold mb-6">Send us an Email</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{8,15}"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
            Suggestions
          </label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#f1921e] text-white px-4 py-2 rounded font-semibold w-full  mb-10"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
