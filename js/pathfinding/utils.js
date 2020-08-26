// Random Int function in range [low, high)
function randInt(low, high) {
    return Math.floor(Math.random() * (high - low)) + low;
}

async function visitNode(node, parent) {
    c = node.x / (tileW + tileMargin);
    r = node.y / (tileH + tileMargin);
    tiles[c][r].parent = parent;
    sleep(2500 / fps).then(() => {
        setVisited(c, r);
    });
    await sleep(1000 / fps);
}

// Drawing the shortest path from end to beginning
// this should be called ONLY IF the path exists
async function drawPath() {
    // end
    let path = [];
    let current = end;
    console.log(current)

    // from end to beginning
    while (current != start) {
        path.unshift(current);
        current = current.parent;
    }
    path.unshift(start);
    console.log(path)
    for (let i = 1; i < path.length && !interrupt; i++) {
        if (path[i].state != "f") {
            path[i].state = "p"
        }
        await sleep(1000 / fps);
    }
}