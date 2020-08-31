/*
Contains all the variables and initialization
*/


var rows = 17;
var columns = 42;


const fps = 75;
var probability = 0.35; // higher prob  = more walls
var leaveSomeEmptyProb = 0.35; // For Rectangular maze
var heuristics = false;
var inputWeight = false;
var visitedNodes = 0;

var initialWeight = 50;
var reducedWeight = 5;

let scale = 25;
let offset = 2.5;

const tileW = 25;
const tileH = 25;
const tileMargin = 3;
var startY = 12;
var startX = 8;
var endX = 8;
var endY = 30;

var placeSource = false;
var placeDestination = false;

var tiles = [];

const canvas = document.querySelector("#main-canvas");
let width = canvas.width;
let height = canvas.height;
const ctx = canvas.getContext("2d");

const endPointColor = "#ff304f"; // red
const startPointColor = "#FFC60B"; // gold
const wallColor = "#343837"; // dark gray
const defaultColor = "#E0E0E0"; // light gray

const weightColor = "#090088"; // violet
const visitedColor = "#05DFD7"; // sky
const pathColor = "#40ff00"; // light green

// user controls this using a button
const diagonals = false;
let interrupt = false;
let doingSomething = false;

// Async sleep function
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}