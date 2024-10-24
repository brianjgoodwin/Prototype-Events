// Debugging: Log to verify the file is loaded
console.log("gameState.js loaded");

// Prices for each city
const prices = {
    forest: { grain: 5, wood: 6, iron: 12, wool: 8, leather: 10, spices: 25, wine: 8, preciousMetals: 20, salt: 12, pottery: 7 },
    desert: { grain: 10, wood: 15, iron: 6, wool: 14, leather: 12, spices: 10, wine: 20, preciousMetals: 18, salt: 8, pottery: 12 },
    valley: { grain: 7, wood: 11, iron: 20, wool: 7, leather: 13, spices: 32, wine: 9, preciousMetals: 23, salt: 8, pottery: 11 },
    mountain: { grain: 12, wood: 14, iron: 8, wool: 10, leather: 18, spices: 28, wine: 15, preciousMetals: 22, salt: 11, pottery: 16 },
    plains: { grain: 9, wood: 8, iron: 14, wool: 9, leather: 11, spices: 26, wine: 14, preciousMetals: 19, salt: 10, pottery: 13 },
    river: { grain: 6, wood: 10, iron: 16, wool: 11, leather: 9, spices: 27, wine: 10, preciousMetals: 21, salt: 9, pottery: 12 },
    beach: { grain: 8, wood: 12, iron: 18, wool: 10, leather: 15, spices: 30, wine: 12, preciousMetals: 15, salt: 5, pottery: 9 },
};

// Initial game state
const gameState = {
    currentDay: 1,
    prices,
};

// Function to get the current game state
function getGameState() {
    console.log("Getting game state"); // Debugging line
    return gameState;
}

// Function to advance the game state by one day
function advanceDay() {
    console.log("Advancing day"); // Debugging line
    gameState.currentDay += 1;
    console.log(`Current Day: ${gameState.currentDay}`); // Debugging line
}

export { getGameState, advanceDay };
