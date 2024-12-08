// Get form and containers
const flashcardForm = document.getElementById('flashcardForm');
const addQuestionBtn = document.getElementById('addQuestionBtn');
const questionsContainer = document.getElementById('questionsContainer');

// this function loads the existing questions
function loadExistingQuestions(subject) {
  const storedData = JSON.parse(localStorage.getItem('flashcards')) || {};
  const existingQuestions = storedData[subject] || [];
  
  const existingQuestionsContainer = document.getElementById('existingQuestionsContainer');
  existingQuestionsContainer.innerHTML = ''; 

  if (existingQuestions.length === 0) {
    existingQuestionsContainer.innerHTML = '<p>No existing questions for this subject.</p>';
    return;
  }

  existingQuestions.forEach((pair, index) => {
    const questionBox = document.createElement('div');
    questionBox.classList.add('question-box');

    questionBox.innerHTML = `
      <div class="question-container">
        <p><strong>Q${index + 1}:</strong> ${pair.question}</p>
      </div>
      <div class="answer-container">
        <p><strong>A${index + 1}:</strong> ${pair.answer}</p>
      </div>
    `;

    existingQuestionsContainer.appendChild(questionBox);
  });
}

// listener to add questions 
addQuestionBtn.addEventListener('click', () => {
  const subject = document.getElementById('subject').value.trim();
  if (!subject) {
    alert('Subject is required before adding questions!');
    return;
  }

  const questionInput = questionsContainer.querySelector('input[name="question"]');
  const answerInput = questionsContainer.querySelector('input[name="answer"]');
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (!question || !answer) {
    alert('Both question and answer are required!');
    return;
  }

  // Appending the new question to the local storage 
  const storedData = JSON.parse(localStorage.getItem('flashcards')) || {};
  if (!storedData[subject]) {
    storedData[subject] = [];
  }
  storedData[subject].push({ question, answer });
  localStorage.setItem('flashcards', JSON.stringify(storedData));

  // clears the inputs for new questions and answers 
  questionInput.value = '';
  answerInput.value = '';

  // loading the existing question
  loadExistingQuestions(subject);
});

flashcardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const subject = document.getElementById('subject').value.trim();
  const questionInput = questionsContainer.querySelector('input[name="question"]');
  const answerInput = questionsContainer.querySelector('input[name="answer"]');
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (subject && question && answer) {
    // Add the current question and answer to local storage before submission
    const storedData = JSON.parse(localStorage.getItem('flashcards')) || {};
    if (!storedData[subject]) {
      storedData[subject] = [];
    }
    storedData[subject].push({ question, answer });
    localStorage.setItem('flashcards', JSON.stringify(storedData));
  }

  // clears the inputs
  questionInput.value = '';
  answerInput.value = '';

  // taking back to home page
  alert('Flashcards saved! Redirecting to home page...');
  window.location.href = 'index.html';
});

// loads existing questions when subject is entered so user can view previous questions 
document.getElementById('subject').addEventListener('input', () => {
  const subject = document.getElementById('subject').value.trim();
  if (subject) {
    loadExistingQuestions(subject);
  }
});
