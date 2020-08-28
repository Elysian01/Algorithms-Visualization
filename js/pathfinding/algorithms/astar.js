// // helper function to insert node into priority queue
// async function astarPQinsert(PriorityQueue, node) {
//     for (let i = 0; i < PriorityQueue.length; i++) {
//         if (node.hScore + node.gScore < PriorityQueue[i].hScore + PriorityQueue[i].gScore) {
//             PriorityQueue.splice(i, 0, node);
//             return;
//         }
//     }
//     PriorityQueue.push(node);
// }


// async function astarAlgo() {
//     let PriorityQueue = [start]
//     start.gScore = 0;

//     for (let c = 0; c < columns; c++) {
//         for (let r = 0; r < rows; r++) {
//             tiles[c][r].gScore = 0;
//         }
//     }

//     while (PriorityQueue.length > 0 && !interrupt) {
//         let current = PriorityQueue.splice(0, 1)[0]

//         if (current == end) {
//             console.log("Path Found !");
//             await drawPath();
//             return "Found";
//         }

//         for (let pos of getNeighbors(current)) {

//             let node = tiles[pos[0]][pos[1]];

//             if (node.state != "w" && node.state != "v") {
//                 // node was discovered from current node
//                 node.gScore = current.weight + current.gScore + 1;
//                 await visitNode(node, current);
//                 astarPQinsert(PriorityQueue, node);
//                 // await sleep(1000 / fps);
//             }
//         }
//         drawStartAndEnd()
//     }

// }

// async function astar() {
//     let result = await astarAlgo();

//     if (result != "Found") {
//         displayResult.innerHTML = "Path Not Possible !"
//     } else {
//         displayResult.innerHTML = "Path Found!"
//     }
//     window.scrollBy({
//         top: 1000,
//         behavior: "smooth"
//     });
// }


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
    let result = await astarAlgo();
    interrupt = false;
    if (result != "Found") {
        displayResult.innerHTML = "Path Not Possible !"
    } else {
        displayResult.innerHTML = "Path Found!"
    }
    window.scrollBy({
        top: 1000,
        behavior: "smooth"
    });
}