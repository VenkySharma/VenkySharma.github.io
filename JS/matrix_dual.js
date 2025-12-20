const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Resize function
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Characters
const chars = "01ABCDEF#$%&@";
const fontSize = 16;
ctx.font = fontSize + "px monospace";

// VERTICAL MATRIX (green)
let columns = Math.floor(canvas.width / fontSize);
let yPositions = Array(columns).fill(0);

// HORIZONTAL MATRIX (red)
let rows = Math.floor(canvas.height / fontSize);
let xPositions = Array(rows).fill(0);

// Reset positions on resize
window.addEventListener("resize", () => {
  columns = Math.floor(canvas.width / fontSize);
  rows = Math.floor(canvas.height / fontSize);
  yPositions = Array(columns).fill(0);
  xPositions = Array(rows).fill(0);
});

// Draw loop
function drawMatrix() {
  // Fade background
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ---- GREEN VERTICAL ----
  ctx.fillStyle = "lime";
  for (let i = 0; i < yPositions.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
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
  for (let i = 0; i < xPositions.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
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

// Start animation
drawMatrix();
