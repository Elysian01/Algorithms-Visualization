async function depthFirstSearchAlgo() {
    let Stack = [start];

    // While the Stack has elements, i.e., a path could exist
    while (Stack.length > 0 && !interrupt) {
        let current = Stack.pop();
        tiles[startY][startX].state = "s";

        // IF current is the end, then exit
        if (current == end) {
            await drawPath();
            return "Found";
        }


        // Checking every neighbor of current node
        for (let pos of getNeighbors(current).reverse()) {
            let node = tiles[pos[0]][pos[1]];

            if (interrupt) {
                return;
            }

            if (node.state != "w" && node.state != "v") {
                await visitNode(node, current);
                Stack.push(node);

            }
        }
        await sleep(1000 / fps);
    }
}

async function depthFirstSearch() {
    visitedNodes = 0
    let result = await depthFirstSearchAlgo();

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