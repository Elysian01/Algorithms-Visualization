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

function revDivOrintation(cc, rr) {
    if (cc < rr) {
        return "horizontal";
    } else if (rr < cc) {
        return "vertical";
    } else if (Math.random() > 0.5) {
        return "horizontal";
    } else {
        return "vertical";
    }
}

async function recursiveDivisionAlgo(sr, sc, br, bc, orintation) {

    let nr = br - sr;
    let nc = bc - sc;

    if (nr < 2 || nc < 2) {
        return
    }

    if (orintation == undefined) {
        orintation = revDivOrintation(nc, nr);
    }

    let randRow = randInt(sr, br + 1);
    let randCol = randInt(sc, bc + 1);

    if (orintation == "horizontal") {

        for (let i = sc; i <= bc; i++) {
            if (i != randCol) {
                setWall(i, randRow);
                await sleep(750 / fps);
            }
            if (Math.random() <= leaveSomeEmptyProb) {
                setEmpty(i, randRow);
                await sleep(400 / fps);
            }
        }

        await recursiveDivisionAlgo(sr, sc, randRow - 1, bc, "vertical")
        await recursiveDivisionAlgo(randRow + 1, sc, br, bc, "vertical")
    } else {

        for (let i = sr; i <= br; i++) {
            if (i != randRow) {
                setWall(randCol, i);
                await sleep(750 / fps);
            }
            if (Math.random() <= leaveSomeEmptyProb) {
                setEmpty(i, randRow);
                await sleep(400 / fps);
            }
        }

        await recursiveDivisionAlgo(sr, sc, br, randCol - 1, "horizontal")
        await recursiveDivisionAlgo(sr, randCol + 1, br, bc, "horizontal")
    }
}


async function recursiveDivision() {
    reset();
    await recursiveDivisionSetup();
    await recursiveDivisionAlgo(1, 1, rows - 1, columns - 1)

    await recursiveDivisionSetup()
    await drawStartAndEnd();
}