/*
Contains all the variables and initialization
*/

let rows = 17;
let columns = 42;
const fps = 75;
var probability = 0.4;
var leaveSomeEmptyProb = 0.3; // For Rectangular maze

let scale = 25;
let offset = 2.5;

const tileW = 25;
const tileH = 25;
const tileMargin = 3;
const startY = 12;
const startX = 8;
const endX = 8;
const endY = 30;

var tiles = [];

const canvas = document.querySelector("#main-canvas");
let width = canvas.width;
let height = canvas.height;
const ctx = canvas.getContext("2d");

const endPointColor = "#ff304f"; // red
const startPointColor = "#FFC60B"; // light green
const wallColor = "#343837"; // dark gray
const defaultColor = "#E0E0E0"; // light gray

const visitedColor = "#05DFD7"; // sky
const discoveredColor = "#02066F"; // purple
const defaultBorder = "#247AFD"; // blue

const pathColor = "#40ff00"; // light green
const pathLineColor = "#ff304f"; // red

// user controls this using a button
const diagonals = false;
let interrupt = false;
let doingSomething = false;


// Async sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}