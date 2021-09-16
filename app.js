// Selectors
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const timer = document.getElementById('stopwatch');
const recordList = document.querySelector(".records-container");

// Event Listeners
startButton.addEventListener("click", makeTable);
pauseButton.addEventListener("click", pauseTimer);
// document.addEventListener('DOMContentLoaded', getRecords);

// Variables
let activeTable = false;
const tableSize = 25;

let hr = 0,
    min = 0,
    sec = 0;
let stoptime = true;

// creating the cells content: numbers from 0 to 24(we will add 1 to that array element so that it goes from 1 to 25)
const numbers = Array.from({length: tableSize}, (_, index) => index + 1);

// Functions
function makeTable(e) {
  //so that the website doesn't refresh all the time.
  e.preventDefault();  

  // checks if there is an active table, if that is so, it will "return" and do nothing.
  if(activeTable != false) {
    return;
  }

  // implicates that there now is an active table.
  activeTable = true;

  // resets the timer after stoping it
  resetTimer();
  // starts the new timer
  startTimer();

  // get the reference for the body
  const container = document.querySelector(".schulte-container");

  // selects the <table> element and creates a <tbody> element
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");


  // We make 5 rows and inside of them 5 cells each.
  for (let i = 0; i < 5; i++) {
    // creates a table row
    const row = document.createElement("tr");

      // a loop to create 5 cells on each row
      for (let j = 0; j < 5; j++) {
        // We chose a random number in the range of the array's length
        const randomNumber = Math.floor(Math.random()*(numbers.length));
        // We get the random number
        const randomItem = numbers[randomNumber];

        // We create the cell
        const cell = document.createElement("td");
        // We make a text node(the random item to which we will add 1) to the cell 
        let cellText = document.createTextNode(randomItem);
        // We append the text node to the cell
        cell.appendChild(cellText);
        // We append the cell to the row
        row.appendChild(cell);

        //We remove the already chosen element from the array of numbers
        const numbIndex = numbers.indexOf(randomItem)
        numbers.splice(numbIndex, 1);
          
      }

  // We add the row to the end of the table body
  tblBody.appendChild(row);
  }

  // We put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  
  // Adding a class to the table
  tbl.classList.add("schulte-table");
  // We append the <table> into the <body>
  container.appendChild(tbl);
  // We set the border attribute of the tbl;
  tbl.setAttribute("border", "1");

  // We call the function that will triger each time a cell is "clicked".
  completeCell();
  // getRecords();

  
}

// This function will add the elements cells that have been "clicked" and will put their innerHtml into an array.
function completeCell() {
  const clearedCells = [];
  let i = 1;
  document.querySelectorAll(".schulte-table td").
  forEach(e=>e.addEventListener("click", function (){
    if(i === parseInt(e.innerHTML)) {
      //Changes the state of the target cell to one of "correct"
      if(e.classList.contains("wrong-cell")) {
        e.classList.replace("wrong-cell", "correct-cell");
      }else {
        e.classList.add("correct-cell");
      }
      clearedCells.push(parseInt(e.innerHTML));

      i++;

      // checks whether the table has been cleared.
      isTblClear();      

    }else {
      // changes the state of a cell to "wrong"
      // switch (){}
      if(e.classList.contains("correct-cell")) {
        e.classList.replace("correct-cell", "wrong-cell");
      }else if(e.classList.contains("wrong-cell")){
        e.classList.remove("wrong-cell");
        setTimeout(()=>{e.classList.add("wrong-cell")}, 0.1);
      }else {
        e.classList.add("wrong-cell");
      }
    }

    // This "if" will check if the table has been cleared. if it's true then it will congrat the user and remove the table, else it will prevent the user form creating a new table.
    function isTblClear(){
      if (clearedCells.length === tableSize || clearedCells.length > tableSize) {
        alert(`Well done! it took you ${parseInt(min)} minutes and ${sec} seconds `);
        // indicates that there is no table active
        activeTable = false;
        saveLocalRecords(sec+min*60+hr*3600);
        resetTimer();
        removeTable();
        
        
      }else {
        // reiterates that there already is a table active.
        activeTable = true;
      }
    }
    
  }));
  
}

