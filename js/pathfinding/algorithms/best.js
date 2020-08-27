  // helper function to insert node into priority queue
  async function bestFirstPQinsert(PriorityQueue, node) {
      for (let i = 0; i < PriorityQueue.length; i++) {
          if (node.hScore + node.weight < PriorityQueue[i].hScore + PriorityQueue[i].weight) {
              PriorityQueue.splice(i, 0, node);
              return;
          }
      }
      PriorityQueue.push(node);
  }

  async function bestFirstSearchAlgo() {
      let PriorityQueue = [start];

      while (PriorityQueue.length > 0 && !interrupt) {
          let current = PriorityQueue.splice(0, 1)[0];

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
                  bestFirstPQinsert(PriorityQueue, node);
                  await sleep(1000 / fps);
              }
          }
          drawStartAndEnd()

      }
  }


  async function bestFirstSearch() {
      let result = await bestFirstSearchAlgo();
      if (result != "Found") {
          displayResult.innerHTML = "Path Not Possible !"
      } else {
          displayResult.innerHTML = "Path Found!"
      }
  }