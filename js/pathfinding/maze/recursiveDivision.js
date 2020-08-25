async function recursiveDivisionSetup() {

    // for rows
    for (let c = 0; c < columns && !interrupt; c++) {
        setWall(c, 0);
        setWall(c, rows - 1);
        await sleep(1500 / fps);
    }

    for (let r = 0; r < rows && !interrupt; r++) {
        setWall(0, r);
        setWall(columns - 1, r);
        await sleep(2000 / fps);
    }
}


async function recursiveDivision() {
    reset();
    await recursiveDivisionSetup();
}