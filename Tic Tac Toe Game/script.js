let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // Player 1 (O) starts
let gameOver = false;

// Winning combinations + optional rotation/position for line (x, y, angle)
const winPatterns = [
    // Horizontal wins
    [0, 1, 2, { x: "50%", y: "16.66%", angle: 0, length: "80%" }],     // Top row
    [3, 4, 5, { x: "50%", y: "50%", angle: 0, length: "80%" }],    // Middle row
    [6, 7, 8, { x: "50%", y: "83.33%", angle: 0, length: "80%" }],    // Bottom row

    // Vertical wins
    [0, 3, 6, { x: "16.66%", y: "50%", angle: 90, length: "80%" }], // Left column
    [1, 4, 7, { x: "50%", y: "50%", angle: 90, length: "80%" }],   // Middle column
    [2, 5, 8, { x: "83.33%", y: "50%", angle: 90, length: "80%" }],  // Right column

    // Diagonal wins
    [0, 4, 8, { x: "50%", y: "50%", angle: 45, length: "110%" }],   // Top-left to bottom-right
    [2, 4, 6, { x: "50%", y: "50%", angle: -45, length: "110%" }],  // Top-right to bottom-left
];


// Create line element
let line = document.createElement("div");
line.classList.add("line");
line.style.display = "none";
document.querySelector(".game").appendChild(line);

// Add click event listeners to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return;

        if (turn0) {
            box.innerText = "O";
            box.style.color = "Blue";
        } else {
            box.innerText = "X";
            box.style.color = "Red";
        }

        box.disabled = true;
        turn0 = !turn0;

        checkWinner();
        checkDraw();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner, pattern) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;

    // Draw the line
    const { x, y, angle, length} = pattern[3];
    line.style.width = length;
    line.style.top = y;
    line.style.left = x;
    line.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    line.style.display = "block";
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;

        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1, pattern);
            return;
        }
    }
};

const checkDraw = () => {
    let filled = Array.from(boxes).every(box => box.innerText !== "");
    if (filled && !gameOver) {
        msg.innerText = "😐 It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
        gameOver = true;
    }
};

const resetGame = () => {
    turn0 = true;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    line.style.display = "none";
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);