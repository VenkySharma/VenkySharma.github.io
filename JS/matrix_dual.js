function drawBoth() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // GREEN vertical
  ctx.fillStyle = "lime";
  for (let i = 0; i < yPositions.length; i++) {
    const char = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillText(char, i * fontSize, yPositions[i]);
    yPositions[i] += fontSize;
    if (yPositions[i] > canvas.height) yPositions[i] = 0;
  }

  // RED horizontal
  ctx.fillStyle = "red";
  for (let i = 0; i < xPositions.length; i++) {
    const char = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillText(char, xPositions[i], i * fontSize);
    xPositions[i] += fontSize;
    if (xPositions[i] > canvas.width) xPositions[i] = 0;
  }
}
