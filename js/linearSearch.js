const resetBtn = document.getElementById("reset");
const searchBtn = document.getElementById("search");
const result = document.querySelector(".result");

var arr = [];

var delay = 750;

function init(elements = 10, speed = 750) {
    addCard(elements);
    delay = speed;
    result.style.display = "none";
    resetArray();
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetArray() {
    arr = [];
    // console.log("Array reset called !");
    blocks = document.querySelectorAll(".card");
    indexs = document.querySelectorAll(".index");
    for (let i = 0; i < blocks.length; i++) {
        let num = randomIntFromInterval(5, 100);
        document.getElementById(i).innerText = num;
        arr.push(num);
        blocks[i].style.backgroundColor = "#003b46";
        indexs[i].style.backgroundColor = "#5bc8ac";
        indexs[i].style.color = "#003b46";
    }
    result.style.display = "none";
    document.getElementById("searchKey").value = "";
}

function visualize() {
    const elements = document.getElementById("elements").value;
    const speed = document.getElementById("speed").value;
    init(elements, speed);
}

function addCard(elements = 10) {
    const container = document.querySelector(".row");
    container.innerHTML = "";
    for (let i = 0; i < elements; i++) {
        container.innerHTML += `<div class="column"><div class="card"><span id="${i}">56</span><span class="index">${i}</span></div></div>`;
    }
}

async function linearSearch() {
    let found = false;
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
        for (let i = 0; i < arr.length; i++) {
            blocks[i].style.backgroundColor = "#5bc8ac";
            indexs[i].style.backgroundColor = "#003b46";
            indexs[i].style.color = "#5bc8ac";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            if (arr[i] == searchKey) {
                result.style.display = "block";
                result.innerHTML = `Number found at index : ${i}`;
                console.log(
                    `${searchKey} Number found at  index ${i} in array `
                );
                found = true;
                break;
            }

            blocks[i].style.backgroundColor = "#003b46";
            indexs[i].style.backgroundColor = "#5bc8ac";
            indexs[i].style.color = "#003b46";
        }
        if (!found) {
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

window.onload = () => {
    init();
};