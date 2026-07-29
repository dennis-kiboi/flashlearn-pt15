const form = document.querySelector("#flashcard-form");
const questionInput = document.querySelector("#question");
const answerInput = document.querySelector("#answer");
const cardsContainer = document.querySelector("#cards-container");

// const flashcards = [
//   {
//     question: "What does HTML stand for?",
//     answer: "HyperText Markup Language"
//   },
//   {
//     question: "What does CSS stand for?",
//     answer: "Cascading Styles Sheets"
//   },
//   {
//     question: "What language makes web pages interactive",
//     answer: "JavaScript"
//   }
// ];

// get data using fetch
fetch("http://localhost:3000/flashcards")
  .then(res => res.json())
  .then(flashcards => renderFlashcards(flashcards));

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

  // console.log(answer.classList.contains("hidden"))

  // if (showButton.textContent === "Show Answer") {
  //   showButton.textContent = "Hide Answer";
  // } else {
  //   showButton.textContent = "Show Answer";
  // }

  showButton.addEventListener("click", () => {
    answer.classList.toggle("hidden");

    // Uncomment one of the solutions to test

    // Hope's solution
    // if (showButton.textContent === "Show Answer") {
    //   showButton.textContent = "Hide Answer";
    // } else {
    //   showButton.textContent = "Show Answer";
    // }

    // Dennis' Solution
    showButton.textContent = answer.classList.contains("hidden")
      ? "Show Answer"
      : "Hide Answer";

    // condition ? value if true : value if false
  });

  return cardElement;
}

function renderFlashcards(flashcards) {
  cardsContainer.innerHTML = "";
  flashcards.forEach((card, index) => {
    const cardElement = createFlashcardElement(card);
    cardsContainer.appendChild(cardElement);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const question = questionInput.value;
  const answer = answerInput.value;

  // flashcards.push({
  //   question,
  //   answer
  // });

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

  // renderFlashcards(); // re-render all cards
  form.reset();
});
