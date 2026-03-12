document.addEventListener("DOMContentLoaded", () => {

  /* ⭐ STAR RATING */

  const stars = document.querySelectorAll(".star");
  const ratingInput = document.getElementById("ratingValue");

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const rating = index + 1;
      ratingInput.value = rating;

      stars.forEach((s, i) => {
        s.classList.toggle("active", i < rating);
      });
    });
  });



  /* 📩 FORM SUBMIT ANIMATION */

  const form = document.getElementById("feedbackForm");
  const successMsg = document.getElementById("successMsg");

  form.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = new FormData(form);

    await fetch(form.action,{
      method:"POST",
      body:data,
      headers:{
        'Accept':'application/json'
      }
    });

    form.reset();

    stars.forEach(s => s.classList.remove("active"));

    successMsg.style.display="block";
  });



  /* 🎇 PARTICLE BACKGROUND */

  const canvas = document.getElementById("particle-bg");
  const ctx = canvas.getContext("2d");

  let particles = [];
  const numParticles = 70;

  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  for(let i=0;i<numParticles;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*2+1,
      xs:(Math.random()-0.5)*0.6,
      ys:(Math.random()-0.5)*0.6
    });
  }

  function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle="rgba(255,255,255,0.7)";
      ctx.fill();

      p.x+=p.xs;
      p.y+=p.ys;

      if(p.x<0||p.x>canvas.width) p.xs*=-1;
      if(p.y<0||p.y>canvas.height) p.ys*=-1;
    });

    requestAnimationFrame(draw);
  }

  draw();

});
