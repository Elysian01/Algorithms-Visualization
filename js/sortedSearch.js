const resetBtn = document.getElementById("reset");
const searchBtn = document.getElementById("search");
const result = document.querySelector(".result");

var arr = [];

let delay = 750;

function init(elements = 10, speed = 750) {
    addCard(elements);
    delay = speed;
    result.style.display = "none";
    sortResetArray();
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function linearSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

function sortResetArray() {
    arr = [];
    console.log("Array reset called !");
    blocks = document.querySelectorAll(".card");
    indexs = document.querySelectorAll(".index");
    for (let i = 0; i < blocks.length; i++) {
        let num = randomIntFromInterval(5, 100);
        //    document.getElementById(i).innerText = num;
        arr.push(num);
        blocks[i].style.backgroundColor = "#003b46";
        indexs[i].style.backgroundColor = "#5bc8ac";
        indexs[i].style.color = "#003b46";
    }
    arr = linearSort(arr);
    for (let i = 0; i < blocks.length; i++) {
        document.getElementById(i).innerText = arr[i];
    }
    result.style.display = "none";
    document.getElementById("searchKey").value = "";
}

function visualize() {
    const elements = document.getElementById("elements").value;
    const speed = document.getElementById("speed").value;
    init(elements, speed);
}

function jumpVisualize() {
    visualize();
    const m = document.getElementById("m-value");
    m.innerText = Math.floor(Math.sqrt(arr.length));
}

function addCard(elements = 10) {
    const container = document.querySelector(".row");
    container.innerHTML = "";
    for (let i = 0; i < elements; i++) {
        container.innerHTML += `<div class="column"><div class="card"><span id="${i}">56</span><span class="index">${i}</span></div></div>`;
    }
}

async function binarySearch() {
    let found = false;
    let left = 0;
    let right = arr.length - 1;
    const searchKey = document.getElementById("searchKey").value;

    if (searchKey === "") {
        alert("Please Enter number you have to find");
    } else {
        document.getElementById("searchKey").disabled = true;
        document.getElementById("search").disabled = true;
        document.getElementById("reset").disabled = true;
        document.getElementById("visualize").disabled = true;

        blocks = document.querySelectorAll(".card");
        indexs = document.querySelectorAll(".index");
        // arr = arr.sort();

        while (left <= right) {
            mid = Math.floor((right + left) / 2);
            blocks[mid].style.backgroundColor = "#5bc8ac";
            indexs[mid].style.backgroundColor = "#003b46";
            indexs[mid].style.color = "#5bc8ac";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            if (arr[mid] == searchKey) {
                result.style.display = "block";
                result.innerHTML = `Number found at index : ${mid}`;
                //  console.log(
                //      `${searchKey} Number found at  index ${mid} in array `
                //  );
                found = true;
                break;
            } else if (searchKey < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
            blocks[mid].style.backgroundColor = "#003b46";
            indexs[mid].style.backgroundColor = "#5bc8ac";
            indexs[mid].style.color = "#003b46";
        }

        if (!found) {
            result.style.display = "block";
            result.innerHTML = "Number not found ";
            window.scrollBy({ top: 500, behavior: "smooth" });
        }
        document.getElementById("searchKey").disabled = false;
        document.getElementById("search").disabled = false;
        document.getElementById("reset").disabled = false;
        document.getElementById("visualize").disabled = false;
        searchKey.value = "";
    }
}

async function jumpSearch() {
    const m = document.getElementById("m-value");
    const n = arr.length;
    let found = false;
    var jumpStep = Math.floor(Math.sqrt(n));
    m.innerText = jumpStep;
    const searchKey = document.getElementById("searchKey").value;
    let prev = 0;

    if (searchKey === "") {
        alert("Please Enter number you have to find");
    } else {
        document.getElementById("searchKey").disabled = true;
        document.getElementById("search").disabled = true;
        document.getElementById("reset").disabled = true;
        document.getElementById("visualize").disabled = true;

        while (arr[Math.min(jumpStep, n) - 1] < searchKey) {
            prev = jumpStep;
            if (prev < arr.length) {
                blocks[prev].style.backgroundColor = "#5bc8ac";
                indexs[prev].style.backgroundColor = "#003b46";
                indexs[prev].style.color = "#5bc8ac";
            }

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            console.log(jumpStep);

            jumpStep += Math.floor(Math.sqrt(n));
            if (prev >= n) {
                break;
            }
        }

        while (arr[prev] < searchKey) {
            prev++;
            blocks[prev].style.backgroundColor = "#5bc8ac";
            indexs[prev].style.backgroundColor = "#003b46";
            indexs[prev].style.color = "#5bc8ac";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            if (prev == arr[Math.min(jumpStep, n)]) {
                found = true;
                break;
            }
        }
        if (arr[prev] == searchKey) {
            found = true;
        }

        if (found) {
            result.style.display = "block";
            result.innerHTML = `Number found at index : ${prev}`;
        } else {
            result.style.display = "block";
            result.innerHTML = "Number not found ";
        }
        window.scrollBy({ top: 500, behavior: "smooth" });
        document.getElementById("searchKey").disabled = false;
        document.getElementById("search").disabled = false;
        document.getElementById("reset").disabled = false;
        document.getElementById("visualize").disabled = false;
        searchKey.value = "";
    }
}

async function exponentSearch() {
    let found = false;
    const searchKey = document.getElementById("searchKey").value;
    blocks = document.querySelectorAll(".card");
    indexs = document.querySelectorAll(".index");
    const n = arr.length;

    if (searchKey === "") {
        alert("Please Enter number you have to find");
    } else {
        document.getElementById("searchKey").disabled = true;
        document.getElementById("search").disabled = true;
        document.getElementById("reset").disabled = true;
        document.getElementById("visualize").disabled = true;

        if (arr[0] == searchKey) {
            blocks[0].style.backgroundColor = "#5bc8ac";
            indexs[0].style.backgroundColor = "#003b46";
            indexs[0].style.color = "#5bc8ac";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            index = 0;
            result.style.display = "block";
            result.innerHTML = `Number found at index : ${index}`;
            found = true;
            return 0;
        }

        let i = 1;

        if (!found) {
            while (i < n && arr[i] <= searchKey) {
                i = i * 2;

                if (i < n && arr[i] <= searchKey) {
                    blocks[i].style.backgroundColor = "#5bc8ac";
                    indexs[i].style.backgroundColor = "#003b46";
                    indexs[i].style.color = "#5bc8ac";

                    await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, delay)
                    );

                    if (arr[i] === searchKey) {
                        result.style.display = "block";
                        result.innerHTML = `Number found at index : ${i}`;
                        return 0;
                    }
                }
            }
        }

        iterativeBinarySearch(arr, i / 2, Math.min(i, n), searchKey);
    }
}

