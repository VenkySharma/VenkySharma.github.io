const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = "01ABCDEF#$%&@".split("");
const fontSize = 16;
const rows = Math.floor(canvas.height / fontSize);

// Each row has its own X position
const xPositions = Array(rows).fill(0).map(() => Math.random() * canvas.width);

function drawHorizontalMatrix() {
  // Fade background
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red"; // 🔴 RED MATRIX
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < xPositions.length; i++) {
    const char = characters[Math.floor(Math.random() * characters.length)];
    const x = xPositions[i];
    const y = i * fontSize;

    ctx.fillText(char, x, y);

    xPositions[i] += fontSize;

    if (xPositions[i] > canvas.width && Math.random() > 0.97) {
      xPositions[i] = 0;
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  drawHorizontalMatrix();
}

animate();

// Handle resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
