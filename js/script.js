const form = document.querySelector("#flashcard-form");
const questionInput = document.querySelector("#question");
const answerInput = document.querySelector("#answer");
const cardsContainer = document.querySelector("#cards-container");

const flashcards = [
  {
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language"
  },
  {
    question: "What does CSS stand for?",
    answer: "Cascading Styles Sheets"
  },
  {
    question: "What language makes web pages interactive",
    answer: "JavaScript"
  }
];

function renderFlashcards() {
  cardsContainer.innerHTML = "";
  flashcards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
    <h3>${card.question}</h3>
    <p>${card.answer}</p>
    `
    cardsContainer.appendChild(cardElement);
  });
}

renderFlashcards();
