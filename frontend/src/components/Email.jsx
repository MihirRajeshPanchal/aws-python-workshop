import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Email = () => {
  const [email, setEmail] = useState('');
  const [emailTitle, setEmailTitle] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [publishMessage, setPublishMessage] = useState('');

  const handleSubscribe = async () => {
    const formData = new FormData();
    formData.append('email', email);

    try {
      const response = await axios.post('https://aws-python-workshop.onrender.com/sns_subscribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubscribeMessage(response.data.message);
    } catch (error) {
      setSubscribeMessage(error.response.data.error);
    }
  };

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append('email_title', emailTitle);
    formData.append('email_content', emailContent);

    try {
      const response = await axios.post('https://aws-python-workshop.onrender.com/sns_publish', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPublishMessage(response.data.message);
    } catch (error) {
      setPublishMessage(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">Subscribe to Email</h2>
        <div className="mb-4 flex items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 flex-grow rounded-l"
            placeholder="Enter your email"
          />
          <button
            onClick={handleSubscribe}
            className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none flex items-center"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Subscribe
          </button>
        </div>
        {subscribeMessage && <p className="mt-4 text-green-500">{subscribeMessage}</p>}
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Publish Email</h2>
          <button
            onClick={handlePublish}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none flex items-center"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Publish
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailTitle">
            Email Title
          </label>
          <input
            id="emailTitle"
            type="text"
            value={emailTitle}
            onChange={(e) => setEmailTitle(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Enter email title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailContent">
            Email Content
          </label>
          <textarea
            id="emailContent"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="border p-2 w-full rounded h-32"
            placeholder="Enter email content"
          />
        </div>
        {publishMessage && <p className="mt-4 text-green-500">{publishMessage}</p>}
      </div>
    </div>
  );
};

export default Email;
