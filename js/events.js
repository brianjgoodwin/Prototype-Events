import { getGameState } from './gameState.js';

// Debugging: Log to verify the file is loaded
console.log("events.js loaded");

// Event templates
const eventTemplates = [
    { description: "Bad harvest in the Forest", city: "forest", resource: "grain", priceImpact: 0.2 },
    { description: "Iron shortage in the Desert", city: "desert", resource: "iron", priceImpact: 0.3 },
    { description: "Spice surplus at the Beach", city: "beach", resource: "spices", priceImpact: -0.25 },
    { description: "Wool prices rising in the Valley", city: "valley", resource: "wool", priceImpact: 0.15 }
];

// Function to generate an event
function generateEvent() {
    console.log("Generating event"); // Debugging line

    // Randomly select an event from the template
    const randomEvent = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
    const isTrue = Math.random() < 0.6; // 60% chance the event is true

    // If the event is true, update the price in the game state
    if (isTrue) {
        console.log(`Event is true: ${randomEvent.description}`); // Debugging line
        const gameState = getGameState();
        const cityPrices = gameState.prices[randomEvent.city];
        cityPrices[randomEvent.resource] = Math.round(cityPrices[randomEvent.resource] * (1 + randomEvent.priceImpact));
    } else {
        console.log(`Event is false: ${randomEvent.description}`); // Debugging line
    }

    // Return the event details along with its truth value
    return { ...randomEvent, isTrue };
}

export { generateEvent };
