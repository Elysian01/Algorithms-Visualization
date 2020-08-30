for (let c = 0; c < columns; c++) {
    tiles[c] = []; // gives 2d array
    for (let r = 0; r < rows; r++) {
        tiles[c][r] = {
            x: c * (tileW + tileMargin),
            y: r * (tileH + tileMargin),
            state: "e",
            parent: false,
            weight: initialWeight,
        };
    }
}

boundX = 0;
boundY = 0;

start = tiles[startY][startX];
end = tiles[endY][endX];

function setWall(c, r) {
    tiles[c][r].state = "w";
    tiles[c][r].weight = Infinity;
}

function setVisited(c, r) {
    tiles[c][r].state = "v";
}

function setDiscovered(c, r) {
    tiles[c][r].state = "d";
}

function setEmpty(c, r) {
    tiles[c][r].state = "e";
}

function drawStartAndEnd() {
    tiles[startY][startX].state = "s";
    tiles[endY][endX].state = "f";
}

function rect(x, y, w, h, state) {
    i = x / (tileW + tileMargin);
    j = y / (tileH + tileMargin);

    ctx.lineWidth = 1;
    if (tiles[i][j].weight == reducedWeight) {
        ctx.fillStyle = weightColor;
    } else if (state == "e") {
        ctx.fillStyle = defaultColor;
        tiles[i][j].weight = initialWeight;
    } else if (state == "f") {
        ctx.fillStyle = endPointColor;
    } else if (state == "w") {
        ctx.fillStyle = wallColor;
        tiles[i][j].weight = Infinity;
    } else if (state == "s") {
        ctx.fillStyle = startPointColor;
    } else if (state == "v") {
        ctx.fillStyle = visitedColor;
    } else if (state == "p") {
        ctx.fillStyle = pathColor;
    }
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

function reset() {
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (
                tiles[c][r].state == "w" ||
                tiles[c][r].state == "v" ||
                tiles[c][r].state == "p"
            ) {
                tiles[c][r].state = "e";
            }
            tiles[c][r].weight = initialWeight;
        }
    }
    drawStartAndEnd();
    displayResult.innerHTML = "";
    visitedResult.innerHTML = "";
}

function clearPath() {
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (tiles[c][r].state == "v" || tiles[c][r].state == "p") {
                tiles[c][r].state = "e";
            }
            tiles[c][r].parent = false;
        }
    }
    drawStartAndEnd();
    displayResult.innerHTML = "";
    visitedResult.innerHTML = "";
}

function clear() {
    ctx.clearRect(0, 0, width, height);
}

async function draw() {
    clear();

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            rect(
                tiles[c][r].x,
                tiles[c][r].y,
                tileW,
                tileH,
                tiles[c][r].state
            );
        }
    }
}

function getNeighbors(node) {
    c = node.x / (tileW + tileMargin);
    r = node.y / (tileH + tileMargin);

    let neighbors = [];

    if (r != rows - 1) {
        // console.log(c, r + 1);
        neighbors.push([c, r + 1]);
    }
    if (r > 0) {
        // console.log(c, r - 1);
        neighbors.push([c, r - 1]);
    }
    if (c != columns - 1) {
        // console.log(c + 1, r);
        neighbors.push([c + 1, r]);
    }
    if (c > 0) {
        // console.log(c - 1, r);
        neighbors.push([c - 1, r]);
    }

    if (diagonals) {
        if (r != 0 && c != columns - 1) {
            neighbors.push([c + 1, r - 1]);
        }
        if (r != rows - 1 && c != columns - 1) {
            neighbors.push([c + 1, r + 1]);
        }
        if (r != 0 && c != 0) {
            neighbors.push([c - 1, r - 1]);
        }
        if (r != rows - 1 && c != 0) {
            neighbors.push([c - 1, r + 1]);
        }
    }

    return neighbors;
}

async function mouseDown(e) {
    canvas.onmousemove = mouseDrag;

    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (
                x > c * (tileW + tileMargin) &&
                x < c * (tileW + tileMargin) + tileW &&
                y > r * (tileH + tileMargin) &&
                y < r * (tileH + tileMargin) + tileH
            ) {
                if (placeSource) {
                    placeSource = false;
                    start.state = "e";
                    tiles[c][r].state = "s";
                    startX = r;
                    startY = c;
                    start = tiles[c][r];
                }
                if (placeDestination) {
                    placeDestination = false;
                    end.state = "e";
                    tiles[c][r].state = "f";
                    endX = r;
                    endY = c;
                    end = tiles[c][r];
                }

                if (inputWeight && (c != boundX || r != boundY)) {
                    tiles[c][r].weight = reducedWeight;
                    tiles[c][r].state = "wt";
                }
                if (tiles[c][r].state == "wt") {
                    tiles[c][r].weight = initialWeight;
                    // tiles[c][r].state = "e";
                }

                if (tiles[c][r].state == "w") {
                    tiles[c][r].state = "e";
                    boundX = c;
                    boundY = r;
                } else if (tiles[c][r].state == "e") {
                    tiles[c][r].state = "w";
                    boundX = c;
                    boundY = r;
                }

            }
        }
    }
}

function mouseDrag(e) {
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (
                x > c * (tileW + tileMargin) &&
                x < c * (tileW + tileMargin) + tileW &&
                y > r * (tileH + tileMargin) &&
                y < r * (tileH + tileMargin) + tileH
            ) {
                if (inputWeight && (c != boundX || r != boundY)) {
                    tiles[c][r].weight = reducedWeight;
                    tiles[c][r].state = "wt";
                } else if (
                    tiles[c][r].state == "e" &&
                    (c != boundX || r != boundY)
                ) {
                    tiles[c][r].state = "w";
                    boundX = c;
                    boundY = r;
                } else if (
                    tiles[c][r].state == "w" &&
                    (c != boundX || r != boundY)
                ) {
                    tiles[c][r].state = "e";
                    boundX = c;
                    boundY = r;
                }
            }
        }
    }
}

function mouseUp(e) {
    canvas.onmousemove = null;
}