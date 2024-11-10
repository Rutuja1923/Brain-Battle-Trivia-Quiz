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

let playedCategories = [];    //array to keep track of selected categories
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
let flag=0;
//let categoryDiv;

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
const scoreBars = document.getElementsByClassName('bar');

//getting elements of post-category page
const currScoreBoard = document.getElementById('curr-score-board');
const currWinner = document.getElementById('current-winner');
const p1Name = document.getElementById('p1-name');
const p2Name = document.getElementById('p2-name');
const p1currScore = document.getElementById('player1-current-score');
const p2currScore = document.getElementById('player2-current-score');
const chooseAnotherCatBtn = document.getElementById('choose-another-category');
const endGameBtn = document.getElementById('end-the-game');

//getting elements of results page
const winnerName = document.getElementById('winner-name');
const scoreBoardDiv = document.getElementsByClassName('score-board');
const row1Div = document.getElementById('row1');
const row2Div = document.getElementById('row2');
const player1NameSpan = document.getElementById('player1-name-span');
const player2NameSpan = document.getElementById('player2-name-span');
const player1ScoreSpan = document.getElementById('player1-score');
const player2ScoreSpan = document.getElementById('player2-score');

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
    if (player1Name == undefined || player2Name == undefined){
        errorMessage.innerText = 'Please enter both players name.';
        startButton.disabled = true ;
    }
    else{
        homePage.classList.add('hidden');
        categoryPage.classList.remove('hidden');
        //call the function to generate category div
        generateCategoryDiv();
    }
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
      	let categoryDiv = document.createElement('div');
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
            let selectedCategoryDiv = categoryDiv ;
            if (playedCategories.includes(selectedCategory)) {
                alert('Already played, choose another category.');
                return;
            }
            else{
                //disable the categoryDiv once it is selected
                selectedCategoryDiv.classList.add('disabled');
                flag = 1 ;
            }
            //active start button
            startButton.disabled = false;
            startButton.style.backgroundColor = 'rgb(181, 228, 140)';
            startButton.style.color = '#1b4332';
    
            //adding event-listener for start button 
            startButton.addEventListener('click', () =>{
                categoryPage.classList.add('hidden');
                quizPage.classList.remove('hidden');

                //add to the already selected category list
                if (!playedCategories.includes(selectedCategory)){
                    playedCategories.push(selectedCategory); 

                    console.log(playedCategories);
                    player1CurrScore=0;
                    player2CurrScore=0;
                    questionIndex=1;
                    currentPlayer=1;
                    //setting the player names for quiz page
                    player1NamePara.innerText = player1Name;    
                    player2NamePara.innerText = player2Name; 
                    loadQuestion();
                }
            });
        });
    });
};

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

//function to get current difficulty
function getDifficultyLevel(questionIndex){
    currDifficulty = difficulties[Math.floor((questionIndex - 1) / 2)];
    return currDifficulty;
}

//function to fetch and generate questions on quizPage
async function fetchQuestions(selectedCategory){
    questionText.innerText = 'Loading.......';
    optionsButtonsDiv.innerHTML='';
    const difficulty = getDifficultyLevel(questionIndex);
    const response = await fetch(`https://the-trivia-api.com/v2/questions?limit=1&categories=${selectedCategory}&difficulties=${difficulty}`);
    const data = await response.json();
    return data[0];
};

//function to display the questions 
function displayQuestion(questionData, questionNumber) {

    //convert the string from api friendly format to more appealing format
    currentCategory.innerText = selectedCategory.split('_').map(
        word =>word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    //display current difficulty
    currentLevel.innerText= currDifficulty.charAt(0).toUpperCase() + currDifficulty.slice(1);

    //display player name
    currentPlayerName.innerText= setPlayerName();

    //setting the question text with question number
    questionText.innerText = `Q${questionNumber}: ${questionData.question.text}`;
  
    //shuffle all the options and display them as buttons
    const allOptions = [...questionData.incorrectAnswers, questionData.correctAnswer];
    shuffle(allOptions);
    correctAnswerIndex = allOptions.indexOf(questionData.correctAnswer);
  
    //clear any previous options
    optionsButtonsDiv.innerHTML = '';
  
    // Create buttons for each option
    allOptions.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.classList.add('option-button');
        optionButton.onclick = () => {handleAnswerClick(index)};
        optionsButtonsDiv.appendChild(optionButton);
    });
};

