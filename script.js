

// position scrolling
// ** used AI to learn about intersection observer
document.addEventListener("DOMContentLoaded", () => {
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
});
