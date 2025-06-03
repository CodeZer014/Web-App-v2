document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
  
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        document.body.classList.add('fade-out');

        setTimeout(() => {
          window.location.href = '../pages/main_page.html';
        }, 300);
      });
    } else {
      requestAnimationFrame(() => {
        document.body.classList.add('fade-in');
      });
    }
  });