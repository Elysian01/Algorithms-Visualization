// draw Board
setInterval(draw, 10);
canvas.onmousedown = mouseDown
canvas.onmouseup = mouseUp

//reset grid
document.getElementById("reset").addEventListener("click", reset);

// Maze
document.getElementById("random-maze").addEventListener("click", randomMaze);
document.getElementById("rectangular-maze").addEventListener("click", recursiveDivision);

//algorithms call
function algoChange() {
    let algo = document.getElementById("algo").value;
    // console.log(algo);
}