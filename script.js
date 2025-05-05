// add event listener
document.addEventListener("DOMContentLoaded", () => {
  // parallax effect for the banner
  initParallaxEffect();

  // position snap functionality
  initPositionScrolling();

  // horizontal scrolling snap functionality
  initHorizontalScrolling();

  // image transitions and content scrolling
  initTeamsSection();
});

// parallax effect for banner
function initParallaxEffect() {
  // choose banner image
  const banner = document.querySelector(".banner img");

  if (banner) {
    window.addEventListener("scroll", () => {
      // calculate how far down the page we've scrolled
      const scrollPosition = window.scrollY;
      // move the background image at a slower rate than the scroll speed
      // the 0.5 value determines the speed (lower = slower parallax)
      banner.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
  }
}

// position snapping functionality
function initPositionScrolling() {
  const dots = document.querySelectorAll(".scroll-dots .dot");
  const sections = document.querySelectorAll(".snap-content");

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

// horizontal scrolling functionality
function initHorizontalScrolling() {
  const horizontalDots = document.querySelectorAll(".h-scroll-dots .dot");
  const horizontalSections = document.querySelectorAll(".h-snap-content");

  // track when user is manually scrolling
  let isUserScrolling = false;
  let scrollTimeout;

  const container = document.querySelector(".h-snap-container");
  if (container) {
    container.addEventListener("scroll", () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 100);
    });
  }

  // horizontal scroll observer (same logic as vertical scroll)
  const horizontalObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          horizontalDots.forEach((dot) => {
            dot.classList.toggle(
              "active",
              dot.dataset.target === entry.target.id
            );
          });

          // Only add animation if not during user scrolling
          if (!isUserScrolling) {
            entry.target.classList.add("slide-in");
            setTimeout(() => entry.target.classList.remove("slide-in"), 600);
          }
        }
      });
    },
    {
      threshold: 0.5,
      root: document.querySelector(".horizontal-snap-container"),
    }
  );

  // observe each horizontal section
  horizontalSections.forEach((section) => horizontalObserver.observe(section));

  // add click event to horizontal dots
  horizontalDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetId = dot.dataset.target;
      document.getElementById(targetId).scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    });
  });
}

// image transitions and content scrolling functionality
function initTeamsSection() {
  const teamContents = document.querySelectorAll('.teams-content');
  const teamImages = document.querySelectorAll('.teams-image');
  const contentScroll = document.querySelector('.teams-content-scroll');
  
  if (!contentScroll || teamContents.length === 0) return;
  
  // Create an intersection observer for the team contents
  const teamObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the image ID from the data attribute
          const imageId = entry.target.dataset.image;
          
          // Hide all images
          teamImages.forEach(img => {
            img.classList.remove('active');
          });
          
          // Show the corresponding image
          const targetImage = document.getElementById(imageId);
          if (targetImage) {
            setTimeout(() => {
              targetImage.classList.add('active');
            }, 100); // Small delay for better transition effect
          }
        }
      });
    },
    {
      threshold: 0.7,
      root: contentScroll
    }
  );
  
  // Observe each team content section
  teamContents.forEach(content => {
    teamObserver.observe(content);
  });
  
  // Optional: Add scroll buttons for better UX
  const nextButton = document.createElement('button');
  nextButton.className = 'team-scroll-btn next-btn';
  nextButton.innerHTML = '&rarr;';
  nextButton.addEventListener('click', () => {
    contentScroll.scrollBy({
      left: contentScroll.clientWidth,
      behavior: 'smooth'
    });
  });
  
  const prevButton = document.createElement('button');
  prevButton.className = 'team-scroll-btn prev-btn';
  prevButton.innerHTML = '&larr;';
  prevButton.addEventListener('click', () => {
    contentScroll.scrollBy({
      left: -contentScroll.clientWidth,
      behavior: 'smooth'
    });
  });
  
  const teamsContainer = document.querySelector('.teams-container');
  if (teamsContainer) {
    teamsContainer.appendChild(nextButton);
    teamsContainer.appendChild(prevButton);
  }
}