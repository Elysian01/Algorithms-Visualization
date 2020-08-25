for (let c = 0; c < columns; c++) {
    tiles[c] = []; // gives 2d array
    for (let r = 0; r < rows; r++) {
        tiles[c][r] = {
            x: c * (tileW + tileMargin),
            y: r * (tileH + tileMargin),
            state: 'e'
        }
    }
}

boundX = 0;
boundY = 0;
tiles[startY][startX].state = "s";
tiles[endY][endX].state = "f"

function setWall(c, r) {
    tiles[c][r].state = "w";
}


function rect(x, y, w, h, state) {

    if (state == 'e') {
        ctx.fillStyle = defaultColor;
    } else if (state == 'f') {
        ctx.fillStyle = endPointColor;
    } else if (state == 'w') {
        ctx.fillStyle = wallColor;
    } else {
        ctx.fillStyle = startPointColor;
    }
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

function reset() {
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (tiles[c][r].state == "w") {
                tiles[c][r].state = "e";
            }
        }
    }
    tiles[startY][startX].state = "s";
    tiles[endY][endX].state = "f"
}

function clear() {
    ctx.clearRect(0, 0, width, height);
}

async function draw() {
    clear();
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            rect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state)
        }
    }
}

async function mouseDown(e) {

    canvas.onmousemove = mouseDrag;

    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (x > c * (tileW + tileMargin) && x < c * (tileW + tileMargin) + tileW &&
                y > r * (tileH + tileMargin) && y < r * (tileH + tileMargin) + tileH) {

                if (tiles[c][r].state == "e") {
                    tiles[c][r].state = "w"
                    boundX = c;
                    boundY = r;
                } else if (tiles[c][r].state == "w") {
                    tiles[c][r].state = "e";
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
            if (x > c * (tileW + tileMargin) && x < c * (tileW + tileMargin) + tileW &&
                y > r * (tileH + tileMargin) && y < r * (tileH + tileMargin) + tileH) {

                if (tiles[c][r].state == "e" && (c != boundX || r != boundY)) {
                    tiles[c][r].state = "w";
                    boundX = c;
                    boundY = r;
                } else if (tiles[c][r].state == "w" && (c != boundX || r != boundY)) {
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