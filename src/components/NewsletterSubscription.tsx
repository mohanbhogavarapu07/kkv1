import React, { useState } from 'react';
import { subscribeToNewsletter } from '@/lib/api';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      setStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }

    setStatus({ type: 'loading', message: 'Subscribing...' });

    try {
      await subscribeToNewsletter(email.trim());
      setStatus({ type: 'success', message: 'Successfully subscribed to newsletter!' });
      setEmail(''); // Clear form
    } catch (error) {
      console.error('Error:', error);
      setStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.' 
      });
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <h3 className="text-xl font-playfair mb-4">Subscribe to Our Newsletter</h3>
      <p className="text-gray-700 mb-6">
        Stay updated with the latest insights, articles, and resources delivered straight to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300"
          disabled={status.type === 'loading'}
        >
          {status.type === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
        {status.message && (
          <p className={`text-center ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default NewsletterSubscription; 