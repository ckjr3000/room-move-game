const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

const roomIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let state = {};
let roomsVisited = [];
let currentRoom = { id: 0 };
let newRoomToggle = true;

function getRandomRoom() {
  const r = Math.floor(Math.random() * 9);
  return roomIDs[r];
}

function checkVisited() {
  if (!roomsVisited.includes(currentRoom.id)) {
    roomsVisited.push(currentRoom.id);
  }
}

function startGame() {
  let startRoom = getRandomRoom();
  currentRoom.id = startRoom;
  showRoom(startRoom);
}

function showRoom(roomIndex) {
  currentRoom = rooms.find((room) => room.id === roomIndex);
  if (roomsVisited.includes(currentRoom.id)) {
    textElement.innerText = currentRoom.oldRoomText;
  } else {
    textElement.innerText = currentRoom.newRoomText;
  }
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  currentRoom.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextRoomId = option.nextRoom;
  checkVisited();
  if (nextRoomId <= 0) {
    return startGame();
  }
  showRoom(nextRoomId);
}

const rooms = [
  {
    id: 1,
    roomNorth: null,
    roomEast: 2,
    roomSouth: 4,
    roomWest: null,
    newRoomText: "This is a new room. Which way now?",
    oldRoomText: "You've been here before. Which way now?",
    options: [
      {
        text: "east",
        nextRoom: 2,
      },
      {
        text: "south",
        nextRoom: 4,
      },
    ],
  },
  {
    id: 2,
    roomNorth: null,
    roomEast: 3,
    roomSouth: 5,
    roomWest: 1,
    newRoomText: "This is a new room. Which way now?",
    oldRoomText: "You've been here before. Which way now?",
    options: [
      {
        text: "east",
        nextRoom: 3,
      },
      {
        text: "south",
        nextRoom: 5,
      },
      {
        text: "west",
        nextRoom: 1,
      },
    ],
  },
  {
    id: 3,
    roomNorth: null,
    roomEast: null,
    roomSouth: 6,
    roomWest: 2,
    newRoomText: "This is a new room. Which way now?",
    oldRoomText: "You've been here before. Which way now?",
    options: [
      {
        text: "south",
        nextRoom: 6,
      },
      {
        text: "west",
        nextRoom: 2,
      },
    ],
  },
  {
    id: 4,
    roomNorth: 1,
    roomEast: 5,
    roomSouth: 7,
    roomWest: null,
    newRoomText: "This is a new room. Which way now?",
    oldRoomText: "You've been here before. Which way now?",
    options: [
      {
        text: "north",
        nextRoom: 1,
      },
      {
        text: "east",
        nextRoom: 5,
      },
      {
        text: "south",
        nextRoom: 7,
      },
    ],
  },
  {
    id: 5,
    roomNorth: 2,
    roomEast: 6,
    roomSouth: 8,
    roomWest: 4,
    newRoomText: "This is a new room. Which way now?",
    oldRoomText: "You've been here before. Which way now?",
    options: [
      {
        text: "north",
        nextRoom: 2,
      },
      {
        text: "east",
        nextRoom: 6,
      },
      {
        text: "south",
        nextRoom: 8,
      },
      {
        text: "west",
        nextRoom: 4,
      },
    ],
  },
  {
    id: 6,
    roomNorth: 3,
    roomEast: null,
    roomSouth: 9,
    roomWest: 5,
    newRoomText: "This is a new room. Which way now?",
    oldRoomText: "You've been here before. Which way now?",
    options: [
      {
        text: "north",
        nextRoom: 3,
      },
      {
        text: "south",
        nextRoom: 9,
      },
      {
        text: "west",
        nextRoom: 5,
      },
    ],
  },
  {
    id: 7,
    roomNorth: 4,
    roomEast: 8,
    roomSouth: null,
    roomWest: null,
    newRoomText: "This is a new room. Which way now?",
    oldRoomText: "You've been here before. Which way now?",
    options: [
      {
        text: "north",
        nextRoom: 4,
      },
      {
        text: "east",
        nextRoom: 8,
      },
    ],
  },
  {
    id: 8,
    roomNorth: 5,
    roomEast: 9,
    roomSouth: null,
    roomWest: 7,
    newRoomText: "This is a new room. Which way now?",
    oldRoomText: "You've been here before. Which way now?",
    options: [
      {
        text: "north",
        nextRoom: 5,
      },
      {
        text: "east",
        nextRoom: 9,
      },
      {
        text: "west",
        nextRoom: 7,
      },
    ],
  },
  {
    id: 9,
    roomNorth: 6,
    roomEast: null,
    roomSouth: null,
    roomWest: 8,
    newRoomText: "This is a new room. Which way now?",
    oldRoomText: "You've been here before. Which way now?",
    options: [
      {
        text: "north",
        nextRoom: 6,
      },
      {
        text: "south",
        nextRoom: 10, // Exit
      },
      {
        text: "west",
        nextRoom: 8,
      },
    ],
  },
  {
    id: 10,
    newRoomText: `You exited the maze`,
  },
];

startGame();
