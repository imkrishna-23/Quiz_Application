import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StartPage from './components/StartPage';
import Question from './components/Question';
import OverviewPanel from './components/OverviewPanel';
import ReportPage from './components/ReportPage';
import Timer from './components/Timer';

const App = () => {
  // State variables for managing quiz data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  // Function to handle timer completion
  const handleTimerComplete = () => {
    alert('Time is up! Quiz will be auto-submitted.');
    handleAnswerSubmit('auto-submit');
  };

  // Function to handle initial email submission and start the quiz
  const handleSubmitEmail = () => {
    setQuizStarted(true);
    setCurrentQuestion(1);
  };

  // Function to handle user's answer submission for a question
  const handleAnswerSubmit = (answer) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion - 1] = answer;
    setUserAnswers(updatedUserAnswers);

    // Update visited questions list
    if (!visitedQuestions.includes(currentQuestion)) {
      setVisitedQuestions([...visitedQuestions, currentQuestion]);
    }

    // Update attempted questions list
    if (!attemptedQuestions.includes(currentQuestion) && answer !== undefined) {
      setAttemptedQuestions([...attemptedQuestions, currentQuestion]);
    }

    // If the current question is the last one, show confirmation and submit
    if (currentQuestion === 15) {
      const confirmation = window.confirm('Are you sure you want to submit the quiz?');
      if (confirmation) {
        // Display results immediately after confirming submission
        onSubmit();
        setCurrentQuestion(16); // Set currentQuestion to a value that will not match any question index to prevent further navigation
      }
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  // Function to handle marking a question for review
  const handleMarkForReview = () => {
    const updatedReviewQuestions = [...reviewQuestions];

    if (!updatedReviewQuestions.includes(currentQuestion)) {
      updatedReviewQuestions.push(currentQuestion);
    } else {
      // If already marked for review, remove it from review questions
      const index = updatedReviewQuestions.indexOf(currentQuestion);
      updatedReviewQuestions.splice(index, 1);
    }

    setReviewQuestions(updatedReviewQuestions);
  };

  // Function to navigate between questions
  const onNavigate = (destination) => {
    if (destination === 'prev') {
      setCurrentQuestion((prevQuestion) => Math.max(prevQuestion - 1, 1));
    } else if (destination === 'next') {
      setCurrentQuestion((prevQuestion) => Math.min(prevQuestion + 1, questions.length));
    } else {
      setCurrentQuestion(destination);
    }
  };

  // Function to handle final quiz submission
  const onSubmit = () => {
    // Handle the final submission logic here
    console.log('Quiz submitted!');
    // You can display the results or navigate to a results page as needed
  };

  // Fetch quiz questions from the API on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=15');
        setQuestions(response.data.results);
        console.log('Fetched questions:', response.data.results);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Render the main component structure
  return (
    <div>
      {/* Render StartPage component when quiz hasn't started */}
      {currentQuestion === 0 && !quizStarted && (
        <StartPage setName={setName} setEmail={setEmail} handleSubmitEmail={handleSubmitEmail} />
      )}

      {/* Render Timer and Question components during quiz */}
      {quizStarted && currentQuestion > 0 && currentQuestion <= 15 && questions.length > 0 && (
        <div>
          <Timer initialTime={30 * 60} onTimerComplete={handleTimerComplete} />
          <Question
            question={questions[currentQuestion - 1]}
            questionNumber={currentQuestion}
            onSubmitAnswer={handleAnswerSubmit}
            onNavigate={(newQuestion) => setCurrentQuestion(newQuestion)}
          />
        </div>
      )}

      {/* Render ReportPage component after the quiz is completed */}
      {quizStarted && currentQuestion > 15 && (
        <ReportPage
          userAnswers={userAnswers}
          correctAnswers={questions.map((q) => q.correct_answer)}
        />
      )}

      {/* Render OverviewPanel component during the quiz */}
      {quizStarted && currentQuestion <= 15 && (
        <OverviewPanel
          visitedQuestions={visitedQuestions}
          attemptedQuestions={attemptedQuestions}
          reviewQuestions={reviewQuestions}
          onNavigate={onNavigate}
          onSubmit={handleAnswerSubmit}
          onMarkForReview={handleMarkForReview}
          userAnswers={userAnswers}
          questions={questions}
        />
      )}
    </div>
  );
};

export default App;
