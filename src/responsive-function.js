document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const menu   = document.querySelector('.button-bar');

    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.classList.add('nav-backdrop');
      document.body.appendChild(backdrop);
    }

    window.closeAllMenus = function() {
      // Close program popup
      document.getElementById('programPopup')?.classList.add('hidden');
      document.getElementById('programPopupBackdrop')?.classList.add('hidden');
      
      // Close virtual tour
      document.getElementById('virtualTourPanel').style.display = 'none';
      
      // Close floor plan
      document.getElementById('floorPlanContainer')?.classList.add('hidden');
      
      // Close contact
      document.getElementById('contactContainer')?.classList.add('hidden');
      
      // Close dropdown
      document.getElementById('dropdownContainer')?.classList.add('hidden');
    }
  
    function openMenu() {
      toggle.classList.add('open');
      menu.classList.add('open');
      backdrop.classList.add('active');
    }
    function closeMenu() {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      backdrop.classList.remove('active');
    }
  
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  
    backdrop.addEventListener('click', () => {
      closeMenu();
    });
  
    document.body.addEventListener('click', (event) => {
      if (
        menu.classList.contains('open') &&
        !menu.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  });
  