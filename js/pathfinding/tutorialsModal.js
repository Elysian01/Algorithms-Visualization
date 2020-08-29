tutorial = document.querySelector(".tutorial-container");
tutorialBody = document.querySelector(".tutorial-content");
tutorialBtns = document.querySelector(".tutorial-btns");
body = document.querySelector(".content");
overlay = document.querySelector(".overlay");
skip = document.getElementById("skip");
next = document.getElementById("next");
prev = document.getElementById("prev");
finish = document.querySelector(".finish");

var tutorialPage = 1;


document.getElementById("tutorial").addEventListener("click", enableTutorial);

function enableTutorial() {
    tutorial.classList.toggle("tutorial-active");
    body.classList.add("tutorial-body-active")
    overlay.classList.add("blackish")
}

// Next && Prev
next.addEventListener("click", () => {
    if (tutorialPage < 7) {
        tutorialPage++;
    }
    tutorialDisplay();
})
prev.addEventListener("click", () => {
    if (tutorialPage > 1) {
        tutorialPage--;
    }
    tutorialDisplay();
})


// Skip
skip.addEventListener("click", () => {
    closeModal();
})

function closeModal() {
    tutorial.classList.toggle("tutorial-active");
    body.classList.remove("tutorial-body-active");
    overlay.classList.remove("blackish");
    tutorialPage = 1;
    tutorialBody.innerHTML = "<div class='tutorial-header'><h1> Welcome to Pathfinding Visualizer! <sup> 1/6</sup></h1></div><h2>This short tutorial will walk you through all of the features of this application.</h2><h3>If you want to dive right in, feel free to press the 'Skip Tutorial' button below. Otherwise, press 'Next'!</h3><img src='../img/pathfinding_tutorial/logo.png' alt='demo image' id='tutorial-img'>";

}

function tutorialDisplay() {

    if (tutorialPage == 1) {
        tutorialBody.innerHTML = "<div class='tutorial-header'><h1> Welcome to Pathfinding Visualizer! <sup> 1/7</sup></h1></div><h2>This short tutorial will walk you through all of the features of this application.</h2><h3>If you want to dive right in, feel free to press the 'Skip Tutorial' button below. Otherwise, press 'Next'!</h3><br><img src='../img/pathfinding_tutorial/logo.png' alt='demo image' id='tutorial-img'>";

    } else if (tutorialPage == 2) {
        tutorialBody.innerHTML = "<div class='tutorial-header'><h1>Pick An Algorithm <sup> 2/7</sup></h1></div><h2>Choose Any Algorithm out of 5</h2><h3>After choosing algorithm click on Visulize button</h3><br><img src='../img/pathfinding_tutorial/algo.png' alt='demo image' id='tutorial-img'>";

    } else if (tutorialPage == 3) {
        tutorialBody.innerHTML = "<div class='tutorial-header'><h1>Add Walls <sup> 3/7</sup></h1></div><h2>Turn your Imagination into reality and explore different cases</h2><h3>Click or Drag on any cell on grid to make it as wall ,reclick on cell to make it disapper</h3><br><img src='../img/pathfinding_tutorial/wall.gif' alt='demo image' id='tutorial-img'>";

    } else if (tutorialPage == 4) {
        tutorialBody.innerHTML = "<div class='tutorial-header'><h1>Add Weights <sup> 4/7</sup></h1></div><h2>Turn your Imagination into reality and explore different cases</h2><h3>Click on any cell on grid to make it as weight. <br><br> Turn off weights option and reclick on cell to make it disapper, each weight is of value 10, and all empty cells in the grid have a value of 50, Helpful to test the shortest path if multiple paths are possible</h3><br><img src='../img/pathfinding_tutorial/weight.gif' alt='demo image' id='tutorial-img'>";

    } else if (tutorialPage == 5) {
        tutorialBody.innerHTML = "<div class='tutorial-header'><h1>Add Start and End Point <sup> 5/7</sup></h1></div><h2>Turn your Imagination into reality and explore different cases</h2><h3>Click on any cell on grid to make it as source or destination</h3><br><img src='../img/pathfinding_tutorial/start.gif' alt='demo image' id='tutorial-img'>";

    } else if (tutorialPage == 6) {
        tutorialBody.innerHTML = "<div class='tutorial-header'><h1>Select Maze <sup> 6/7</sup></h1></div><h2>Built Awesome random Mazes (through recursive division algorithm) and Walls</h2><h3>Select either 'Built Maze' or 'Random Wall Maze' and have fun !</h3><br><img src='../img/pathfinding_tutorial/maze.gif' alt='demo image' id='tutorial-img'>";

    } else if (tutorialPage == 7) {
        tutorialBody.innerHTML = "<div class='tutorial-header'><h1>Visualize And Have Fun !!!<sup> 7/7</sup></h1></div><h2>After choosing algorithm and maze click on visualize button.</h2><h3>During the visualization process you can add walls and weights to see how the algorithm adapts to change, Buttons in navbar are disable during the process to avoid any mishapes </h3><br><img src='../img/pathfinding_tutorial/visualize.gif' alt='demo image' id='tutorial-img'>";
        tutorialBtns.style.display = "none";
        finish.style.display = "block";
        finish.addEventListener("click", () => {
            tutorial.classList.toggle("tutorial-active");
            body.classList.remove("tutorial-body-active");
            tutorialPage = 1;
            tutorialBody.innerHTML = "<div class='tutorial-header'><h1> Welcome to Pathfinding Visualizer! <sup> 1/6</sup></h1></div><h2>This short tutorial will walk you through all of the features of this application.</h2><h3>If you want to dive right in, feel free to press the 'Skip Tutorial' button below. Otherwise, press 'Next'!</h3><img src='../img/pathfinding_tutorial/logo.png' alt='demo image' id='tutorial-img'>";
            tutorialBtns.style.display = "flex";
            finish.style.display = "none";
            overlay.classList.remove("blackish");
        })

        // tutorial.classList.toggle("tutorial-active");
        // body.classList.remove("tutorial-body-active")
    }

}