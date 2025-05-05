// add event listener
document.addEventListener("DOMContentLoaded", () => {
  // parallax effect for the banner
  initParallaxEffect();

  // position snap functionality
  initPositionScrolling();
});

// parallax effect for banner
function initParallaxEffect() {
  // choose banner image
  const banner = document.querySelector(".banner img");

  if (banner) {
    window.addEventListener("scroll", () => {
      // calculate how far down the page we've scrolled
      const scrollPosition = window.pageYOffset;
      // move the background image at a slower rate than the scroll speed
      // the 0.5 value determines the speed (lower = slower parallax)
      banner.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
  }
}

// position snapping functionality 
function initPositionScrolling() {
  const dots = document.querySelectorAll(".dot");
  const sections = document.querySelectorAll(".position-snap");

  // goes through each section and checks if it's in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dots.forEach((dot) => {
            dot.classList.toggle(
              "active",
              dot.dataset.target === entry.target.id
            );
          });

          // add animation to the section
          entry.target.classList.add("bounce");
          setTimeout(() => entry.target.classList.remove("bounce"), 600);
        }
      });
    },
    {
      // how much of the section needs to be in view
      threshold: 0.5,
    }
  );

  // observe each section
  sections.forEach((section) => observer.observe(section));

  // add event listener to each dot
  // dots on the side
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetId = dot.dataset.target;
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
  });
}
