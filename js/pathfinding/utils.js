// Random Int function in range [low, high)
function randInt(low, high) {
    return Math.floor(Math.random() * (high - low)) + low;
}

function checkSearchAlredyImplemented() {
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (tiles[c][r].state == "v" || tiles[c][r].state == "p") {
                return true;
            }
        }
    }
    return false;
}

function setSize(windowSize) {

    if (windowSize.matches) {
        console.log(window.innerWidth);
        console.log(window.innerHeight);
        canvas.width = "780";
        canvas.height = "500";
        columns = 28;
        startY = 10;
        endY = 20;
        start = tiles[startY][startX];
        tiles[12][startX].state = "e";
        tiles[30][endX].state = "e";
        end = tiles[endY][endX];
        drawStartAndEnd();
        // rows = 50;
    } else {
        canvas.width = "1200";
        canvas.height = "481";
        columns = 42;
        rows = 17;
        startY = 12;
        start = tiles[startY][startX];
        end = tiles[endY][endX];
        // endY = 30;
    }


}

function disableButtons() {
    //reset grid and clear Path
    document.getElementById("reset").disabled = true;
    document.getElementById("clear").disabled = true;

    // Maze
    document.getElementById("random-maze").disabled = true;
    document.getElementById("rectangular-maze").disabled = true

    // Visualize Button
    document.getElementById("visualize").disabled = true;
    document.getElementById("algo").disabled = true;


}

function enableButtons() {
    //reset grid and clear Path
    document.getElementById("reset").disabled = false;
    document.getElementById("clear").disabled = false;

    // Maze
    document.getElementById("random-maze").disabled = false;
    document.getElementById("rectangular-maze").disabled = false

    // Visualize Button
    document.getElementById("visualize").disabled = false;
    document.getElementById("algo").disabled = false;

}

async function visitNode(node, parent) {
    visitedNodes++;
    c = node.x / (tileW + tileMargin);
    r = node.y / (tileH + tileMargin);
    tiles[c][r].parent = parent;
    await sleep(100 / fps);
    sleep(2500 / fps).then(() => {
        setVisited(c, r);
    });
    await sleep(3000 / fps); // Don't Messs with this value, or everything will crash
}

async function initializeHeuristics() {
    // if heuristics are already initialized, reset the gScore
    if (heuristics) {
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows; r++) {
                tiles[c][r].gScore = 0;
            }
        }
    } else {
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows; r++) {
                tiles[c][r].gScore = 0;
                tiles[c][r].hScore = Math.sqrt(Math.pow((tiles[c][r].x - end.x), 2) + Math.pow((tiles[c][r].y - end.y), 2));
            }
        }
        heuristics = true;
    }
}


// Drawing the shortest path from end to beginning
// this should be called ONLY IF the path exists
async function drawPath() {
    let path = [];
    let count = 500;

    drawStartAndEnd();
    let current = end;

    // from end to beginning

    while (current != start && count != 0) {
        path.unshift(current);
        current = current.parent;
        console.log(current);
        count -= 1;
    }
    path.unshift(start);

    for (let i = 1; i < path.length; i++) {
        if (path[i].state != "f") {
            path[i].state = "p"
        }
        await sleep(1000 / fps);
    }

    if (count == 0) {
        displayResult.innerHTML = "Path is possible,But shown path maybe wrong ."
    }
}

// Notations

const notationBox1 = document.getElementById("notation-box1");
const ctxnotationBox1 = notationBox1.getContext("2d");
ctxnotationBox1.fillStyle = startPointColor;
ctxnotationBox1.beginPath();
ctxnotationBox1.rect(0, 0, 30, 30);
ctxnotationBox1.closePath();
ctxnotationBox1.fill();

const notationBox2 = document.getElementById("notation-box2");
const ctxnotationBox2 = notationBox2.getContext("2d");
ctxnotationBox2.fillStyle = endPointColor;
ctxnotationBox2.beginPath();
ctxnotationBox2.rect(0, 0, 30, 30);
ctxnotationBox2.closePath();
ctxnotationBox2.fill();

const notationBox3 = document.getElementById("notation-box3");
const ctxnotationBox3 = notationBox3.getContext("2d");
ctxnotationBox3.fillStyle = wallColor;
ctxnotationBox3.beginPath();
ctxnotationBox3.rect(0, 0, 30, 30);
ctxnotationBox3.closePath();
ctxnotationBox3.fill();

const notationBox4 = document.getElementById("notation-box4");
const ctxnotationBox4 = notationBox4.getContext("2d");
ctxnotationBox4.fillStyle = visitedColor;
ctxnotationBox4.beginPath();
ctxnotationBox4.rect(0, 0, 30, 30);
ctxnotationBox4.closePath();
ctxnotationBox4.fill();

const notationBox5 = document.getElementById("notation-box5");
const ctxnotationBox5 = notationBox5.getContext("2d");
ctxnotationBox5.fillStyle = pathColor;
ctxnotationBox5.beginPath();
ctxnotationBox5.rect(0, 0, 30, 30);
ctxnotationBox5.closePath();
ctxnotationBox5.fill();

const notationBox6 = document.getElementById("notation-box6");
const ctxnotationBox6 = notationBox6.getContext("2d");
ctxnotationBox6.fillStyle = weightColor;
ctxnotationBox6.beginPath();
ctxnotationBox6.rect(0, 0, 30, 30);
ctxnotationBox6.closePath();
ctxnotationBox6.fill();