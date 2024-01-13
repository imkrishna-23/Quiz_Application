import React, { useEffect } from 'react';

const OverviewPanel = ({ currentQuestion, visitedQuestions, attemptedQuestions, reviewQuestions, onNavigate, onSubmit, onMarkForReview, userAnswers }) => {
  const totalQuestions = 15;

  useEffect(() => {
    // Change the background color of the question box when userAnswers change
    if (userAnswers[currentQuestion - 1]) {
      const questionBox = document.getElementById(`question-box-${currentQuestion}`);
      if (questionBox) {
        questionBox.style.backgroundColor = 'green';
      }
    }
  }, [currentQuestion, userAnswers]);

  // Function to render question boxes
  const renderQuestionBoxes = () => {
    const questionBoxes = [];
    for (let i = 1; i <= totalQuestions; i++) {
      const isVisited = visitedQuestions.includes(i);
      const isAttempted = attemptedQuestions.includes(i);
      const isReview = reviewQuestions.includes(i);

      const userAnswer = userAnswers[i - 1];

      // Dynamically style each question box based on conditions
      questionBoxes.push(
        <div
          key={i}
          id={`question-box-${i}`} // Assign an id to each question box for identification
          className={`p-2 border m-2 cursor-pointer 
                      ${isVisited ? 'bg-red-400' : ''} 
                      ${isAttempted ? 'bg-green-400 ' : ''} 
                      ${isReview ? 'bg-purple-400' : ''}`}
          style={{ backgroundColor: userAnswer ? 'green' : '' }}
          onClick={() => onNavigate(i)}
        >
          {i}
        </div>
      );
    }
    return questionBoxes;
  };

  return (
    <div className="m-8">
      {/* Render question boxes */}
      <div className="flex flex-wrap">{renderQuestionBoxes()}</div>
      <div className="mt-4">
        {/* Display the count of visited, attempted, and review questions */}
        <p className="mb-2">Visited Questions: {visitedQuestions.length}</p>
        <p className="mb-2">Attempted Questions: {attemptedQuestions.length}</p>
        <p className="mb-2">Review Questions: {reviewQuestions.length}</p>
      </div>
      <div className="mt-4 flex space-x-4">
        {/* Navigation buttons */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onNavigate('prev')}
          disabled={visitedQuestions.length === 0 || attemptedQuestions.length === 0}
        >
          Previous
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => onNavigate('next')}
          disabled={visitedQuestions.length === totalQuestions || attemptedQuestions.length === totalQuestions}
        >
          Next
        </button>
        {/* Button to mark a question for review */}
        <button
          className={`bg-green-500 text-white px-4 py-2 rounded`}
          onClick={onMarkForReview}
        >
          Mark for Review
        </button>
      </div>
    </div>
  );
};

export default OverviewPanel;
