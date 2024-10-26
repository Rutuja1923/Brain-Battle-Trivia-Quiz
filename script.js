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

    	//adding an event listener when player clicks on category-div
    	categoryDiv.addEventListener('click', () => {

      		selectedCategory =  category.toLowerCase().replace(/\s+/g, '_');   //converting to API frinedly format

      		//active start button
      		startButton.disabled = false;
      		startButton.classList.add('active');
      		startButton.style.backgroundColor = 'rgb(181, 228, 140)';
      		startButton.style.color = '#1b4332';

      		//adding event-listener for start button 
      		startButton.addEventListener('click', () =>{
        		categoryPage.classList.add('hidden');
        		quizPage.classList.remove('hidden');
				fetchQuestions(selectedCategory);			//call the function
				playedCategories.push(selectedCategory);    //add to the already selected category list
			});
    	}); 
    	//appending the div to the container for categories
    	categoriesDiv.appendChild(categoryDiv);
    });
};