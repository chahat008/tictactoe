let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container hide");
let msg=document.querySelector("#msg");



let turn0=true; //playerX,player0
let count=0; //to track draw

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],

];

const resetGame=()=>{
    turn0=true;
    count=0;
    enableboxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText="0";
            turn0=false;
        }
        else{
            box.innerText="X";
            turn0=true;
        }

        box.disabled=true;
        count++;

        let isWinner=checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    })
})

const gameDraw=()=>{
    msg.innerText="game was a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};




const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showwinner=(winner)=>{
    msg.innerText=`congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner=()=>{
    for ( let pattern of winPatterns ){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val=  boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val!= "" && pos2val!="" && pos3val!=""){
            if(pos1val===pos2val && pos2val==pos3val){
                showwinner(pos1val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
