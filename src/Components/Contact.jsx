import React, { useState } from 'react';
import './Contact.css'; // For styling
import Header from './Header';
import { toast, Toaster } from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsError(false);
        setIsSuccess(false);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '9743bd21-e207-4e33-8b05-0f7260bb1144', // Replace with your Web3Forms access key
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                toast.success("Message sent successfully! 🚀");
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                toast.success("Message not sent try again! 🚀");
            }
        } catch (error) {

            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <>
            <Header />
            <Toaster position="top-center" />
            <h2 style={{ textAlign: 'center' }}>Contact Us</h2>
            {/* <div className='con-t'>

                <p>We’re here to assist you! If you have any questions, encounter any issues, or need support, feel free to reach out to us using the contact form below. Our team will get back to you as soon as possible.

                    Having trouble? Whether it's a technical issue, a suggestion, or general feedback, we’d love to hear from you. Just fill out the form, and we’ll be in touch!

                    Thank you for choosing AI preHub your AI-powered mock interview partner!</p>
            </div> */}
            <div className="contact-form-container">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Send Message
                    </button>
                </form>
            </div>
        </>
    );
};

export default Contact;