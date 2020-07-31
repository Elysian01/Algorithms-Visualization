// Sorted Array
// Jumping from values to values to find perfect range in which number lies then followed by linear search

function jumpSearch() {
    const arr = [1, 25, 60, 64, 70, 75, 80, 86, 91, 95, 98, 99, 100];
    const n = arr.length;
    let found = false;
    const jumpStep = Math.floor(Math.sqrt(n));
    const searchKey = 91;
    let prev = 0;
    while (arr[Math.min(jumpStep, n) - 1] < searchKey) {
        prev = jumpStep;
        jumpStep += jumpStep;
        if (prev >= n) {
            break
        }
    }

    while (arr[prev] > searchKey) {
        prev++

        if (prev == min(jumpStep, n)) {
            break
        }
    }
    if (arr[prev] == searchKey)

}