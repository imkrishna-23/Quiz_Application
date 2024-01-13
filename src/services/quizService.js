// src/services/quizService.js
const axios = require('axios');

const getQuizQuestions = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=15');
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getQuizQuestions,
};
