// Random Int function in range [low, high)
function randInt(low, high) {
    return Math.floor(Math.random() * (high - low)) + low;
}

async function visitNode(node, parent) {
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
                tiles[c][r].hScore = Math.abs(tiles[c][r].x - end.x) + Math.abs(tiles[c][r].y - end.y);
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
        console.log(current)
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