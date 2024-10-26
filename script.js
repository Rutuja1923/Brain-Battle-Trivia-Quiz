//getting page elements
const homePage = document.getElementById("home-page");
const categoryPage = document.getElementById("category-page");
const resultsPage = document.getElementById("results-page");
const quizPage = document.getElementById("quiz-page");
const postQuestionsPage = document.getElementById("post-questions-page");

//getting home-page elements
const player1Input = document.getElementById('player1-name');
const player2Input = document.getElementById('player2-name');
const startGameButton = document.getElementById('start-game');
const nextButton = document.getElementById("next-btn");
const errorMessage = document.getElementById("error-message");

//getting category-page elements
const categoriesDiv = document.getElementById('categories-div');
const startButton = document.getElementById('start-btn');

//array to keep track of selected categories
let playedCategories = [];
let selectedCategory ;

//player-name validation function
function validateNames() {
    const player1Name = player1Input.value.trim();
    const player2Name = player2Input.value.trim();
    //for empty name
    if (player1Name === '' || player2Name === '') {
        errorMessage.textContent = 'Player name cannot be empty';
        nextButton.disabled = true;
    } 
    //for identical name
    else if (player1Name === player2Name) {
        errorMessage.textContent = 'Identical Names! Enter Valid Names';
        nextButton.disabled = true;
    } 
    //for valid names  - next button - active
    else {
        errorMessage.textContent = '';
        nextButton.disabled = false;
        nextButton.classList.add('active');
        nextButton.style.backgroundColor = 'rgb(181, 228, 140)';
        nextButton.style.color = '#1b4332';
    }
}

//adding event-listeners on player1 and player2 name
player1Input.addEventListener('input', validateNames);
player2Input.addEventListener('input', validateNames);

//adding category page and removing home page
nextButton.addEventListener('click', () => {
    homePage.classList.add('hidden');
    categoryPage.classList.remove('hidden');
});