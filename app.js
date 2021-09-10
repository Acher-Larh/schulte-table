// Selectors
const startButton = document.querySelector(".start-button");

// Event Listeners
startButton.addEventListener("click", makeTable);

// Functions
function makeTable(e) {
  e.preventDefault();
  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];

  // selects the <table> element and creates a <tbody> element
  var tbl = document.querySelector(".schulte-table");
  var tblBody = document.createElement("tbody");

  // creating the cells content: numbers from 0 to 24(we will add 1 to that array element so that it goes from 1 to 25)
  const numbers = [...Array(25).keys()];
  
  // We make 5 rows and inside of them 5 cells each.
  for (let i = 0; i < 5; i++) {
    // creates a table row
    let row = document.createElement("tr");

      // a loop to create 5 cells on each row
      for (let j = 0; j < 5; j++) {
        // We chose a random number in the range of the array's length
        const randomNumber = Math.floor(Math.random()*(numbers.length));
        // We get the random number
        const randomItem = numbers[randomNumber];

        // We create the cell
        let cell = document.createElement("td");
        // We make a text node(the random item to which we will add 1) to the cell 
        let cellText = document.createTextNode(randomItem+1);
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
  body.appendChild(tbl);
  // We set the border attribute of the tbl;
  tbl.setAttribute("border", "1");

  // We call the function that will triger each time a cell is "clicked".
  completeCell();
  
}

// This function will add the elements cells that have been "clicked" and will put them into an array.
function completeCell() {
  const completedCells = [];
  document.querySelectorAll(".schulte-table td").
  forEach(e=>e.addEventListener("click", function (){
    console.log(e.innerHTML);
    completedCells.push(e.innerHTML);
    console.log(completedCells);
  }));
}