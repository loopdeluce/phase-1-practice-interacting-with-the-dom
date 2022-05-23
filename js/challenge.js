

let counter = 0;
let intervalID = setInterval(counterIncrement, 1000);

init();

function init() {
  const minus = document.getElementById('minus');
  const plus = document.getElementById('plus');
  const heart = document.getElementById('heart');
  const pause = document.getElementById('pause');
  const form = document.getElementById('comment-form')

  minus.addEventListener('click', minusOne);
  plus.addEventListener('click', plusOne);
  heart.addEventListener('click', handleHeart);
  pause.addEventListener('click', handlePause);
  form.addEventListener('submit', leaveComment);
};


function counterIncrement() {
  counter++
  const counterElement = document.getElementById('counter');
  counterElement.textContent = counter;
};

function minusOne() {
  counter--
  const counterElement = document.getElementById('counter');
  counterElement.textContent = counter;
};

function plusOne(){
  counter++
  const counterElement = document.getElementById('counter');
  counterElement.textContent = counter;
};

function handleHeart() {
  const heartNumber = counter;
  const oldNumberList = Array.from(document.querySelector('.likes').children);
  const existingNumberElement = oldNumberList.find(number => number.dataset.num === `${heartNumber}`);

  //check if the number is already on the list
  if (existingNumberElement === undefined) {
    addNewHeartNote(heartNumber);
  }
  else { 
    incrementHeartNote(existingNumberElement);
  }
};

function addNewHeartNote(heartNumber) {
  const ul = document.querySelector('.likes');
  const li = document.createElement('li');
  li.dataset.num = heartNumber;
  li.innerHTML = `${heartNumber} has been liked <span>1</span> time`
  ul.appendChild(li);
};

function incrementHeartNote(existingNumberElement) {
  const heartNumber = existingNumberElement.dataset.num;
  const numOfLikeElement = existingNumberElement.querySelector('span');
  let numOfLikes = numOfLikeElement.textContent;
  numOfLikes++;
  const span = document.createElement('span');
  span.textContent = numOfLikes;
  existingNumberElement.innerHTML = `${heartNumber} has been liked <span>${numOfLikes}</span> times`
};

function handlePause() {
  // console.log('pause was clicked')
  const pauseButton = document.getElementById('pause');
  // console.log(pauseButton);
  if (pauseButton.textContent === ' pause ') {
    // console.log('pause')
    pauseCounter(pauseButton);
  }
  else if (pauseButton.textContent === ' resume ') {
    // console.log('resume')
    resumeCounter(pauseButton)
  }
};

function pauseCounter(pauseButton) {
  clearInterval(intervalID);
  
  const minus = document.getElementById('minus');
  const plus = document.getElementById('plus');
  const heart = document.getElementById('heart');

  minus.disabled = true;
  plus.disabled = true;
  heart.disabled = true;

  pauseButton.textContent = ' resume ';
};

function resumeCounter(pauseButton) {
  intervalID = setInterval(counterIncrement, 1000);

  const minus = document.getElementById('minus');
  const plus = document.getElementById('plus');
  const heart = document.getElementById('heart');

  minus.disabled = false;
  plus.disabled = false;
  heart.disabled = false;

  pauseButton.textContent = ' pause ';
};

function leaveComment(event) {
  event.preventDefault();
  const comment = event.target.comment.value;

  commentSection = document.querySelector('#list.comments');

  console.log(commentSection);

  newComment = document.createElement('p');
  newComment.textContent = comment;
  commentSection.append(newComment);

  event.target.reset();
};