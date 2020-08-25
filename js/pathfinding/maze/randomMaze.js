async function randomMaze() {
    reset();
    for (let c = 0; c < columns && !interrupt; c++) {
        for (let r = 0; r < rows && !interrupt; r++) {

            if (Math.random() <= probability) {
                setWall(c, r);
                await sleep(400 / fps);
            }
        }
    }

    tiles[startY][startX].state = "s";
    tiles[endY][endX].state = "f"
}