async function breadthFirstSearchAlgo() {

    let Queue = [start];

    while (Queue.length > 0 && !interrupt) {
        let current = Queue.splice(0, 1)[0];

        // If any of the neighbors is the end, then exit
        if (current == end) {
            console.log("Path Found !")
            await drawPath();
            return "Found";
        }


        // Checking every neighbor of current node
        for (let pos of getNeighbors(current)) {
            let node = tiles[pos[0]][pos[1]];

            if (node.state != "w" && node.state != "v") {
                // node was discovered from current node
                await visitNode(node, current);
                Queue = Queue.concat(node);

            }
        }
        drawStartAndEnd()

    }
}


async function breadthFirstSearch() {
    visitedNodes = 0;
    let result = await breadthFirstSearchAlgo();

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