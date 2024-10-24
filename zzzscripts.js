let currentDay = 1;
const events = [
    { description: "Bad harvest in City A", type: "disaster", target: "City A", faction: "Faction 1", truth: null },
    { description: "Trade surplus in City B", type: "surplus", target: "City B", faction: "Faction 1", truth: null },
    { description: "Conflict in Faction 2", type: "conflict", target: "Faction 2", faction: "Faction 2", truth: null },
    // Add more event templates here
];

function nextDay() {
    currentDay++;
    document.getElementById('current-day').textContent = currentDay;
    
    // Every 5 days, trigger an event
    if (currentDay % 5 === 0) {
        generateEvent();
    }
}

function generateEvent() {
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const isTrue = Math.random() < 0.6; // 60% chance the event is true
    randomEvent.truth = isTrue;

    // Create a rumor card
    const rumorCard = document.createElement('div');
    rumorCard.classList.add('rumor-card');
    rumorCard.textContent = `Rumor: ${randomEvent.description} (Truth: ${isTrue ? 'Yes' : 'No'})`;

    // Append the rumor card to the container
    document.getElementById('rumor-cards-container').appendChild(rumorCard);
}

// Prices for each city
let prices = {
    forest: { grain: 5, wood: 6, iron: 12, wool: 8, leather: 10, spices: 25, wine: 8, preciousMetals: 20, salt: 12, pottery: 7 },
    desert: { grain: 10, wood: 15, iron: 6, wool: 14, leather: 12, spices: 10, wine: 20, preciousMetals: 18, salt: 8, pottery: 12 },
    valley: { grain: 7, wood: 11, iron: 20, wool: 7, leather: 13, spices: 32, wine: 9, preciousMetals: 23, salt: 8, pottery: 11 },
    mountain: { grain: 12, wood: 14, iron: 8, wool: 10, leather: 18, spices: 28, wine: 15, preciousMetals: 22, salt: 11, pottery: 16 },
    plains: { grain: 9, wood: 8, iron: 14, wool: 9, leather: 11, spices: 26, wine: 14, preciousMetals: 19, salt: 10, pottery: 13 },
    river: { grain: 6, wood: 10, iron: 16, wool: 11, leather: 9, spices: 27, wine: 10, preciousMetals: 21, salt: 9, pottery: 12 },
    beach: { grain: 8, wood: 12, iron: 18, wool: 10, leather: 15, spices: 30, wine: 12, preciousMetals: 15, salt: 5, pottery: 9 },
};

// Function to populate the price table
function populatePriceTable() {
    const tableBody = document.querySelector('#prices-table tbody');
    tableBody.innerHTML = ''; // Clear the table body first

    for (const city in prices) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${city.charAt(0).toUpperCase() + city.slice(1)}</td>
            <td>${prices[city].grain}</td>
            <td>${prices[city].wood}</td>
            <td>${prices[city].iron}</td>
            <td>${prices[city].wool}</td>
            <td>${prices[city].leather}</td>
            <td>${prices[city].spices}</td>
            <td>${prices[city].wine}</td>
            <td>${prices[city].preciousMetals}</td>
            <td>${prices[city].salt}</td>
            <td>${prices[city].pottery}</td>
        `;
        tableBody.appendChild(row);
    }
}

// Function to generate and apply a rumor
function generateRumor() {
    // Define some example rumors and their impacts
    const rumors = [
        { description: "Bad harvest in the Forest", city: "forest", resource: "grain", priceImpact: 0.2 },
        { description: "Iron shortage in the Desert", city: "desert", resource: "iron", priceImpact: 0.3 },
        { description: "Spice surplus at the Beach", city: "beach", resource: "spices", priceImpact: -0.25 },
        { description: "Wool prices rising in the Valley", city: "valley", resource: "wool", priceImpact: 0.15 }
    ];

    // Randomly select a rumor
    const selectedRumor = rumors[Math.floor(Math.random() * rumors.length)];
    const isTrue = Math.random() < 0.6; // 60% chance the rumor is true

    // Apply the rumor effect if it's true
    if (isTrue) {
        prices[selectedRumor.city][selectedRumor.resource] = Math.round(prices[selectedRumor.city][selectedRumor.resource] * (1 + selectedRumor.priceImpact));
    }

    // Display the rumor card regardless of truth
    displayRumorCard(selectedRumor, isTrue);
    populatePriceTable(); // Update the table to show new prices
}

// Function to display a rumor card
function displayRumorCard(rumor, isTrue) {
    const rumorCard = document.createElement('div');
    rumorCard.classList.add('rumor-card');
    rumorCard.textContent = `Rumor: ${rumor.description}. ${isTrue ? 'Prices affected!' : 'Rumor unconfirmed.'}`;

    // Append the rumor card to the rumor container
    document.getElementById('rumor-cards-container').appendChild(rumorCard);
}

// Initialize the table and attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    populatePriceTable();
    document.getElementById('next-day-button').addEventListener('click', generateRumor);
});


// Add event listener to the "Next Day" button
document.getElementById('next-day-button').addEventListener('click', nextDay);
