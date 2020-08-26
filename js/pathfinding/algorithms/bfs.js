async function breadthFirstSearchAlgo() {

    let Queue = [start];

    while (Queue.length > 0 && !interrupt) {
        let current = Queue.splice(0, 1)[0];

        // if (current != start) {
        //     visitNode(current.x, current.y)
        // }
        // If any of the neighbors is the end, then exit
        if (current == end) {
            console.log("Path Found !")
            await drawPath();
            return "Found";
        }

        // Checking every neighbor of current node
        neighbors = getNeighbors(current);
        for (let pos of neighbors) {
            let node = tiles[pos[0]][pos[1]];

            if (interrupt) {
                return;
            }

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

    let result = await breadthFirstSearchAlgo();
    if (result != "Found") {
        displayResult.innerHTML = "Path Not Possible !"
    } else {
        displayResult.innerHTML = "Path Found!"
    }
}