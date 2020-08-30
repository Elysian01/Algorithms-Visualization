// helper function to insert node into priority queue
async function bestFirstPQinsert(bestPriorityQueue, node) {
    for (let i = 0; i < bestPriorityQueue.length; i++) {
        if (
            node.hScore + node.weight <
            bestPriorityQueue[i].hScore + bestPriorityQueue[i].weight
        ) {
            bestPriorityQueue.splice(i, 0, node);
            return;
        }
    }
    bestPriorityQueue.push(node);
}

async function bestFirstSearchAlgo() {
    let bestPriorityQueue = [start];

    while (bestPriorityQueue.length > 0 && !interrupt) {
        let current = bestPriorityQueue.splice(0, 1)[0];

        // If any of the neighbors is the end, then exit
        if (current == end) {
            console.log("Path Found !");
            await drawPath();
            return "Found";
        }

        // Checking every neighbor of current node
        for (let pos of getNeighbors(current)) {
            let node = tiles[pos[0]][pos[1]];

            if (node.state != "w" && node.state != "v") {
                // node was discovered from current node
                await visitNode(node, current);
                if (node == end) {
                    console.log("Path Found !");
                    await drawPath();
                    return "Found";
                }
                bestFirstPQinsert(bestPriorityQueue, node);
            }
        }
        drawStartAndEnd();
    }
}

async function bestFirstSearch() {
    visitedNodes = 0;
    let result = await bestFirstSearchAlgo();

    if (result != "Found") {
        displayResult.innerHTML = "Path Not Possible !";
        visitedResult.innerHTML = "Total Visited Nodes : " + visitedNodes;
    } else {
        displayResult.innerHTML = "Path Found!";
        visitedResult.innerHTML = "Total Visited Nodes : " + visitedNodes;
    }
    window.scrollBy({
        top: 1000,
        behavior: "smooth",
    });
}