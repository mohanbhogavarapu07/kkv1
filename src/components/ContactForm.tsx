
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'All fields are required' });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message' });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-lg font-playfair mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-lg font-playfair mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-lg font-playfair mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-sm"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300"
        disabled={status.type === 'loading'}
      >
        {status.type === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status.message && (
        <p className={`text-center ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
