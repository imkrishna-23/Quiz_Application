// src/controllers/quizController.js
const { getQuizQuestions } = require('../services/quizService');

const startQuiz = async (req, res) => {
  try {
    const questions = await getQuizQuestions();
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  startQuiz,
};
