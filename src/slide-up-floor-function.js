document.addEventListener('DOMContentLoaded', () => {
  const imgEl   = document.getElementById('mapPanelImage');
  const buttons = document.querySelectorAll('.floor-option');
  let   currentBtn = null;
  const mapHotspotsContainer = document.createElement('div');
  mapHotspotsContainer.id = 'mapHotspotsContainer';
  mapHotspotsContainer.style.position = 'absolute';
  mapHotspotsContainer.style.top = '0';
  mapHotspotsContainer.style.left = '0';
  mapHotspotsContainer.style.width = '100%';
  mapHotspotsContainer.style.height = '100%';
  mapHotspotsContainer.style.pointerEvents = 'none';
  
  // Add hotspots container to the floor map
  const floorMap = document.querySelector('.floor-map');
  if (floorMap) {
      floorMap.style.position = 'relative';
      floorMap.appendChild(mapHotspotsContainer);
  }

  function initSlideUp(buttonId, containerId) {
      const btn       = document.getElementById(buttonId);
      const container = document.getElementById(containerId);
      const arrow     = container.querySelector('.slide-arrow');

      if (!btn || !container || !arrow) {
          console.error(`Missing elements for slide-up init: ${buttonId}, ${containerId}`);
          return;
      }

      let chibi = container.querySelector('.floor-plan-chibi');
      if (!chibi) {
          chibi = document.createElement('img');
          chibi.className = 'floor-plan-chibi';
          chibi.src = '../assets/images/Chibi.png';
          chibi.alt = 'Cute mascot';
          container.querySelector('.slide-content').appendChild(chibi);
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
        if (window.innerWidth <= 768) closeAllMenus();
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

  initSlideUp('floorPlanBtn', 'floorPlanContainer');

  buttons.forEach(btn => {
      btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentBtn = btn;

          const level = btn.textContent.trim().toUpperCase();
          imgEl.src = `../assets/maps/${level}.png`;
          imgEl.alt = `${level} map`;

          // Clear previous hotspots
          mapHotspotsContainer.innerHTML = '';

          // Define hotspots per level
          const mapHotspots = {
              BASEMENT: [
                  { top: '432px', left: '388px', title: 'Parking', sceneId: 'basement', location: 'basement' },
                  { top: '198px', left: '253px', title: 'Canteen', sceneId: 'canteenEntranceBasement', location: 'basement' }
              ],
              'FLOOR1': [
                  { top: '495px', left: '358px', title: 'Lobby', sceneId: 'lobbyMain', location: 'lobby' },
                  { top: '376px', left: '207px', title: 'Lobby Left Corner', sceneId: 'lobbyLeftCorner', location: 'lobby' },
                  { top: '377px', left: '688px', title: 'Lobby Right Corner', sceneId: 'lobbyRightCorner', location: 'lobby' },
                  { top: '508px', left: '580px', title: 'Computer Laboratory 1', sceneId: 'computerLab1', location: 'lobby' },
                  { top: '508px', left: '765px', title: 'Computer Laboratory 2', sceneId: 'computerLab2', location: 'lobby' },
                  { top: '190px', left: '665px', title: 'Kitchen', sceneId: 'kitchen', location: 'lobby' },
                  { top: '220px', left: '550px', title: 'Hallway', sceneId: 'hallway', location: 'lobby' },
                  { top: '540px', left: '156px', title: 'Stairs', sceneId: 'floor2Stairs', location: 'lobby' }
              ],
              'FLOOR2': [
                  { top: '560px', left: '140px', title: 'Stairs', sceneId: 'floor3Stairs', location: 'floor2' },
                  { top: '298px', left: '385px', title: 'Clinic', sceneId: 'clinic', location: 'floor2' },
                  { top: '238px', left: '688px', title: 'AVR', sceneId: 'AVR', location: 'floor2' },
                  { top: '220px', left: '545px', title: 'Another Hallway', sceneId: 'Hallway', location: 'floor2' },
                  { top: '65px', left: '477px', title: 'Another Corridor', sceneId: 'Hallway', location: 'floor2' },
                  { top: '150px', left: '760px', title: 'Mock Hotel', sceneId: 'mockHotel', location: 'floor2' },
                  { top: '535px', left: '659px', title: 'Library', sceneId: 'library', location: 'floor2' },
                  { top: '375px', left: '625px', title: 'Corridor', sceneId: 'Corridor', location: 'floor2' },
                  { top: '390px', left: '328px', title: 'Main Hallway', sceneId: 'floor2Hall', location: 'floor2' }
              ],
              'FLOOR3': [
                  { top: '293px', left: '320px', title: 'Room 304', sceneId: 'Room304', location: 'floor3' },
                  { top: '445px', left: '473px', title: 'Room 306', sceneId: 'Room306', location: 'floor3' },
                  { top: '535px', left: '473px', title: 'Room 308', sceneId: 'Room308', location: 'floor3' },
                  { top: '165px', left: '655px', title: 'Room 301', sceneId: 'Room301', location: 'floor3' },
                  { top: '270px', left: '655px', title: 'Room 303', sceneId: 'Room303', location: 'floor3' },
                  { top: '370px', left: '655px', title: 'Room 305', sceneId: 'Room305', location: 'floor3' },
                  { top: '475px', left: '655px', title: 'Room 307', sceneId: 'Room307', location: 'floor3' },
                  { top: '557px', left: '655px', title: 'Room 309', sceneId: 'Room309', location: 'floor3' },
                  { top: '550px', left: '150px', title: 'Stairs', sceneId: 'floor4Stairs', location: 'floor3' },
                  { top: '425px', left: '540px', title: 'Middle Hallway', sceneId: 'floor3MiddleHallway', location: 'floor3' },
                  { top: '390px', left: '335px', title: 'Main Hallway', sceneId: 'floor3', location: 'floor3' },
                  { top: '240px', left: '550px', title: 'Left Hallway', sceneId: 'floor3LeftHallway', location: 'floor3' },

              ],
              'FLOOR4': [
                  { top: '210px', left: '445px', title: 'Speech Lab', sceneId: 'SpeechLab', location: 'floor4' },
                  { top: '465px', left: '280px', title: 'Aquarium', sceneId: 'Aquarium', location: 'floor4' },
                  { top: '540px', left: '432px', title: 'Room 402', sceneId: 'Room402', location: 'floor4' },
                  { top: '167px', left: '664px', title: 'Room 407', sceneId: 'Room405-407', location: 'floor4' },
                  { top: '270px', left: '664px', title: 'Room 405', sceneId: 'Room405-407', location: 'floor4' },
                  { top: '360px', left: '664px', title: 'Computer Laboratory 3', sceneId: 'ComLab3', location: 'floor4' },
                  { top: '465px', left: '664px', title: 'Room 403A', sceneId: 'Room403', location: 'floor4' },
                  { top: '560px', left: '664px', title: 'Room 401', sceneId: 'Room401', location: 'floor4' },
                  { top: '560px', left: '140px', title: 'Stairs', sceneId: 'gymStairs', location: 'floor4' },
                  { top: '393px', left: '211px', title: 'Main Hallway', sceneId: 'floor4MainHallway', location: 'floor4' },
                  { top: '377px', left: '563px', title: 'Middle Hallway', sceneId: 'floor4MiddleHallway', location: 'floor4' },
                  { top: '165px', left: '565px', title: 'Left Hallway', sceneId: 'floor4LeftHallway', location: 'floor4' },
                  { top: '508px', left: '563px', title: 'Right Hallway', sceneId: 'floor4RightHallway', location: 'floor4' },
              ],
              'GYM': [
                  { top: '567px', left: '138px', title: 'Stairs', sceneId: 'gymStairs', location: 'floor4' },
                  { top: '430px', left: '465px', title: 'Elevated Bleacher', sceneId: 'elevatedBleacher', location: 'gym' },
                  { top: '468px', left: '705px', title: 'Court', sceneId: 'gymCenter', location: 'gym' },
                  { top: '385px', left: '133px', title: 'Gym Entrance', sceneId: 'gymEntrance', location: 'gym' },
              ]
          };

          const levelKey = level.replace(/\s+/g, '').replace('FLOOR', 'FLOOR');
          (mapHotspots[levelKey] || []).forEach(hs => {
              const el = document.createElement('div');
              el.classList.add('map-hotspot', 'camera-hotspot');
              el.title = hs.title;
              el.style.position = 'absolute';
              el.style.top = hs.top;
              el.style.left = hs.left;
              el.style.width = '20px';
              el.style.height = '20px';
              el.style.borderRadius = '50%';
              el.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
              el.style.cursor = 'pointer';
              el.style.pointerEvents = 'auto';
              el.style.zIndex = '10';

              el.addEventListener('click', (e) => {
                  e.stopPropagation();
                  document.getElementById('virtualTourBtn').click();
                  setTimeout(() => {
                      document.getElementById('locationSelect').value = hs.location;
                      document.getElementById('locationSelect').dispatchEvent(new Event('change'));
                      setTimeout(() => {
                          document.getElementById('sceneSelect').value = hs.sceneId;
                          document.getElementById('sceneSelect').dispatchEvent(new Event('change'));
                      }, 300);
                  }, 300);
              });

              mapHotspotsContainer.appendChild(el);
          });
      });
  });

  // Close hotspots when clicking outside
  document.addEventListener('click', (e) => {
      if (!e.target.closest('.map-hotspot') && !e.target.closest('.floor-option')) {
          mapHotspotsContainer.innerHTML = '';
      }
  });
});