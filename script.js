const API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next");
let completed = false;
quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
    }
  });
  nextButton.disabled = arrayQuote.length !== arrayValue.length;
  if (!nextButton.disabled) {
    nextButton.classList.add("show");
    completed = true;
    //U+1F3C5
  }
});

function getRandomQuote() {
  return fetch(API_URL)
    .then(response => response.json())
    .then(data => data.content)
    .catch( err => console.log("err: ",err))
}
async function renderNewQuote() {
  console.log("renderNewQuote called")
  let quote = await getRandomQuote();
  if(!quote) quote = "Expand your horizon by destroying your assumptions."
 
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach(character => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  nextButton.classList.remove("show");
  startTimer();
}

let startTime;

function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  if(!completed)
  return Math.floor((new Date() - startTime) / 1000);
  else return "Completed!"
}

renderNewQuote();
