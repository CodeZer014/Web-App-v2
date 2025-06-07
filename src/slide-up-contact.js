document.addEventListener("DOMContentLoaded", () => {
    const contactBtn = document.getElementById("contactBtn");
    const contactContainer = document.getElementById("contactContainer");
    const arrow = contactContainer.querySelector(".slide-arrow");
  
    if (!contactBtn || !contactContainer || !arrow) {
      console.error("Missing elements for Contact Us slide-up init");
      return;
    }
  
    function positionArrow() {
        const btnRect  = contactBtn.getBoundingClientRect();
        const contRect = contactContainer.getBoundingClientRect();
  
        const arrowHalf = 10;
        const targetX   = btnRect.left + btnRect.width / 2;
        const leftPos   = targetX - contRect.left - arrowHalf;
        arrow.style.left = `${leftPos}px`;
      }
  
    function toggleContact() {
      if (window.innerWidth <= 768) closeAllMenus();
      document.querySelectorAll(".slide-up").forEach(el => {
        if (el !== contactContainer) el.classList.add("hidden");
      });
  
      if (contactContainer.classList.contains("hidden")) {
        requestAnimationFrame(() => {
            positionArrow();
          });
        contactContainer.classList.remove("hidden");
      } else {
        contactContainer.classList.add("hidden");
      }
    }
  
    function clickOutside(e) {
      if (!contactContainer.contains(e.target) && e.target !== contactBtn) {
        contactContainer.classList.add("hidden");
      }
    }
  
    contactBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleContact();
    });
  
    window.addEventListener("resize", () => {
      if (!contactContainer.classList.contains("hidden")) {
        positionArrow();
      }
    });
  
    document.addEventListener("click", clickOutside);
  });