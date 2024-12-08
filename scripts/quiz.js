// Load the current subject and flashcards from localStorage
const subject = localStorage.getItem('currentSubject');
const flashcards = JSON.parse(localStorage.getItem('currentFlashcards')) || [];

// getting the subject title 
const quizTitle = document.getElementById('quizTitle');
quizTitle.textContent = `Quiz: ${subject}`;

//starting from 0 index 
let currentIndex = 0;

const flashcard = document.getElementById('flashcard');
const cardFront = flashcard.querySelector('.card-front');
const cardBack = flashcard.querySelector('.card-back');
const nextBtn = document.getElementById('nextBtn');

//loading thje question
function loadQuestion() {
  if (currentIndex < flashcards.length) {
    const currentFlashcard = flashcards[currentIndex];
    cardFront.textContent = `${currentFlashcard.question}`;
    cardBack.textContent = `${currentFlashcard.answer}`;
    flashcard.classList.remove('flipped');
  } else {
    //this means end of the quiz
    flashcard.style.display = 'none';
    nextBtn.style.display = 'none';
    quizTitle.textContent = 'Quiz Over!';
  }
}

//flipping the card on the click
flashcard.addEventListener('click', () => {
  flashcard.classList.toggle('flipped');
});
//button listener to view next question
nextBtn.addEventListener('click', () => {
  currentIndex++;
  loadQuestion();
});

loadQuestion();
