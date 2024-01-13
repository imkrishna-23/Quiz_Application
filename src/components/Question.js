import React from 'react';

const Question = ({ question, questionNumber, onSubmitAnswer }) => {
  // Destructuring the properties from the 'question' object
  const { question: questionText, correct_answer, incorrect_answers } = question;

  // Combining correct and incorrect options
  const options = [...incorrect_answers, correct_answer];

  // Function to shuffle the options randomly
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Shuffle the options for a random order
  const shuffledOptions = shuffleArray(options);

  // Render the Question component
  return (
    <div className="bg-white m-8">
      {/* Display the question number */}
      <h3 className="text-xl font-bold mb-4">Question {questionNumber}:</h3>
      {/* Display the question text */}
      <p className="mb-6">{questionText}</p>
      {/* Display the options */}
      <h4 className="text-lg font-bold mb-2">Options:</h4>
      <ul>
        {/* Map through shuffled options and create buttons for each */}
        {shuffledOptions.map((option, index) => (
          <li key={index} className="mb-2">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => onSubmitAnswer(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
