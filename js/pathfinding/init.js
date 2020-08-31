// draw Board
setInterval(draw, 10);
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;

//reset grid and clear Path
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("clear").addEventListener("click", clearPath);

// Gets Weight
document.getElementById("weight").addEventListener("change", function() {
    if (this.checked) {
        inputWeight = true;
    } else {
        inputWeight = false;
    }
});

// Place Source And Destination
document.getElementById("start").addEventListener("click", () => {
    placeSource = true;
});
document.getElementById("end").addEventListener("click", () => {
    placeDestination = true;
});
drawStartAndEnd();


// Maze
document.getElementById("random-maze").addEventListener("click", randomMaze);
document
    .getElementById("rectangular-maze")
    .addEventListener("click", recursiveDivision);

// Visualize Button
document.getElementById("visualize").addEventListener("click", visualize);

async function visualize() {
    let algoName = document.getElementById("algo").value;

    let Search = checkSearchAlredyImplemented();

    if (Search) {
        alert("Please Clear The Path First !")
    } else {
        if (algoName === "") {
            alert("Please Choose the Algorithm First !");
        } else if (algoName == "bfs") {
            console.log(algoName);
            disableButtons();
            await breadthFirstSearch();
            enableButtons();
        } else if (algoName == "dfs") {
            console.log(algoName);
            disableButtons();
            await depthFirstSearch();
            enableButtons();
        } else if (algoName == "best") {
            console.log(algoName);
            disableButtons();
            await initializeHeuristics();
            await bestFirstSearch();
            enableButtons();
        } else if (algoName == "astar") {
            console.log(algoName);
            disableButtons();
            await initializeHeuristics();
            await astar();
            enableButtons();
        } else if (algoName == "dijkstra") {
            console.log(algoName);
            disableButtons();
            await dijkstra();
            enableButtons();
        }
    }
}

// Visited Node Display
const visitedResult = document.getElementById("visited");

// Result Not Found Display
const displayResult = document.getElementById("result");

// Window Size
var windowSize = window.matchMedia("(max-width: 1000px)")
setSize(windowSize);
windowSize.addListener(setSize)