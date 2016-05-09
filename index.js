'use strict';
// to enable debug, uncomment the next line
// window.localStorage.debug = '*';
const dSetup = debug('setup');
const dTick = debug('tick');
const dUpdate = debug('update');
const dDraw = debug('draw');
const dFps = debug('fps');

dSetup('starting');
let c = document.getElementById('c');
c.width = window.innerWidth;
c.height = window.innerHeight;
let ctx = c.getContext('2d');

let frameCount = 0;
let now = 0;
let then = 0;
let delta = 0;
const FRAME_TIME = 1000 / 60;
const tick = () => {
	dTick('new frame');
	frameCount++;
	now = performance.now();
	dFps(1000 / (now - then));
	delta = (now - then) / FRAME_TIME;
	dUpdate('starting');
	update();
	dUpdate('ended');
	dDraw('starting');
	draw();
	dDraw('ended');
	then = now;
	requestAnimationFrame(tick);
};

const W = c.width / 100;
const H = c.height / 100;

// globals
// globals

const update = () => {
};

const draw = () => {
};

dSetup('ended');
tick();
