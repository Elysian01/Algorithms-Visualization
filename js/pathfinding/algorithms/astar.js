// helper function to insert node into priority queue
async function astarPQinsert(PriorityQueue, node) {
    for (let i = 0; i < PriorityQueue.length; i++) {
        if (node.hScore + node.gScore + node.weight < PriorityQueue[i].gScore + PriorityQueue[i].hScore + PriorityQueue[i].weight) {
            PriorityQueue.splice(i, 0, node);
            return;
        }
    }
    PriorityQueue.push(node);
}

async function astarAlgo() {
    let PriorityQueue = [start];

    while (PriorityQueue.length > 0 && !interrupt) {
        let current = PriorityQueue.splice(0, 1)[0];

        // If any of the neighbors is the end, then exit
        if (current == end) {
            console.log("Path Found !")
            await drawPath();
            interrupt = true;
            return "Found";
        }


        // Checking every neighbor of current node
        for (let pos of getNeighbors(current)) {
            let node = tiles[pos[0]][pos[1]];

            if (node.state != "w" && node.state != "v") {
                // node was discovered from current node
                node.gScore = current.gScore + current.weight + 1;
                await visitNode(node, current);
                if (node == end) {
                    console.log("Path Found !")
                    await drawPath();
                    return "Found";
                }
                astarPQinsert(PriorityQueue, node);

            }
        }
        drawStartAndEnd()

    }
}


async function astar() {
    visitedNodes = 0;
    let result = await astarAlgo();
    interrupt = false;

    if (result != "Found") {
        displayResult.innerHTML = "Path Not Possible !";
        visitedResult.innerHTML = "Total Visited Nodes : " + visitedNodes

    } else {
        displayResult.innerHTML = "Path Found!";
        visitedResult.innerHTML = "Total Visited Nodes : " + visitedNodes

    }
    window.scrollBy({
        top: 1000,
        behavior: "smooth"
    });
}