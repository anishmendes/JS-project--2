 
 var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
 var board = [];
 var rows = 9;
 var columns = 9;
 var score =0;

 var currTile;
 var otherTile;


 window.onload = function() {
    startGame();
    
    //for every 1/10th of a second its going to call crush candy  
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);

 }

 function randomCandy(){
    return candies[Math.floor(Math.random()* candies.length)]; //0 to 6 but not 6 

 }


 function startGame() {
     for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
         //<img id="0-0" src="./images/Red.png">

            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png"; 

            //Drag functionality
            tile.addEventListener("dragstart", dragStart);//when we click on candy this will initilize the drag process
            tile.addEventListener("dragover", dragOver);//clicking on candy , moving mouse to drag thecandy
            tile.addEventListener("dragenter", dragEnter);//draggging candy onto another candy
            tile.addEventListener("dragleave", dragLeave);//drag candy over another candy            
            tile.addEventListener("drop", dragDrop);  //dropping a candy over another candy          
            tile.addEventListener("dragend", dragEnd);  //after drag process compelted , we swap candies          



            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
     }
     console.log(board); 

 }


  function dragStart() {
    //this refers to tile that was clicked on for dragging
      currTile = this;
  }

  function dragOver(e) {
    e.preventDefault ();
  }

  function dragEnter(e) {
    e.preventDefault ();
  }
  function dragLeave(e) {
   
  }
  function dragDrop(e) {
    //this refers to the target tile that was droppped on
    otherTile = this;

  }
  function dragEnd(){

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;// this goona make sure we dont swap candy with blank tile 
    }
     
    let currCoords = currTile.id.split("-");//id will be ("0-0")-> ["0" , "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let othherCoords = otherTile.id.split("-");
    let r2 = parseInt(othherCoords[0]);
    let c2 = parseInt(othherCoords[1]);


    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;


    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;


   if (isAdjacent) {

       let currImg = currTile.src;
       let otherImg = otherTile.src;
       currTile.src = otherImg;
       otherTile.src = currImg;

       // this tala ko goona make sure that when we swape two candays we goona crushed 3 candies in row and columns
       let vaildMove = checkVaild();
       if(!vaildMove)  {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
       }
    }
}

function crushCandy() {
    //crushFive 
    //crushFour
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree(){
    //check rows
    for (let r = 0; r < rows; r++) {
        for(let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }

        }
    }

    //check columns 
    for (let c = 0; c < columns; c++) {
        for (let r =0; r < rows-2; r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }

        }    
    }
}

function checkVaild() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for(let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                return true;
            }

        }
    }

    //check columns 
    for (let c = 0; c < columns; c++) {
        for (let r =0; r < rows-2; r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                return true;
            }

        }    
    }
    return false;
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if(!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;

            }
        }
        for (let r = ind; r >= 0; r--){
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if(board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" +randomCandy() + ".png";
        }
    }
}