// console.log('Happy developing
let boxes = document.querySelectorAll(".box");
let restart = document.querySelector("#restart");
let turnX = true;
let msgContainer = document.querySelector(".msg-container");
let msgText = document.querySelector("#msg");
// let turnO = false;
let gameWin = false;
let clickCount = 0;
const winningFormula = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]];
const btnDisable = () => {
  boxes.forEach((box) => {box.disabled = true; });
}
const btnEnable = () => {
    boxes.forEach((box)=> {
    box.innerText='';
    box.disabled=false;

});};
const gameRestart = () => {
    turnX = true;
    btnEnable();
    msgContainer.classList.add('hidden');
}

restart.addEventListener("click",gameRestart);

const winnerDisplay = (winner) =>{
    // lot of styling have to be added
    // let msgTag = document.createElement("p");
    msgText.innerText = `Winner of Game: Player ${winner}`;
    msgContainer.classList.remove("hidden");
    // msgTag.style.fontSize = "100px";
    // document.querySelector("main").appendChild(msgTag);
}
const checkWinner = () => {
        for (let pattern of winningFormula) {
            let pos1Value=boxes[pattern[0]].innerText;
            let pos2Value=boxes[pattern[1]].innerText;
            let pos3Value=boxes[pattern[2]].innerText;

            // below code is hardcoding the value; a good program should have logic not values
            // if (boxes[pattern[0]].innerText === 'X' &&
            //     boxes[pattern[1]].innerText === 'X' &&
            //     boxes[pattern[2]].innerText === 'X')
            // {   console.log("Player X winner");
            //     break; }
            // else if (boxes[pattern[0]].innerText === 'O' &&
            //     boxes[pattern[1]].innerText === 'O' &&
            //     boxes[pattern[2]].innerText === 'O')
            // {   console.log("Player O winner");
            //     break; }

            if(pos1Value !== '' && pos2Value !== '' && pos3Value !== ''){
                if(pos1Value === pos2Value && pos2Value === pos3Value){
                    btnDisable();
                    winnerDisplay(pos1Value);
                    gameWin = true;
                }
            }

        }


    // if(boxes.every((box)=> box.disabled === true)){
    //     if(!gameOver){
    //         console.log("No winner");}
    // }

}
const drawMsg = () =>{
        msgText.innerText = `Game was a draw`;
        msgContainer.classList.remove("hidden");
        clickCount = 0;
}
boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        if (turnX) {
            box.innerText = "X";
            turnX = false;
            // turnO = true;

        } else {
            box.innerText = 'O';
            // turnO = false;
            turnX = true;
        }
        box.disabled=true;
        clickCount++;
        console.log(clickCount);
        checkWinner();
        if(clickCount === 9 && gameWin === false)
        {   drawMsg();}

    });

});



