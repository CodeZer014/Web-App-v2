document.addEventListener("DOMContentLoaded", () => {
const collegeBtn = document.getElementById("collegeProgramsBtn");
const shsBtn = document.getElementById("shsProgramsBtn");
const popup = document.getElementById("programPopup");
const backdrop = document.getElementById("programPopupBackdrop");
const popupTitle = document.getElementById("popupTitle");
const programList = document.querySelector(".program-list");
const categoriesBtn = document.getElementById("categoriesBtn");
const dropdown = document.getElementById("dropdownContainer");

// Toggle dropdown visibility
function toggleDropdown() {
  dropdown.classList.toggle("hidden");
  // Hide popup if open
  hidePopup();
}

// Show the popup with program data
function showPopup(type) {
    if (type === "college") {
      popupTitle.textContent = "College Programs";
      programList.innerHTML = `
        <div class="program-block">
          <h3>Information Technology</h3>
          <ul>
            <li>BS in Information Technology (BSIT)</li>
            <li>BS in Computer Science (BSCS)</li>
            <li>BS in Information Systems (BSIS)</li>
          </ul>
        </div>
        <div class="program-block">
          <h3>Business and Management</h3>
          <ul>
            <li>BS in Business Administration (BSBA)</li>
            <li>BS in Accountancy (BSA)</li>
            <li>BS in Accounting Information System (BSAIS)</li>
            <li>BS in Management Accounting (BSMA)</li>
          </ul>
        </div>
        <div class="program-block">
          <h3>Hospitality Management</h3>
          <ul>
            <li>BS in Hospitality Management (BSHM)</li>
            <li>BS in Culinary Management (BSCM)</li>
          </ul>
        </div>
        <div class="program-block">
          <h3>Tourism Management</h3>
          <ul>
            <li>BS in Tourism Management (BSTM)</li>
          </ul>
        </div>
        <div class="program-block">
          <h3>Engineering</h3>
          <ul>
            <li>BS in Computer Engineering (BSCpE)</li>
          </ul>
        </div>
        <div class="program-block">
          <h3>Arts and Sciences</h3>
          <ul>
            <li>BA in Communication (BACOMM)</li>
            <li>Bachelor of Multimedia Arts (BMMA)</li>
          </ul>
        </div>
      `;
    } else {
      popupTitle.textContent = "Senior High School";
      programList.innerHTML = `
        <div class="program-block">
          <h3>Academic Track</h3>
          <ul>
            <li>Science, Technology, Engineering, and Mathematics (STEM)</li>
            <li>Humanities and Social Sciences (HUMSS)</li>
            <li>General Academic</li>
            <li>Accountancy, Business and Management (ABM)</li>
          </ul>
        </div>
        <div class="program-block">
          <h3>Technical-Vocational-Livelihood Track</h3>
          <h3>ICT | Information and Communications Technology</h3>
          <ul>
            <li>Computer and Communications Technology</li>
            <li>Digital Arts</li>
            <li>IT in Mobile App and Web Development</li>
          </ul>
        </div>
        <div class="program-block">
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
  }

// Hide the popup
function hidePopup() {
  popup.classList.add("hidden");
  backdrop.classList.add("hidden");
}

function clickOutside(e) {
  if (!dropdown.contains(e.target) && e.target !== categoriesBtn) {
    dropdown.classList.add("hidden");
  }
}

// Event bindings
categoriesBtn.addEventListener("click", toggleDropdown);
collegeBtn.addEventListener("click", () => showPopup("college"));
shsBtn.addEventListener("click", () => showPopup("shs"));
backdrop.addEventListener("click", hidePopup);

document.addEventListener("click", clickOutside);

  });