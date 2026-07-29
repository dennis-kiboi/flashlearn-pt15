const form = document.querySelector("#flashcard-form");
const questionInput = document.querySelector("#question");
const answerInput = document.querySelector("#answer");
const cardsContainer = document.querySelector("#cards-container");

// Function to create a single flashcard element from a flashcard object
function createFlashcardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `
    <h3>${card.question}</h3>
    <p class="answer hidden">${card.answer}</p>
    <button class="show-btn">Show Answer</button>
    `;

  const answer = cardElement.querySelector(".answer");
  const showButton = cardElement.querySelector(".show-btn");

  showButton.addEventListener("click", () => {
    answer.classList.toggle("hidden");

    showButton.textContent = answer.classList.contains("hidden")
      ? "Show Answer"
      : "Hide Answer";
  });

  return cardElement;
}

// Initial fetch request on page load
fetch("http://localhost:3000/flashcards")
  .then(res => res.json())
  .then(flashcards => {
    cardsContainer.innerHTML = "";
    flashcards.forEach((card, index) => {
      const cardElement = createFlashcardElement(card);
      cardsContainer.appendChild(cardElement);
    });
  });

// Form submission handler
form.addEventListener("submit", event => {
  event.preventDefault();
  const question = questionInput.value;
  const answer = answerInput.value;

  // add new flashcard using a post request
  fetch("http://localhost:3000/flashcards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question, answer })
  })
    .then(res => res.json())
    .then(createdFlashcard => {
      // update the dom with the new createdFlashcard
      cardsContainer.appendChild(createFlashcardElement(createdFlashcard));
    });

  form.reset();
});
