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
let player1Name;
let player2Name;
let player1TotScore = 0;
let player2TotScore = 0;
let player1CurrScore = 0 ;
let player2CurrScore = 0 ;
let currentPlayer = 1;
let questionIndex = 1;
let currDifficulty ;
const difficulties = ['easy','medium','hard'];
const scoreList = [10,15,20];
let correctAnswerIndex ;
let selectedAnswer=null ;

//accessing eleemnts from quiz-page
const player1NamePara = document.getElementById('player1-name-para');
const player2NamePara = document.getElementById('player2-name-para');
const p1EasyDiv = document.getElementById('p1-easy');
const p1MediumDiv = document.getElementById('p1-medium');
const p1HardDiv = document.getElementById('p1-hard');
const p2EasyDiv = document.getElementById('p2-easy');
const p2MediumDiv = document.getElementById('p2-medium');
const p2HardDiv = document.getElementById('p2-hard');
const currentPlayerName = document.getElementById('current-player');
const currentCategory = document.getElementById('current-category');
const currentLevel = document.getElementById('current-level');
const questionText = document.getElementById('question-text');
const optionsButtonsDiv = document.getElementById('answer-buttons');
const nextQuestionBtn = document.getElementById('next-question');
const scoreDivPlayer1 = [p1EasyDiv , p1MediumDiv , p1HardDiv ];
const scoreDivPlayer2 = [p2EasyDiv , p2MediumDiv , p2HardDiv ];

//player-name validation function
function validateNames() {
    player1Name = player1Input.value.trim();
    player2Name = player2Input.value.trim();
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

//defining array of requried categories
const requiredCategories = ['Music','Science','Food and Drink','Geography','History','General Knowledge','Arts and Literature','Film','Sport','Words','People','Society and Culture'];
const categoryIconMap = {
  'Music': 'assets/music-icon.png',
  'Science': 'assets/science-icon.png',
  'Food and Drink': 'assets/food-n-drink-icon.png',
  'Geography': 'assets/geography-icon.png',
  'History': 'assets/history-icon.png',
  'General Knowledge': 'assets/general-knowledge-icon.png',
  'Arts and Literature': 'assets/arts-n-literature-icon.png',
  'Film' : 'assets/films-icon.png',
  'Sport': 'assets/sports-icon.png',
  'Words': 'assets/words-icon.png',
  'People': 'assets/people-icon.png',
  'Society and Culture': 'assets/society-culture-icon.png'
};

//generating the category div dynamically
function generateCategoryDiv() {

    requiredCategories.forEach(category => {

    	//creating a div for each category
      	const categoryDiv = document.createElement('div');
      	categoryDiv.classList.add('category-box');

      	//creating an img element for the icon
      	const icon = document.createElement('img');
      	icon.src = categoryIconMap[category];
      	icon.alt = `${category} icon`;
      	categoryDiv.appendChild(icon);

      	//creating a paragraph element for the title
    	const title = document.createElement('p');
    	title.textContent = category;
    	categoryDiv.appendChild(title);

        //appending the div to the container for categories
    	categoriesDiv.appendChild(categoryDiv);   
        
        //adding an event listener when player clicks on any category-div
        categoryDiv.addEventListener('click', () =>{
            //converting to API frinedly format
            selectedCategory =  category.toLowerCase().replace(/\s+/g, '_');  
            //active start button
            startButton.disabled = false;
            startButton.classList.add('active');
            startButton.style.backgroundColor = 'rgb(181, 228, 140)';
            startButton.style.color = '#1b4332';
    
            //adding event-listener for start button 
            startButton.addEventListener('click', () =>{
                categoryPage.classList.add('hidden');
                quizPage.classList.remove('hidden');
                loadQuestion();
                player1CurrScore=0;
                player2CurrScore=0;
                //add to the already selected category list
                playedCategories.push(selectedCategory);    
                //setting the player names for quiz page
                player1NamePara.innerText = player1Name;    
                player2NamePara.innerText = player2Name; 
            });
        });
    });
};

//call the function to generate 
generateCategoryDiv();

//function to shuffle the array containing options
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

//function to set current player name
function setPlayerName(){
    if (currentPlayer == 1){
        return player1Name;
    }
    else{
        return player2Name;
    }
};