/*
Contains all the variables and initialization
*/

let rows = 25;
let columns = 50;
const fps = 75;

const tileW = 20;
const tileH = 20;
const tileMargin = 3;
var tiles = [];

const canvas = document.querySelector("#main-canvas");
let width = canvas.width;
let height = canvas.height;
const ctx = canvas.getContext("2d");

const endPointColor = "#ff304f"; // red
const startPointColor = "#40ff00"; // light green
const visitedColor = "#EDC8FE"; // light purple
const wallColor = "#343837"; // dark gray

const weightBorder = "#02066F"; // purple
const defaultBorder = "#247AFD"; // blue
const defaultColor = "#a6a6a6"; // light gray

const pathColor = "#01F9C6"; // light green
const pathLineColor = "#ff304f"; // red

// user controls this using a button
const diagonals = false;
let interrupt = false;
let doingSomething = false;