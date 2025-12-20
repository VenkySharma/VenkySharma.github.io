const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const sets = [
  "0123456789",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "!@#$%^&*()-_=+[]{}|;:,.<>?",
  "█▓▒░│─┌┐└┘├┤┬┴┼▁▂▃▄▅▆▇█▉▊▋▌▍▎▏",
  "←↑→↓⇐⇒⇔⇑⇓",
  "αβγδελμπσΩ≈≠≤≥<>≡±∞∫∮⊕⊗⊙∑∏√∆∇",
  "アイウエオカキクケコサシスセソタチツテトナニヌネノ",
  "♠♣♥♦♪♫☼☽☾⚡☢☣☠☯✦✪✩✫✬✭"
];

// Split into array of characters to handle multi-byte symbols
let greenchars = sets[Math.floor(Math.random() * sets.length)].split('');
let redchars = sets[Math.floor(Math.random() * sets.length)].split('');

const fontSize = 16;
ctx.font = fontSize + "px monospace";

let columns = Math.floor(canvas.width / fontSize);
let yPositions = Array(columns).fill(0);

let rows = Math.floor(canvas.height / fontSize);
let xPositions = Array(rows).fill(0);

window.addEventListener("resize", () => {
  columns = Math.floor(canvas.width / fontSize);
  rows = Math.floor(canvas.height / fontSize);
  yPositions = Array(columns).fill(0);
  xPositions = Array(rows).fill(0);
});

// Optional: dynamic charset switching every 10s
setInterval(() => {
  greenchars = sets[Math.floor(Math.random() * sets.length)].split('');
  redchars   = sets[Math.floor(Math.random() * sets.length)].split('');
}, 10000);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ---- GREEN VERTICAL ----
  ctx.fillStyle = "lime";
  //ctx.shadowColor = "lime";
  //ctx.shadowBlur = 1;
  for (let i = 0; i < yPositions.length; i++) {
    const char = greenchars[Math.floor(Math.random() * greenchars.length)];
    const x = i * fontSize;
    const y = yPositions[i] * fontSize;

    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      yPositions[i] = 0;
    } else {
      yPositions[i]++;
    }
  }

  // ---- RED HORIZONTAL ----
  ctx.fillStyle = "red";
  //ctx.shadowColor = "red";
  //ctx.shadowBlur = 1;
  for (let i = 0; i < xPositions.length; i++) {
    const char = redchars[Math.floor(Math.random() * redchars.length)];
    const x = xPositions[i] * fontSize;
    const y = i * fontSize;

    ctx.fillText(char, x, y);

    if (x > canvas.width && Math.random() > 0.975) {
      xPositions[i] = 0;
    } else {
      xPositions[i]++;
    }
  }

  requestAnimationFrame(drawMatrix);
}

drawMatrix();
