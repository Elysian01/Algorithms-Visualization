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
    arr = arr.sort();
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
        blocks = document.querySelectorAll(".card");
        indexs = document.querySelectorAll(".index");
        arr = arr.sort();

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
        while (arr[Math.min(jumpStep, n) - 1] < searchKey) {
            prev = jumpStep;
            blocks[prev].style.backgroundColor = "#5bc8ac";
            indexs[prev].style.backgroundColor = "#003b46";
            indexs[prev].style.color = "#5bc8ac";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            jumpStep += jumpStep;
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
        searchKey.value = "";
    }
}

window.onload = () => {
    init();
};