async function iterativeBinarySearch(arr, left, right, searchKey) {
    let found = false;
    blocks = document.querySelectorAll(".card");
    indexs = document.querySelectorAll(".index");

    while (left <= right) {
        mid = Math.floor((right + left) / 2);
        if (mid < arr.length) {
            blocks[mid].style.backgroundColor = "#5bc8ac";
            indexs[mid].style.backgroundColor = "#003b46";
            indexs[mid].style.color = "#5bc8ac";
        }
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        if (arr[mid] == searchKey) {
            result.style.display = "block";
            result.innerHTML = `Number found at index : ${mid}`;
            found = true;
            break;
        } else if (searchKey < arr[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
        if (mid < arr.length) {
            blocks[mid].style.backgroundColor = "#003b46";
            indexs[mid].style.backgroundColor = "#5bc8ac";
            indexs[mid].style.color = "#003b46";
        }
    }
    console.log(found);

    if (!found) {
        result.style.display = "block";
        result.innerHTML = "Number not found ";
        window.scrollBy({ top: 500, behavior: "smooth" });
    }
    window.scrollBy({ top: 500, behavior: "smooth" });
    document.getElementById("searchKey").disabled = false;
    document.getElementById("search").disabled = false;
    document.getElementById("reset").disabled = false;
    document.getElementById("visualize").disabled = false;
    searchKey.value = "";
}

window.onload = () => {
    init();
};