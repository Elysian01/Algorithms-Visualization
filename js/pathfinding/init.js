// draw Board
setInterval(draw, 10);
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;

//reset grid and clear Path
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("clear").addEventListener("click", clearPath);

// Maze
document.getElementById("random-maze").addEventListener("click", randomMaze);
document
    .getElementById("rectangular-maze")
    .addEventListener("click", recursiveDivision);

// Visualize Button
document.getElementById("visualize").addEventListener("click", visualize);

async function visualize() {
    let algoName = document.getElementById("algo").value;
    if (algoName === "") {
        alert("Please Choose the Algorithm First !");
    } else if (algoName == "bfs") {
        console.log(algoName);
        await breadthFirstSearch();
    } else if (algoName == "dfs") {
        console.log(algoName);
        await depthFirstSearch();
    } else if (algoName == "best") {
        console.log(algoName);
        await initializeHeuristics();
        await bestFirstSearch();
    } else if (algoName == "astar") {
        console.log(algoName);
        await initializeHeuristics();
    } else if (algoName == "dijkstra") {
        console.log(algoName);
        await initializeHeuristics();
    } else if (algoName == "bidir") {
        console.log(algoName);
        await initializeHeuristics();
    }
}

// Result Not Found Display
const displayResult = document.getElementById("result");