import { getGameState, advanceDay } from './gameState.js';
import { generateEvent } from './events.js';

// Debugging: Log to verify the file is loaded
console.log("ui.js loaded");

// Function to populate the price table
function populatePriceTable() {
    console.log("Populating price table"); // Debugging line
    const gameState = getGameState();
    const tableBody = document.querySelector('#prices-table tbody');
    tableBody.innerHTML = ''; // Clear the table body first

    for (const city in gameState.prices) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${city.charAt(0).toUpperCase() + city.slice(1)}</td>
            <td>${gameState.prices[city].grain}</td>
            <td>${gameState.prices[city].wood}</td>
            <td>${gameState.prices[city].iron}</td>
            <td>${gameState.prices[city].wool}</td>
            <td>${gameState.prices[city].leather}</td>
            <td>${gameState.prices[city].spices}</td>
            <td>${gameState.prices[city].wine}</td>
            <td>${gameState.prices[city].preciousMetals}</td>
            <td>${gameState.prices[city].salt}</td>
            <td>${gameState.prices[city].pottery}</td>
        `;
        tableBody.appendChild(row);
    }
}

// Function to display a card based on event type
function displayEventCard(event, isTrue, type) {
    const cardContainer = {
        rumor: document.getElementById('rumor-cards-container'),
        news: document.getElementById('news-cards-container'),
        seasonal: document.getElementById('seasonal-cards-container')
    }[type];

    if (!cardContainer) {
        console.error(`Container for type ${type} not found`);
        return;
    }

    // Create a card
    const card = document.createElement('div');
    card.classList.add(`${type}-card`);
    card.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${event.description}`;

    // Additional information based on truth for rumors
    if (type === 'rumor') {
        card.textContent += isTrue ? ' (Rumor confirmed)' : ' (Unconfirmed rumor)';
    }

    // Append the card to the appropriate container
    cardContainer.appendChild(card);
}

// Function to generate and display events
function generateAndDisplayEvent() {
    const event = generateEvent();
    const isTrue = event.isTrue;

    // Determine the type: rumor (false), news (true), or seasonal (recurring)
    if (isTrue) {
        displayEventCard(event, isTrue, 'news');
    } else {
        displayEventCard(event, isTrue, 'rumor');
    }

    // Example seasonal event display (could be triggered by a timer or periodically)
    const seasonalEvent = { description: "Seasonal harvest festival" };
    displayEventCard(seasonalEvent, true, 'seasonal');
}

// Event listener for the "Next Day" button
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded"); // Debugging line
    populatePriceTable(); // Initial table population

    // Add event listener to the "Next Day" button
    const nextDayButton = document.getElementById('next-day-button');
    if (nextDayButton) {
        nextDayButton.addEventListener('click', () => {
            console.log("Next Day button clicked"); // Debugging line
            advanceDay(); // Advance the game state
            generateAndDisplayEvent(); // Generate and display an event
            populatePriceTable(); // Update the price table
        });
    } else {
        console.error("Next Day button not found in the DOM");
    }
});
