// src/components/ReportPage.js
import React from 'react';

const ReportPage = ({ userAnswers, correctAnswers }) => {
  // Total number of questions in the quiz
  const totalQuestions = 15;

  // Count the number of correct answers
  const correctCount = userAnswers.reduce((count, userAnswer, index) => {
    return userAnswer === correctAnswers[index] ? count + 1 : count;
  }, 0);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 mx-auto mt-12">
      <h3 className="text-3xl font-bold mb-6 text-center text-indigo-600">Quiz Report</h3>
      <div className="mb-8">
        {/* Display the overall score */}
        <p className="text-lg font-semibold text-center text-gray-700">
          You scored {correctCount} out of {totalQuestions} correct!
        </p>
      </div>
      <ul className="space-y-6">
        {userAnswers.map((userAnswer, index) => (
          <li key={index} className="border-b pb-6">
            {/* Display information for each question */}
            <p className="text-gray-700 font-semibold mb-2">
              Question {index + 1}:
              <span className={`ml-2 ${userAnswer === correctAnswers[index] ? 'text-green-500' : 'text-red-500'}`}>
                {userAnswer === correctAnswers[index] ? 'Correct' : 'Incorrect'}
              </span>
            </p>
            <p className="mb-2">Your Answer: {userAnswer}</p>
            <p className="text-gray-600">Correct Answer: {correctAnswers[index]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportPage;
