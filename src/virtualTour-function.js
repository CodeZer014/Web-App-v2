document.addEventListener("DOMContentLoaded", () => {
  const vtBtn        = document.getElementById('virtualTourBtn');
  const vtPanel      = document.getElementById('virtualTourPanel');
  const closeVT      = document.getElementById('closeVT');
  const previewImg    = document.getElementById('vtPreviewImage');
  const locationSelect = document.getElementById('locationSelect');
  const sceneSelect    = document.getElementById('sceneSelect');
  let viewer;

  const previewMap = {
    // BASEMENT
    basement:        '../assets/preview-map/basement/basement.png',
    canteenEntranceBasement:   '../assets/preview-map/basement/canteenEntranceBasement.png',

    // FLOOR 1
    lobbyMain:  '../assets/preview-map/floor1/lobbyMain.png',
    lobbyLeftCorner:           '../assets/preview-map/floor1/lobbyLeftCorner.png',
    lobbyRightCorner:       '../assets/preview-map/floor1/lobbyRightCorner.png',
    hallway:      '../assets/preview-map/floor1/hallway.png',
    kitchen:            '../assets/preview-map/floor1/kitchen.png',
    computerLab1:        '../assets/preview-map/floor1/computerLab1.png',
    computerLab2:          '../assets/preview-map/floor1/computerLab2.png',
    floor2Stairs:           '../assets/preview-map/floor1/floor2Stairs.png',

    // FLOOR 2
    floor2:            '../assets/preview-map/floor2/floor2.png',
    floor2Hall:            '../assets/preview-map/floor2/floor2Hall.png',
    Corridor:       '../assets/preview-map/floor2/Corridor.png',
    Hallway:         '../assets/preview-map/floor2/Hallway.png',
    anotherHallway:            '../assets/preview-map/floor2/anotherHallway.png',
    library:            '../assets/preview-map/floor2/library.png',
    clinic:       '../assets/preview-map/floor2/clinic.png',
    AVR:         '../assets/preview-map/floor2/AVR.png',
    mockHotel:         '../assets/preview-map/floor2/mockHotel.png',

    // FLOOR 3
    floor3Stairs:         '../assets/preview-map/floor3/floor3Stairs.png',
    floor3:            '../assets/preview-map/floor3/floor3.png',
    floor3MiddleHallway:            '../assets/preview-map/floor3/floor3MiddleHallway.png',
    floor3LeftHallway:       '../assets/preview-map/floor3/floor3LeftHallway.png',
    Room301:         '../assets/preview-map/floor3/Room301.png',
    Room303:            '../assets/preview-map/floor3/Room303.png',
    Room304:            '../assets/preview-map/floor3/Room304.png',
    Room305:       '../assets/preview-map/floor3/Room305.png',
    Room306:         '../assets/preview-map/floor3/Room306.png',
    Room307:         '../assets/preview-map/floor3/Room307.png',
    Room309:         '../assets/preview-map/floor3/Room309.png',

    // FLOOR 4
    floor4Stairs:         '../assets/preview-map/floor4/floor4Stairs.png',
    floor4:         '../assets/preview-map/floor4/floor4.png',
    floor4MainHallway:            '../assets/preview-map/floor4/floor4.png',
    floor4MiddleHallway:            '../assets/preview-map/floor4/floor4MiddleHallway.png',
    floor4LeftHallway:       '../assets/preview-map/floor4/floor4LeftHallway.png',
    floor4RightHallway:         '../assets/preview-map/floor4/floor4RightHallway.png',
    Room401:            '../assets/preview-map/floor4/Room401.png',
    Room402:            '../assets/preview-map/floor4/Room402.png',
    Room403:       '../assets/preview-map/floor4/Room403.png',
    Room405_407:         '../assets/preview-map/floor4/Room405_407.png',
    Aquarium:         '../assets/preview-map/floor4/Aquarium.png',
    SpeechLab:         '../assets/preview-map/floor4/SpeechLab.png',
    ComLab3:         '../assets/preview-map/floor4/ComLab3.png',

    // GYM
    gymStairs:         '../assets/preview-map/gym/gymStairs.png',
    gymEntrance:         '../assets/preview-map/gym/gymEntrance.png',
    gymCenter:         '../assets/preview-map/gym/gymCenter.png',
    elevatedBleacher:         '../assets/preview-map/gym/elevatedBleacher.png'
  };

    function updatePreviewImage(sceneId) {
      if (previewMap[sceneId]) {
        previewImg.src = previewMap[sceneId];
      } else {
         previewImg.src = 'images/previews/default.jpg';
      }
    }

  const locations = {
    // BASEMENT
    basement: [
      {
        id: 'basement', title: 'Basement View', panorama: '../assets/routes/basement/Parking.jpg',
        hotSpots: [
          {
            pitch: 5,
            yaw: 87,
            type: 'info',
            text: 'School Supplies\n(Click here to see the video)',
            cssClass: 'info-hotspot',
            clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1g3CUvIvZ9SKeCwnxhOMkugjlOIrCY625/view?usp=drive_link'
            }
          },
          { pitch: -5, yaw: -10, type: 'scene', text: 'Go to Canteen', sceneId: 'canteenEntranceBasement', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 10, yaw: 215, type: 'scene', text: 'Go to Lobby', sceneId: 'lobbyMain', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'canteenEntranceBasement', title: 'Canteen Entrance', panorama: '../assets/routes/basement/Canteen_1.jpg',
        hotSpots: [
          { pitch: -5, yaw: 70, type: 'scene', text: 'Go Back', sceneId: 'basement', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
        ]
      }
    ],

    // LOBBY
    lobby: [
      {
        id: 'lobbyMain', title: 'Main Lobby View', panorama: '../assets/routes/lobby/1.jpg',
        hotSpots: [
          { 
            pitch: 10, yaw: 190, type: 'info', text: 'Entrance Lobby\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1uKTUrRONWV7g7LucG_S2gCAUJqVo8lEk/view?usp=drive_link', 
            }, target: '_blank'},
          { pitch: -5, yaw: 250, type: 'info', text: 'Reception Desk\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1edCSG4OQWgPs02od3-H2JG9vSl_nMnCX/view?usp=drive_link',
            }, target: '_blank'},
          { pitch: -5, yaw: 360, type: 'info', text: 'Admin Office\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/16e5WjjeYjgg9o35Ry5uQcymULoqs6Z3w/view?usp=drive_link',
            }, target: '_blank'},
          { pitch: -3, yaw: 190, type: 'scene', text: 'Go to Basement', sceneId: 'basement', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: -5, yaw: -43, type: 'scene', text: 'Go to Left Corner', sceneId: 'lobbyLeftCorner', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: -5, yaw: 35,  type: 'scene', text: 'Go to Right Corner', sceneId: 'lobbyRightCorner', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'lobbyLeftCorner', title: 'Lobby Left Corner', panorama: '../assets/routes/lobby/2.jpg',
        hotSpots: [
          { pitch: 12, yaw: 175, type: 'scene', text:'Go to Floor 2 Stairs', sceneId:'floor2Stairs', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-10, yaw: 80,  type: 'scene', text:'Back to Lobby', sceneId:'lobbyMain', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'lobbyRightCorner', title: 'Lobby Right Corner', panorama: '../assets/routes/lobby/3.jpg',
        hotSpots: [
          { pitch:-5, yaw:264, type:'scene', text:'Back to Lobby', sceneId:'lobbyMain', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-5, yaw:-70,type:'scene', text:'Go to Hallway', sceneId:'hallway', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 25, yaw: 180, type: 'info', text: 'Computer Laboratory 1\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1uUIIv1j0FT7uMKVqzxJEQOUuYP5QyAWA/view?usp=drive_link', 
            }, target: '_blank'},
          { pitch:0, yaw:180,type:'scene', text:'Go to Computer Laboratory 1', sceneId:'computerLab1', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 20, yaw: 125, type: 'info', text: 'Computer Laboratory 2\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1VBu714DKH8zLIaFvBGQ9R6Z3KpzlsQZA/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:0, yaw:125,type:'scene', text:'Go to Computer Laboratory 2', sceneId:'computerLab2', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'hallway', title: 'Hallway View', panorama: '../assets/routes/lobby/4.jpg',
        hotSpots: [
          { pitch:-5, yaw:275, type:'scene', text:'Back to Lobby', sceneId:'lobbyMain', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-5, yaw:-255, type:'scene', text:'Go to Kitchen', sceneId:'kitchen', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'kitchen', title: 'Kitchen View', panorama: '../assets/routes/lobby/kitchen.jpg',
        hotSpots: [
          { pitch: 0, yaw: 100, type: 'info', text: 'Kitchen Events\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1Qe1pfrhHQbhKnEaxKJicUoIFe_HAxPTo/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:-5, yaw:140, type:'scene', text:'Back to Hallway', sceneId:'hallway', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
        ]
      },
      { 
        id: 'computerLab1', title: 'Computer Lab 1', panorama: '../assets/routes/lobby/computerLab.jpg',
        hotSpots: [
          { pitch: 10, yaw: 0, type: 'info', text: 'Computer Laboratory Events\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1yD5qgNN_VLUxuRE4Jauv4HFvGxnbpeNZ/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:0, yaw:0,type:'scene', text:'Exit', sceneId:'lobbyRightCorner', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      { 
        id: 'computerLab2', title: 'Computer Lab 2', panorama: '../assets/routes/lobby/computerLab2.jpg',
        hotSpots: [
          { pitch: 10, yaw: 180, type: 'info', text: 'Computer Laboratory Events\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1yD5qgNN_VLUxuRE4Jauv4HFvGxnbpeNZ/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:0, yaw:180,type:'scene', text:'Exit', sceneId:'lobbyRightCorner', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor2Stairs', title: 'Floor 2 Stairs', panorama: '../assets/routes/lobby/stairs to floor 2/1.jpg',
        hotSpots: [
          { pitch:5, yaw:375, type:'scene', text:'Go Up', sceneId:'floor2', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-23, yaw:350, type:'scene', text:'Go Down', sceneId:'lobbyLeftCorner', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
    ],

    // FLOOR 2
    floor2: [
      {
        id: 'floor2', title: 'Floor 2 View', panorama: '../assets/routes/lobby/stairs to floor 2/2.jpg',
        hotSpots: [
          { pitch:-15, yaw:260, type:'scene', text:'Go to Floor 2 Main Hallway', sceneId:'floor2Hall', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-30, yaw:345, type:'scene', text:'Go to Floor 2 Stairs', sceneId:'floor2Stairs', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 10, yaw:375, type:'scene', text:'Go to Floor 3 Stairs', sceneId:'floor3Stairs', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor2Hall', title: 'Floor 2 Hallway', panorama: '../assets/routes/floor 2/1.jpg',
        hotSpots: [
          { pitch:0, yaw:175, type:'scene', text:'Corridor', sceneId:'Corridor', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:0, yaw:155, type:'scene', text:'Go Left', sceneId:'Hallway', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:0, yaw:84, type:'scene', text:'Go to Clinic', sceneId:'clinic', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:0, yaw:0,   type:'scene', text:'Back to Stairs', sceneId:'floor2', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Corridor', title: 'Floor 2 Corridor', panorama: '../assets/routes/floor 2/3.jpg',
        hotSpots: [
          { pitch:-3, yaw:-93, type:'scene', text:'Back to Hall', sceneId:'floor2Hall', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-3, yaw:-80, type:'scene', text:'Go Right', sceneId:'Hallway', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 8, yaw: -70, type: 'info', text: 'AVR\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1ExS3-ZPLZJJHLODbIu97OrBGICzNd0k0/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:3, yaw:-70, type:'scene', text:'Go to AVR', sceneId:'AVR', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 10, yaw: -130, type: 'info', text: 'Library\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1b27MFwR5gEElKPivn5OM5EQQcAdoXmZl/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:-3, yaw:-130, type:'scene', text:'Go to Library', sceneId:'library', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Hallway', title: 'Floor 2 Hallway Part 2', panorama: '../assets/routes/floor 2/4.jpg',
        hotSpots: [
          { pitch:-5, yaw:-85, type:'scene', text:'Back to Hall', sceneId:'floor2Hall', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-3, yaw:85, type:'scene', text:'Another Corridor', sceneId:'anotherHallway', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 8, yaw: 112, type: 'info', text: 'Mock Hotel\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1wBo8JPgDIdvvqDqgvagPlW-G4NT2qJIN/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:-3, yaw:112, type:'scene', text:'Go to Mock Hotel', sceneId:'mockHotel', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'anotherHallway', title: 'Another Corridor', panorama: '../assets/routes/floor 2/5.jpg',
        hotSpots: [
          { pitch:-5, yaw:-80, type:'scene', text:'Back to Hallway', sceneId:'Hallway', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'library', title: 'Library', panorama: '../assets/routes/floor 2/Library.jpg',
        hotSpots: [
          { pitch:-5, yaw:-170, type:'scene', text:'Back to Corridor', sceneId:'Corridor', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'clinic', title: 'Clinic', panorama: '../assets/routes/floor 2/CLINIC.jpg',
        hotSpots: [
          { pitch:-5, yaw:-280, type:'scene', text:'Back to Hallway', sceneId:'floor2Hall', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'AVR', title: 'AVR', panorama: '../assets/routes/floor 2/AVR.jpg',
        hotSpots: [
          { pitch: 10, yaw: -47, type: 'info', text: 'AVR Events 1\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/18MuzGb9OELa6K2o5naVlZP_QpTsoRjmM/view?usp=drive_link',
            }, target: '_blank'},
            { pitch: 10, yaw: -20, type: 'info', text: 'AVR Events 2\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/19q0I_95tRQfSwZUTUnPHny2cmZdP6fNO/view?usp=drive_link',
            }, target: '_blank'},
            { pitch: 10, yaw: 10, type: 'info', text: 'AVR Events 3\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1Q5CDl7EaBdw_pIJqwboyNv3_qXc7VV0R/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:5, yaw:-195, type:'scene', text:'Back to Corridor', sceneId:'Corridor', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'mockHotel', title: 'Mock Hotel', panorama: '../assets/routes/floor 2/mock_hotel.jpg',
        hotSpots: [
          { pitch:-5, yaw:-118, type:'scene', text:'Back to Hallway', sceneId:'Hallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor3Stairs', title: 'Floor 3 Stairs', panorama: '../assets/routes/floor 2/stairs to floor 3/STAIR 1.jpg',
        hotSpots: [
          { pitch:8, yaw: 377, type:'scene', text:'Go Up', sceneId:'floor3', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-25, yaw: 347, type:'scene', text:'Go Down', sceneId:'floor2', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
    ],

    // FLOOR 3
    floor3: [
      {
        id: 'floor3', title: 'Floor 3 View', panorama: '../assets/routes/floor 3/1.jpg',
        hotSpots: [
          { pitch:-9, yaw:76, type:'scene', text:'Go Down', sceneId:'floor3Stairs', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:1, yaw:78, type:'scene', text:'Go Up', sceneId:'floor4Stairs', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-20, yaw:-85, type:'scene', text:'Go to Middle Hallway', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor3MiddleHallway', title: 'Floor 3 Middle Hallway', panorama: '../assets/routes/floor 3/3.jpg',
        hotSpots: [
          { pitch:-10, yaw:-83, type:'scene', text:'Go to Left Hallway', sceneId:'floor3LeftHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-20, yaw: 187, type:'scene', text:'Back to Floor 3 Landing', sceneId:'floor3', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 8, yaw: 293, type: 'info', text: 'Room 303\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1cvsxdckZDpqJWqwqq8rKwfRkcQ9du1Kx/view?usp=drive_link',
            }, target: '_blank'},
          { pitch: 0, yaw: 293, type:'scene', text:'Go to Room 304', sceneId:'Room303', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 9, yaw: 255, type: 'info', text: 'Room 304\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/161SDJnv7jH5_xBaCtR6vpo2cET-yTcLS/view?usp=drive_link',
            }, target: '_blank'},
          { pitch: 0, yaw:255, type:'scene', text:'Go to Room 305', sceneId:'Room304', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 35, yaw: 380, type: 'info', text: 'Room 305\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/161SDJnv7jH5_xBaCtR6vpo2cET-yTcLS/view?usp=drive_link',
            }, target: '_blank'},
          { pitch: 0, yaw:380, type:'scene', text:'Go to Room 306', sceneId:'Room305', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 5, yaw: 130, type: 'info', text: 'Room 306\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/161SDJnv7jH5_xBaCtR6vpo2cET-yTcLS/view?usp=drive_link',
            }, target: '_blank'},
          { pitch: -8, yaw:130, type:'scene', text:'Go to Room 306', sceneId:'Room306', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor3LeftHallway', title: 'Floor 3 Left Hallway', panorama: '../assets/routes/floor 3/2.jpg',
        hotSpots: [
          { pitch: 35, yaw: 72, type: 'info', text: 'Room 301\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1jUZm92YdxWkTL7UZlmmOJkzN26k7Ag7C/view?usp=sharing',
            }, target: '_blank'},
          { pitch:10, yaw:72, type:'scene', text:'Go to Room 301', sceneId:'Room301', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-9, yaw:173, type:'scene', text:'Go to Middle Hallway', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room301', title: 'Room 301', panorama: '../assets/routes/floor 3/301.jpg',
        hotSpots: [
          { pitch:-5, yaw:98, type:'scene', text:'Exit', sceneId:'floor3LeftHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room303', title: 'Room 303', panorama: '../assets/routes/floor 3/303.jpg',
        hotSpots: [
          { pitch:-5, yaw:98, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room304', title: 'Room 304', panorama: '../assets/routes/floor 3/304.jpg',
        hotSpots: [
          { pitch:-5, yaw:-8, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room305', title: 'Room 305', panorama: '../assets/routes/floor 3/305.jpg',
        hotSpots: [
          { pitch:-5, yaw:-8, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room306', title: 'Room 306', panorama: '../assets/routes/floor 3/306.jpg',
        hotSpots: [
          { pitch:-5, yaw:-35, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room307', title: 'Room 307', panorama: '../assets/routes/floor 3/307.jpg',
        hotSpots: [
          { pitch:-5, yaw:150, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room309', title: 'Room 309', panorama: '../assets/routes/floor 3/309.jpg',
        hotSpots: [
          { pitch:-5, yaw:-50, type:'scene', text:'Exit', sceneId:'floor3MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor4Stairs', title: 'Floor 4 Stairs', panorama: '../assets/routes/floor 3/stairs to floor 4/STAIR 1.jpg',
        hotSpots: [
          { pitch:8, yaw: 377, type:'scene', text:'Go Up', sceneId:'floor4', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-25, yaw: 347, type:'scene', text:'Go Down', sceneId:'floor3', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
    ],

    // FLOOR 4
    floor4: [
      {
        id: 'floor4', title: 'Floor 4 View', panorama: '../assets/routes/floor 3/stairs to floor 4/STAIR 2.jpg',
        hotSpots: [
          { pitch:8, yaw: 377, type:'scene', text:'Go to Gym Stairs', sceneId:'gymStairs', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-25, yaw: 347, type:'scene', text:'Go Down', sceneId:'floor4Stairs', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-15, yaw: 180, type:'scene', text:'Go to Main Hallway', sceneId:'floor4MainHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor4MainHallway', title: 'Floor 4 Main Hallway', panorama: '../assets/routes/floor 4/1.jpg',
        hotSpots: [
          { pitch:-30, yaw:75, type:'scene', text:'Go Back', sceneId:'floor4', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-10, yaw:0, type:'scene', text:'Go to Hallway', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor4MiddleHallway', title: 'Floor 4 Middle Hallway', panorama: '../assets/routes/floor 4/2.jpg',
        hotSpots: [
          { pitch:-10, yaw:5, type:'scene', text:'Go Back to Main Hallway', sceneId:'floor4MainHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-5, yaw:95, type:'scene', text:'Go to Left Hallway', sceneId:'floor4LeftHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-10, yaw:-80, type:'scene', text:'Go to Right Hallway', sceneId:'floor4RightHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 10, yaw: -47, type: 'info', text: 'Aquarium\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/16HlMMu8etgSj629vRtgKhHmq2WfM5ojG/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:-10, yaw:-47, type:'scene', text:'Go to Aquarium', sceneId:'Aquarium', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 35, yaw: 200, type: 'info', text: 'Computer Laboratory 3\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1uly-fFEQ_2h30ajQFI09w-K2k5asuGMc/view?usp=drive_link',
            }, target: '_blank'},
          { pitch: 0, yaw:200, type:'scene', text:'Go to Com Lab 3', sceneId:'ComLab3', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'floor4LeftHallway', title: 'Floor 4 Left Hallway', panorama: '../assets/routes/floor 4/4.jpg',
        hotSpots: [
          { pitch:-12, yaw:-86, type:'scene', text:'Go Back to Middle Hallway', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 20, yaw: -35, type: 'info', text: 'Speech Laboratory\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1OfDC2zJGu9DHvze75-V-0bquxLbEaOgK/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:-10, yaw:-35, type:'scene', text:'Go to Speech Lab', sceneId:'SpeechLab', cssClass:'arrow-right', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
        ]
      },
      {
        id: 'floor4RightHallway', title: 'Floor 4 Right Hallway', panorama: '../assets/routes/floor 4/3.jpg',
        hotSpots: [
          { pitch:-10, yaw:205, type:'scene', text:'Go Back to Middle Hallway', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 20, yaw: 50, type: 'info', text: 'Room 402\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1ZByuCLtiXqScGgDCdR7jODEVcxE5cR-t/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:-5, yaw:51, type:'scene', text:'Go to Room 402', sceneId:'Room402', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 5, yaw: -23, type: 'info', text: 'Room 403A\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1S5fARMjHAGFCgZ2lcPFMOSvstNgQ2ygx/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:-5, yaw:-23, type:'scene', text:'Go to Room 403A', sceneId:'Room403', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch: 5, yaw: -4, type: 'info', text: 'Room 401\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1BHNwXsZpV2T0_qhbTEVDnMhyP7zM_t_D/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:-5, yaw:-4, type:'scene', text:'Go to Room 401', sceneId:'Room401', cssClass:'arrow-left', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room401', title: 'Room 401', panorama: '../assets/routes/floor 4/401.jpg',
        hotSpots: [
          { pitch:-5, yaw:80, type:'scene', text:'Exit', sceneId:'floor4RightHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room402', title: 'Room 402', panorama: '../assets/routes/floor 4/402.jpg',
        hotSpots: [
          { pitch:-5, yaw:-150, type:'scene', text:'Exit', sceneId:'floor4RightHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room403', title: 'Room 403', panorama: '../assets/routes/floor 4/403.jpg',
        hotSpots: [
          { pitch:-5, yaw:160, type:'scene', text:'Exit', sceneId:'floor4RightHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Room405_407', title: 'Room 405 to 407', panorama: '../assets/routes/floor 4/405-407.jpg',
        hotSpots: [
          { pitch:-5, yaw:-140, type:'scene', text:'Exit', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'Aquarium', title: 'AQUARIUM', panorama: '../assets/routes/floor 4/AQUARIUM.jpg',
        hotSpots: [
          { pitch:-5, yaw:-150, type:'scene', text:'Exit', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'SpeechLab', title: 'SPEECH LABORATORY', panorama: '../assets/routes/floor 4/SPEECH LAB.jpg',
        hotSpots: [
          { pitch:-2, yaw:120, type:'scene', text:'Exit', sceneId:'floor4LeftHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'ComLab3', title: 'Computer Laboratory 3', panorama: '../assets/routes/floor 4/COM_LAB 3.jpg',
        hotSpots: [
          { pitch:-5, yaw:-30, type:'scene', text:'Exit', sceneId:'floor4MiddleHallway', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'gymStairs', title: 'Gym Stairs', panorama: '../assets/routes/floor 4/stairs to gym/STAIR 1.jpg',
        hotSpots: [
          { pitch:8, yaw: 377, type:'scene', text:'Go Up', sceneId:'gymEntrance', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-25, yaw: 347, type:'scene', text:'Go Down', sceneId:'floor4', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
    ],

    // GYM
    gym: [
      {
        id: 'gymEntrance', title: 'Gym Entrance', panorama: '../assets/routes/gym/1.jpg',
        hotSpots: [
          { pitch:-5, yaw:230, type:'scene', text:'Go to Gym Center', sceneId:'gymCenter', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:-33, yaw: 333, type:'scene', text:'Go Down', sceneId:'gymStairs', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'gymCenter', title: 'Gym Center', panorama: '../assets/routes/gym/2.jpg',
        hotSpots: [
          { pitch: -5, yaw: 285, type: 'info', text: 'Gym Event\n(Click here to see the video)', cssClass: 'info-hotspot', clickHandlerFunc: showVideoPopup,
            clickHandlerArgs: {
              url: 'https://drive.google.com/file/d/1zQl-NVqGnzMyq7LS6qkj9bAGl4hnIWFz/view?usp=drive_link',
            }, target: '_blank'},
          { pitch:-5, yaw:263, type:'scene', text:'Back to Gym Entrance', sceneId:'gymEntrance', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' },
          { pitch:13, yaw:280, type:'scene', text:'Go to Elevated Bleacher', sceneId:'elevatedBleacher', cssClass:'arrow-up', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      },
      {
        id: 'elevatedBleacher', title: 'Elevated Bleacher', panorama: '../assets/routes/gym/3.jpg',
        hotSpots: [
          { pitch:-23, yaw:-8, type:'scene', text:'Back to Gym Center', sceneId:'gymCenter', cssClass:'arrow-down', targetYaw:'same', targetPitch:'same', targetHfov:'same' }
        ]
      }
    ]
  };
  
  const sceneToLocation = {};
  Object.entries(locations).forEach(([locKey, scenes]) => {
    scenes.forEach(sc => {
      sceneToLocation[sc.id] = locKey;
    });
  });

  // Populate scene based on the current location
  function populateScenes(locationKey) {
    sceneSelect.innerHTML = '';
    locations[locationKey].forEach(scene => {
      const opt = document.createElement('option');
      opt.value = scene.id;
      opt.textContent = scene.title;
      sceneSelect.appendChild(opt);
    });
    const firstId = locations[locationKey][0].id;
    updatePreviewImage(firstId);
  }

  // When the location changes, repopulate the scenes and load the first scene
  locationSelect.addEventListener('change', () => {
    const loc = locationSelect.value;
    populateScenes(loc);
    if (viewer) {
      const firstSceneId = locations[loc][0].id;
      viewer.loadScene(firstSceneId);
      sceneSelect.value = firstSceneId;
      updatePreviewImage(firstSceneId);
    }
  });

  // When the scene change, load the specific scene
  sceneSelect.addEventListener('change', () => {
    const sceneId = sceneSelect.value;
    if (viewer && sceneId) {
      viewer.loadScene(sceneId);
      updatePreviewImage(sceneId);
    }
  });

  vtBtn.addEventListener('click', async e => {
    e.preventDefault();
    if (window.innerWidth <= 768) closeAllMenus();
    vtPanel.style.display = 'block';

    if (!vtPanel._loaded) {
      populateScenes(locationSelect.value);

      // Build base config
      const pannellumConfig = {
        default: {
          firstScene: locations[locationSelect.value][0].id,
          sceneFadeDuration: 800,
          autoLoad: true,
          showControls: false
        },
        scenes: {}
      };

      // Fetch each panorama as a Blob URL
      const allScenes = Object.values(locations).flat();
      const blobPromises = allScenes.map(async sc => {
        const cleanPath = sc.panorama.replace(/ /g, '%20');
        try {
          const resp = await fetch(cleanPath);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          const blob = await resp.blob();
          const blobUrl = URL.createObjectURL(blob);
          return [sc.id, blobUrl, sc];
        } catch {
          return [sc.id, cleanPath, sc];
        }
      });
      const entries = await Promise.all(blobPromises);

      entries.forEach(([sceneId, url, sc]) => {
        pannellumConfig.scenes[sceneId] = {
          title:    sc.title,
          type:     'equirectangular',
          panorama: url,
          hotSpots: sc.hotSpots || []
        };
      });

      // Initialize Pannellum
      viewer = pannellum.viewer('streetViewPanorama', pannellumConfig);

      viewer.on('scenechange', () => {
        const currentScene = viewer.getScene();
        updatePreviewImage(currentScene);
        
        // Close video popup if open
        const popup = document.getElementById('videoPopup');
        if (popup.style.display === 'block') {
          popup.style.display = 'none';
          document.getElementById('videoPopupIframe').src = '';
        }
        
        const locKey = Object.entries(locations)
          .find(([k, arr]) => arr.some(s => s.id === currentScene))[0];
        if (locationSelect.value !== locKey) {
          locationSelect.value = locKey;
          populateScenes(locKey);
          sceneSelect.value = currentScene;
          updatePreviewImage(currentScene);
        }
        sceneSelect.value = currentScene;
      });

      // Show initial preview
      updatePreviewImage(locations[locationSelect.value][0].id);

      vtPanel._loaded = true;
    }
  });

  function showVideoPopup(evt, args) {
    // 1. Get the pano container’s bounding rectangle
    const panoEl = document.getElementById('streetViewPanorama');
    const panoRect = panoEl.getBoundingClientRect();
  
    // 2. evt.clientX / clientY is relative to the viewport.
    //    Subtract panoRect.left/top to get coordinates inside pano.
    let clickX = evt.clientX - panoRect.left;
    let clickY = evt.clientY - panoRect.top;
  
    // 3. Optional: adjust so the popup box sits above/left of the hotspot,
    //    instead of directly covering it. For instance, move the popup up 10px:
    const offsetX = 0;   // e.g. shift left if you want
    const offsetY = -180; // negative moves it upward above the hotspot
    clickX += offsetX;
    clickY += offsetY;
  
    // 4. Make sure the popup doesn't run off the right/bottom edges
    //    (prevent it from going outside the pano). You can clamp:
    const popup = document.getElementById('videoPopup');
    const popupWidth = popup.offsetWidth;   // 300 px (or whatever CSS says)
    const popupHeight = popup.offsetHeight; // 169 px
    // If clickX + popupWidth > pano width, shift left:
    if (clickX + popupWidth > panoRect.width) {
      clickX = panoRect.width - popupWidth - 10; // 10px margin
    }
    // If clickY + popupHeight goes below pano height, shift up
    if (clickY + popupHeight > panoRect.height) {
      clickY = panoRect.height - popupHeight - 10;
    }
    // Also prevent negative final values:
    clickX = Math.max(0, clickX);
    clickY = Math.max(0, clickY);
  
    // 5. Convert Drive “/view?usp=drive_link” → “/preview” so it embeds
    let driveUrl = args.url;
    if (typeof driveUrl === 'string' && driveUrl.includes('/view')) {
      driveUrl = driveUrl.replace('/view?usp=drive_link', '/preview');
    }
    // 6. Set the iframe and position the popup
    const iframe = document.getElementById('videoPopupIframe');
    iframe.src = driveUrl;
  
    // 7. Position and show the popup
    popup.style.left = clickX + 'px';
    popup.style.top = clickY + 'px';
    popup.style.display = 'block';
  }
  
  // ----------------------------------------------------
  // Close logic: clear the iframe and hide the popup
  // ----------------------------------------------------
  const popupCloseBtn = document.getElementById('videoPopupClose');
  popupCloseBtn.addEventListener('click', () => {
    const popup = document.getElementById('videoPopup');
    popup.style.display = 'none';
    document.getElementById('videoPopupIframe').src = '';
  });

  // Close handlers
  closeVT.addEventListener('click', () => {
    vtPanel.style.display = 'none';
  });
  vtPanel.addEventListener('click', e => {
    if (e.target === vtPanel) {
      vtPanel.style.display = 'none';
    }
  });
});
