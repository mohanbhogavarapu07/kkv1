import transporter from '../config/email.js';

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'poornareddy2714@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h3>Contact us</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};