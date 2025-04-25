// Function to toggle position content visibility
function togglePosition(positionId) {
  // Get all position content elements
  const allPositions = document.querySelectorAll(".position-content");

  // Hide all position contents first
  allPositions.forEach((position) => {
    position.style.display = "none";
  });

  // Show the selected position content
  const selectedPosition = document.getElementById(positionId);
  selectedPosition.style.display = "block";
}

// Hide all position contents when page loads
document.addEventListener("DOMContentLoaded", function () {
  const allPositions = document.querySelectorAll(".position-content");
  allPositions.forEach((position) => {
    position.style.display = "none";
  });
});
