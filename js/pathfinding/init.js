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
        console.log(inputWeight)
    } else {
        inputWeight = false;
        console.log(inputWeight)
    }
});
console.log(inputWeight)


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
            enableButtons();
        } else if (algoName == "dijkstra") {
            console.log(algoName);
            disableButtons();
            await initializeHeuristics();
        } else if (algoName == "bidir") {
            console.log(algoName);
            disableButtons();
            await initializeHeuristics();
            enableButtons();
        }
    }
}

// Result Not Found Display
const displayResult = document.getElementById("result");