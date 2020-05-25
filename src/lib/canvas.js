const pixelRatio = window.devicePixelRatio || 1;
let canvas;
let ctx;

// it's a PITA to mock canvas in jest so we just hack it when it's running
if (process.env.NODE_ENV === "test") {
  canvas = {
    style: {},
  };
  ctx = {};
} else {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
}

export const layers = {
  ground: 100,
  tracks: 200,
  items: 300,
  player: 400,
  abovePlayer: 500,
  sky: 600,
};

export const grid = {
  width: 100,
  height: 34,

  map: {
    width: 79,
    height: 29,
    x: 21,
    y: 3,
  },

  log: {
    width: 79,
    height: 3,
    x: 21,
    y: 0,
  },

  hud: {
    width: 20,
    height: 34,
    x: 0,
    y: 0,
  },

  hud2: {
    width: 79,
    height: 2,
    x: 21,
    y: 32,
  },

  menu: {
    width: 40,
    height: 30,
    x: 20,
    y: 3,
  },

  menu2: {
    width: 40,
    height: 30,
    x: 60,
    y: 3,
  },

  menu3: {
    width: 79,
    height: 34,
    x: 20,
    y: 0,
  },
};

const font = "Menlo";
const lineHeight = 1.2;

let calculatedFontSize = window.innerWidth / grid.width;
let cellWidth = calculatedFontSize * pixelRatio;
let cellHeight = calculatedFontSize * lineHeight * pixelRatio;
let fontSize = calculatedFontSize * pixelRatio;

canvas.style.cssText = `width: ${calculatedFontSize * grid.width}; height: ${
  calculatedFontSize * lineHeight * grid.height
}`;
canvas.width = cellWidth * grid.width;
canvas.height = cellHeight * grid.height;

ctx.font = `normal ${fontSize}px ${font}`;
ctx.textAlign = "center";
ctx.textBaseline = "middle";

const drawBackground = (color, position, alpha = 1) => {
  if (color === "transparent") return;

  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillRect(
    position.x * cellWidth,
    position.y * cellHeight,
    cellWidth,
    cellHeight
  );
};

const drawChar = (char, color, position, alpha = 1) => {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillText(
    char,
    position.x * cellWidth + cellWidth / 2,
    position.y * cellHeight + cellHeight / 2
  );
};

export const drawCell = (entity, options = {}) => {
  const { fg, bg, x, y, fgA = 1, bgA = 1 } = options;
  const {
    appearance: { char, background, color },
    position,
  } = entity;

  const bgColor = bg ? bg : background;
  const charColor = fg ? fg : color;
  const pos = x && y ? { x, y } : position;

  drawBackground(bgColor, pos, bgA);
  drawChar(char, charColor, pos, fgA);
};

export const clearCanvas = () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height);

export const clearCell = (x, y) => {
  ctx.clearRect(x, y, cellWidth, cellHeight);
};

export const pxToCell = (ev) => {
  const bounds = canvas.getBoundingClientRect();
  const relativeX = ev.clientX - bounds.left;
  const relativeY = ev.clientY - bounds.top;
  const colPos = Math.trunc((relativeX / cellWidth) * pixelRatio);
  const rowPos = Math.trunc((relativeY / cellHeight) * pixelRatio);

  return [colPos, rowPos];
};

export const onClick = (handler) => {
  canvas.addEventListener("click", (ev) => {
    const cell = pxToCell(ev);
    handler(cell[0], cell[1]);
  });
};

export const onMouseMove = (handler) => {
  canvas.addEventListener("mousemove", (ev) => {
    const cell = pxToCell(ev);
    handler(cell[0], cell[1]);
  });
};
