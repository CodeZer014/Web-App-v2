document.addEventListener("DOMContentLoaded", () => {
  const collegeBtn = document.getElementById("collegeProgramsBtn");
  const shsBtn = document.getElementById("shsProgramsBtn");
  const popup = document.getElementById("programPopup");
  const backdrop = document.getElementById("programPopupBackdrop");
  const popupTitle = document.getElementById("popupTitle");
  const programList = document.querySelector(".program-list");
  const categoriesBtn = document.getElementById("categoriesBtn");
  const dropdown = document.getElementById("dropdownContainer");

  const mediaPopup = document.getElementById("mediaPopup");
  const mediaBackdrop = document.getElementById("mediaPopupBackdrop");
  const popupImage = document.getElementById("popupImage");
  const popupVideo = document.getElementById("popupVideo");
  const closePopupBtns = document.querySelectorAll(".close-popup");

  const navMenu = document.querySelectorAll("button-bar");

  const mediaContent = {
    "Information Technology": {
      image: "../assets/images/Information Technology.jpg",
      video: "../assets/videos/Information Technology.mp4"
    },
    "Business & Management": {
      image: "../assets/images/Business & Management.jpg",
      video: "../assets/videos/Business & Management.mp4"
    },
    "Hospitality Management": {
      image: "../assets/images/Hospitality.jpg",
      video: "../assets/videos/Hospitality Management.mp4"
    },
    "Tourism Management": {
      image: "../assets/images/Tourism.jpg",
      video: "../assets/videos/Tourism.mp4"
    },
    "Engineering": {
      image: "../assets/images/Engineering.jpg",
      video: "../assets/videos/Engineering.mp4"
    },
    "Arts & Sciences": {
      image: "../assets/images/Art & Science.jpg",
      video: "../assets/videos/Art & Science.mp4"
    },

    "Academic Track": {
      image: "../assets/images/SHS All Strand.jpg",
      video: "../assets/videos/STEM.mp4"
    },
    "ICT | Information & Communications": {
      image: "../assets/images/SHS All Strand.jpg",
      video: "../assets/videos/ICT _ INFORMATION & COMMUNICATIONS TECHNOLOGY.mp4"
    },
    "HE | Home Economics": {
      image: "../assets/images/SHS All Strand.jpg",
      video: "../assets/videos/Culinary Arts.mp4"
    },
  };

function updateBackdropDimensions() {
  const popup = document.getElementById('programPopup');
  const backdrop = document.getElementById('programPopupBackdrop');
  
  if (popup && backdrop) {
    const rect = popup.getBoundingClientRect();
    const offset = 8;
    
    backdrop.style.width = `${rect.width + offset}px`;
    backdrop.style.height = `${rect.height + offset}px`;
    backdrop.style.top = `${rect.top}px`;
    backdrop.style.left = `${rect.left}px`;
    backdrop.style.transform = `translate(${offset}px, ${offset}px)`;
  }
}


  // Toggle dropdown visibility
  function toggleDropdown() {
    dropdown.classList.toggle("hidden");
    hidePopup();
  }

  function showPopup(type) {
    if (type === "college") {
      popupTitle.textContent = "College Programs";
      programList.innerHTML = `
        <div class="program-column">
          <h3>Information Technology</h3>
          <ul>
            <li>BS in Information Technology (BSIT)</li>
            <li>BS in Computer Science (BSCS)</li>
            <li>BS in Information Systems (BSIS)</li>
          </ul>
          
          <h3>Business & Management</h3>
          <ul>
            <li>BS in Business Administration (BSBA)</li>
            <li>BS in Accountancy (BSA)</li>
            <li>BS in Accounting Information System (BSAIS)</li>
          </ul>
          
          <h3>Engineering</h3>
          <ul>
            <li>BS in Computer Engineering (BSCpE)</li>
          </ul>
        </div>
        
        <div class="program-column">
          <h3>Hospitality Management</h3>
          <ul>
            <li>BS in Hospitality Management (BSHM)</li>
            <li>BS in Culinary Management (BSCM)</li>
          </ul>
          
          <h3>Tourism Management</h3>
          <ul>
            <li>BS in Tourism Management (BSTM)</li>
          </ul>
          
          <h3>Arts & Sciences</h3>
          <ul>
            <li>BA in Communication (BACOMM)</li>
            <li>Bachelor of Multimedia Arts (BMMA)</li>
          </ul>
        </div>
      `;
    } else {
      popupTitle.textContent = "Senior High School";
      programList.innerHTML = `
        <div class="program-column">
          <h3>Academic Track</h3>
          <ul>
            <li>Science, Technology, Engineering, and Mathematics (STEM)</li>
            <li>Humanities and Social Sciences (HUMSS)</li>
            <li>General Academic</li>
            <li>Accountancy, Business and Management (ABM)</li>
          </ul>
        </div>
        
        <div class="program-column">
          <h4>Technical-Vocational-Livelihood</h4>
          <h3>ICT | Information & Communications</h3>
          <ul>
            <li>Computer and Communications Technology</li>
            <li>Digital Arts</li>
            <li>IT in Mobile App and Web Development</li>
          </ul>
          
          <h3>HE | Home Economics</h3>
          <ul>
            <li>Tourism Operations</li>
            <li>Restaurant and Cafe Operations</li>
            <li>Culinary Arts</li>
          </ul>
        </div>
      `;
    }

    popup.classList.remove("hidden");
    backdrop.classList.remove("hidden");

    setTimeout(() => {
      updateBackdropDimensions();
      backdrop.classList.remove("hidden");
      bindH3ClickEvents();
    }, 10);
  }

  function hidePopup() {
    popup.classList.add("hidden");
    backdrop.classList.add("hidden");
  }

  function showMediaPopup(title) {
    const content = mediaContent[title];
    if (!content) return;

    popupTitle.textContent = title;
    popupImage.src = content.image;
    popupVideo.src = content.video;

    mediaBackdrop.classList.remove("hidden");
    mediaPopup.classList.remove("hidden");
  }

  function hideMediaPopup() {
    mediaPopup.classList.add("hidden");
    mediaBackdrop.classList.add("hidden");
    popupVideo.src = "";
  }

  function bindH3ClickEvents() {
    const h3s = document.querySelectorAll(".program-list h3");
    h3s.forEach(h3 => {
      h3.style.cursor = "pointer";
      h3.addEventListener("click", () => showMediaPopup(h3.textContent.trim()));
    });
  }

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== categoriesBtn) {
      dropdown.classList.add("hidden");
    }

  if (
    !popup.contains(e.target) &&
    !collegeBtn.contains(e.target) &&
    !shsBtn.contains(e.target) &&
    !mediaPopup.contains(e.target) &&
    !navMenu.contains(e.target)
  ) {
    hidePopup();
  }

    if (e.target === backdrop) {
      hidePopup();
    }

    if (e.target === mediaBackdrop) {
      hideMediaPopup();
    }
  });

    collegeBtn.addEventListener("click", () => {
      toggleDropdown();
      showPopup("college");
    });
    shsBtn.addEventListener("click", () => {
      toggleDropdown();
      showPopup("shs");
    });
  

  closePopupBtns.forEach(btn => {
    btn.addEventListener("click", hideMediaPopup);
  });

  // Main button bindings
  categoriesBtn.addEventListener("click", toggleDropdown);
  collegeBtn.addEventListener("click", () => showPopup("college"));
  shsBtn.addEventListener("click", () => showPopup("shs"));
  backdrop.addEventListener("click", hidePopup);
  mediaBackdrop.addEventListener("click", hideMediaPopup);
});