//removes the old table.
function removeTable() {
  const oldTable = document.querySelector(".schulte-table");
  oldTable.parentNode.removeChild(oldTable);
  window.location.reload();
  
}

//Starts the timerCycle function and also changes the state of the stopwatch variable
function startTimer() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
    }
}

//changes the state of the stopwatch variable
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function pauseTimer() {  
  const pButton = document.querySelector(".pause-button") ? document.querySelector(".pause-button") : document.querySelector(".continue-button");

  if(pButton.classList.contains("pause-button") && activeTable===true){
    stoptime = true;
    pButton.classList.replace("pause-button", "continue-button");
    document.querySelector(".schulte-table").classList.add("pause");
  }else if(pButton.classList.contains("continue-button") && activeTable===true){
    pButton.classList.replace("continue-button", "pause-button");
    document.querySelector(".schulte-table").classList.remove("pause");
    stoptime = false;
    timerCycle();
  }
  
  getRecords();
}

//Stops first, and then resets.
function resetTimer() {
  stopTimer();
  timer.innerHTML = '00:00:00';
  hr = 0;
  min = 0;
  sec = 0;
}

//adds the time and takes care of changing the seconds into minuts, and the minutes into hours when they hit 60secs and 60mins respectively.
function timerCycle() {
  if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

  timer.innerHTML = hr + ':' + min + ':' + sec;

  setTimeout("timerCycle()", 1000);
}
}


function saveLocalRecords(record){
  //CHECK whether there is something in the storage
  let records;
  if(localStorage.getItem('records') === null){
    records = [];
  }else{
    records = JSON.parse(localStorage.getItem('records'));
  }
  
  records.push(record);
  localStorage.setItem('records', JSON.stringify(records));
}

function getRecords(){
  
  if(stoptime === false && document.querySelector(".records-table")){
    const elem = document.querySelector(".records-table");
    elem.parentNode.removeChild(elem);
    return;
  } else if(activeTable===false) {
    return;
  } 
  
  let records;
  //CHECK whether there is something in the storage
  if(localStorage.getItem('records') === null){
    records = [];
  }else{
    records = JSON.parse(localStorage.getItem('records'));
  }
  records.sort((a,b)=>{return a-b});
  // get the reference for the body
  const container = document.querySelector(".records-container");
  
  // selects the <table> element and creates a <tbody> element
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");
  const tblCaption = document.createElement("caption");
  tblCaption.innerHTML = "Records table (in seconds)";
  let inx = 0;
  // We make 2 rows and inside of them 5 cells each.  
  for (let i = 0; i < 2; i++) {
    const row = document.createElement("tr");
    // a loop to create 5 cells on each row
    for (let j = 0; j < 4; j++) {
      // We create the cell
      const cell = document.createElement("td");
      // We add a text node to the cell if there is a record to put
      let cellText;
      if(records.indexOf(records[inx]) === inx){
        cellText = document.createTextNode(records[inx]);
      }else{
        cellText = document.createTextNode(0);
      }
      
      // We append the text node to the cell
      cell.appendChild(cellText);
      // We append the cell to the row
      row.appendChild(cell);
      
      inx++;
    }
    
    // We add the row to the end of the table body
    tblBody.appendChild(row);
  }
  // We put the <tbody> in the <table>
  tbl.appendChild(tblCaption);
  tbl.appendChild(tblBody);
  // Adding a class to the table
  tbl.classList.add("records-table");
  // We append the <table> into the <body>
  container.appendChild(tbl);
  // We set the border attribute of the tbl;
  removeRecord();
}

function removeRecord(){
  const elem = document.querySelectorAll(".records-table td")
  elem.forEach(e=>e.addEventListener("click", function (){
    deleteLocalRecords(e);
  }));
  
  function deleteLocalRecords(r){
    //CHECK whether there is something in the storage
    let records;
    if(localStorage.getItem('records') === null){
      records = [];
    }else{
      records = JSON.parse(localStorage.getItem('records'));
    }
    
    let record = records.indexOf(parseInt(r.innerHTML));
    records.splice(record, 1);
    localStorage.setItem('records', JSON.stringify(records));
  }
}