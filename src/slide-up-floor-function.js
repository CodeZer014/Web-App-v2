document.addEventListener('DOMContentLoaded', () => {
    const imgEl   = document.getElementById('mapPanelImage');
    const buttons = document.querySelectorAll('.floor-option');
    let   currentBtn = null;
  
    function initSlideUp(buttonId, containerId) {
      const btn       = document.getElementById(buttonId);
      const container = document.getElementById(containerId);
      const arrow     = container.querySelector('.slide-arrow');
  
      if (!btn || !container || !arrow) {
        console.error(`Missing elements for slide-up init: ${buttonId}, ${containerId}`);
        return;
      }
  
      function positionArrow() {
        const btnRect  = btn.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();

        const arrowHalf = 10;
        const targetX   = btnRect.left + btnRect.width / 2;
        const leftPos   = targetX - contRect.left - arrowHalf;
        arrow.style.left = `${leftPos}px`;
      }
  
      function toggleContainer() {
        if (container.classList.contains('hidden')) {
          document.querySelectorAll('.slide-up').forEach(el => el.classList.add('hidden'));
  
          container.classList.remove('hidden');
  
          requestAnimationFrame(() => {
            positionArrow();
          });
        } else {
          container.classList.add('hidden');
        }
      }
  
      // Close if user clicks outside
      function clickOutsideHandler(e) {
        if (!container.contains(e.target) && e.target !== btn) {
          container.classList.add('hidden');
        }
      }
  
      btn.addEventListener('click', toggleContainer);
      window.addEventListener('resize', () => {
        if (!container.classList.contains('hidden')) {
          positionArrow();
        }
      });
      document.addEventListener('click', clickOutsideHandler);
    }
  
    // Initialize slide-up for the FLOOR PLAN button + container
    initSlideUp('floorPlanBtn', 'floorPlanContainer');
  
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentBtn = btn;
  
        const level = btn.textContent.trim().toUpperCase();
        imgEl.src = `../assets/maps/${level}.png`;
        imgEl.alt = `${level} map`;
      });
    });
  });
  