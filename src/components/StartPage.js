import React, { useState } from 'react';

const StartPage = ({ setName, setEmail, handleSubmitEmail }) => {
  // State variables to manage input values
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  // Event handler for name input change
  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  // Event handler for email input change
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  // Event handler for button click to start the quiz
  const handleButtonClick = () => {
    if (nameInput.trim() !== '' && emailInput.trim() !== '') {
      // Set name and email using provided functions
      setName(nameInput);
      setEmail(emailInput);
      // Trigger the function to handle email submission
      handleSubmitEmail();
    } else {
      alert('Please fill in both name and email before starting the quiz.');
    }
  };

  // Render the StartPage component
  return (
    <div className="flex justify-center items-center h-screen bg-white-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-center text-4xl font-bold mb-6 text-blue-500">Quiz</h1>
        <form>
          {/* Name input field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 border rounded w-full"
              onChange={handleNameChange}
              placeholder="Krishna Chandra Maurya"
              required
            />
          </div>
          {/* Email input field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 border rounded w-full"
              onChange={handleEmailChange}
              placeholder="xyz1234@gmail.com"
              required
            />
          </div>
          {/* Start Quiz button */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              className={`${
                nameInput.trim() !== '' && emailInput.trim() !== ''
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-400 cursor-not-allowed'
              } text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300`}
              onClick={handleButtonClick}
              disabled={nameInput.trim() === '' || emailInput.trim() === ''}
            >
              Start Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartPage;
