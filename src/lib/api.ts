const API_BASE_URL = 'https://kk-backend-wra3.onrender.com/api';

export const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribers/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendContactMessage = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send message');
    }
    return data;
  } catch (error) {
    throw error;
  }
}; 