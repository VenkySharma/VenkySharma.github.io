// Future enhancement placeholder

document.addEventListener("DOMContentLoaded", () => {
  console.log("About page loaded successfully!");

  // Example: Smooth dropdown animation enhancement
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(drop => {
    const content = drop.querySelector(".dropdown-content");
    drop.addEventListener("mouseenter", () => {
      content.style.display = "block";
    });
    drop.addEventListener("mouseleave", () => {
      content.style.display = "none";
    });
  });
});