//function to load question
async function loadQuestion() {
    const questionData = await fetchQuestions(selectedCategory);
    displayQuestion(questionData, questionIndex);
};

//function to handle the option click
function handleAnswerClick(selectedIndex) {
    const optionButtons = document.querySelectorAll('.option-button');
    selectedAnswer = selectedIndex ;
    let currIndex = difficulties.indexOf(currDifficulty);
    let currScore = scoreList[currIndex];
    if (selectedAnswer === correctAnswerIndex){
        if (currentPlayer == 1){
            player1TotScore += currScore;
            player1CurrScore += currScore; 
            scoreDivPlayer1[currIndex].style.backgroundColor = "#96cc00";
        }
        else{
            player2TotScore += currScore;
            player2CurrScore += currScore;
            scoreDivPlayer2[currIndex].style.backgroundColor = "#96cc00";
        }
    }
    else{
        if (currentPlayer == 1){
            scoreDivPlayer1[currIndex].style.backgroundColor = "#ff6947";
        }
        else{
            scoreDivPlayer2[currIndex].style.backgroundColor = "#ff6947";
        }
    }
    //cheking if answer is correct or not and updating the oprions color
    optionButtons.forEach((button, index) => {
        if (index === correctAnswerIndex) {
            button.style.backgroundColor = '#96cc00';
        } 
        else if (index === selectedAnswer) {
            button.style.backgroundColor = '#ff6947';
        } 
        else {
            button.style.backgroundColor = '';
        }
        button.disabled = true;
    });
};

//function to click on the next question
function handleNextQuestion() {
    if (questionIndex < 6) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        questionIndex++;
        loadQuestion();
        selectedAnswer = null;
    } 
    if(questionIndex == 6) {
        nextQuestionBtn.style.display="none";
        const viewScoreBtn = document.createElement('button');
        viewScoreBtn.innerText = 'View Score';
        viewScoreBtn.classList.add('view-score-btn');
        viewScoreBtn.onclick = () => {
            for (let i = 0; i < scoreBars.length; i++) {
                scoreBars[i].style.backgroundColor = "#fee3fe";
            }
            viewScoreBtn.style.display = 'none';
            nextQuestionBtn.style.display = 'block';
            loadPostQuestionsPage();
        };
        quizPage.appendChild(viewScoreBtn);
    }
};

nextQuestionBtn.addEventListener('click',handleNextQuestion);

//post-question-page logic
function loadPostQuestionsPage(){
    quizPage.classList.add('hidden');
    postQuestionsPage.classList.remove('hidden');
    let winName = getWinnerName(player1CurrScore,player2CurrScore);
    if (!winName){
        const winnerMsg = document.getElementById('winner-message');
        winnerMsg.innerText = "No winner this time . It's a tie! But you still have some categories left. Wanna try?"
    }
    else{
        currWinner.innerText = winName;
    }
    p1Name.innerText = player1Name ;
    p2Name.innerText = player2Name ;
    p1currScore.innerText = player1CurrScore ;
    p2currScore.innerText = player2CurrScore ;
    chooseAnotherCatBtn.onclick = () => {chooseNextCategory()};
    endGameBtn.onclick = () => {endGame()};
}

//function to get the winner name
function getWinnerName(p1Score , p2Score){
    if(p1Score > p2Score){
        return player1Name;
    }
    else if(p2Score > p1Score){
        return player2Name;
    }
    else{
        return null;
    }
}

//results page logic!
function viewScorePage(){
    let winName  = getWinnerName(player1TotScore,player2TotScore);
    if(!winName){
        const msg = document.getElementById('message');
        msg.innerText = "It's a tie ! Well played both the players!";
    }
    else{
        winnerName.innerText = winName;
    }
    player1NameSpan.innerText = player1Name;
    player2NameSpan.innerText = player2Name;
    player1ScoreSpan.innerText = player1TotScore;
    player2ScoreSpan.innerText = player2TotScore;
}

function chooseNextCategory(){
    postQuestionsPage.classList.add('hidden');
    categoryPage.classList.remove('hidden');
    startButton.disabled = true ;
    startButton.style.backgroundColor = 'rgb(254, 234, 250)' ;
    selectedCategory = null;
}

function endGame(){
    postQuestionsPage.classList.add('hidden');
    resultsPage.classList.remove('hidden');
    viewScorePage();
}
