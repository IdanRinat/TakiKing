// Initial deck composition
let deck = {
    'Number': { 
        'Red': {1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2}, 
        'Blue': {1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2}, 
        'Green': {1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2}, 
        'Yellow': {1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2} 
    },
    'Action': { 
        'Red': { 'Stop': 2, '+2': 2, 'Change Direction': 2, 'Taki': 2 }, 
        'Blue': { 'Stop': 2, '+2': 2, 'Change Direction': 2, 'Taki': 2 }, 
        'Green': { 'Stop': 2, '+2': 2, 'Change Direction': 2, 'Taki': 2 }, 
        'Yellow': { 'Stop': 2, '+2': 2, 'Change Direction': 2, 'Taki': 2 } 
    },
    'Special': { 'Change Color': 4, 'King': 2, '+3': 2, '+3 Breaker': 2 }
};

// Global variables to store the current selected color and number
let selectedColor = '';
let selectedNumber = '';

// Total cards in deck
let totalCards = 116;
let remainingCards = 116;

// Function to play a number card after selecting color
function playNumberCard(number) {
    if (deck['Number'][selectedColor][number] > 0) {
        deck['Number'][selectedColor][number]--;
        remainingCards--;
        document.getElementById("remaining-cards").innerText = remainingCards;
        updateProbabilities();
        hideNumberButtons(); // Hide the number buttons after selecting
    } else {
        alert(`No more ${selectedColor} ${number}'s left!`);
    }
}

// Function to play an action card after selecting color
function playActionCard(card) {
    if (deck['Action'][selectedColor][card] > 0) {
        deck['Action'][selectedColor][card]--;
        remainingCards--;
        document.getElementById("remaining-cards").innerText = remainingCards;
        updateProbabilities();
    } else {
        alert(`No more ${selectedColor} ${card} cards left!`);
    }
}

// Function to handle selecting a color for number cards
function selectColor(color) {
    selectedColor = color;
    showNumberButtons(); // Show number buttons for the selected color
}

// Function to show number buttons
function showNumberButtons() {
    document.getElementById("number-buttons").style.display = "block";
    document.getElementById("action-buttons").style.display = "none"; // Hide action buttons
}

// Function to hide number buttons
function hideNumberButtons() {
    document.getElementById("number-buttons").style.display = "none";
}

// Function to show action buttons
function showActionButtons() {
    document.getElementById("action-buttons").style.display = "block";
}

// Function to update probabilities
function updateProbabilities() {
    let probabilityResults = document.getElementById("probability-results");
    probabilityResults.innerHTML = ""; // Clear previous results

    let chartHeader = document.createElement("div");
    chartHeader.classList.add("chart-header");
    chartHeader.innerHTML = "<div>Card</div><div>Probability (%)</div>";
    probabilityResults.appendChild(chartHeader);

    // Loop through number cards by color and number
    for (let color in deck['Number']) {
        for (let number in deck['Number'][color]) {
            let count = deck['Number'][color][number];
            let probability = ((count / remainingCards) * 100).toFixed(2);
            let result = document.createElement("div");
            result.innerHTML = `<span style="color: ${color.toLowerCase()}">${number}</span><span>${probability}</span>`;
            probabilityResults.appendChild(result);
        }
    }

    // Loop through action cards by color
    for (let color in deck['Action']) {
        for (let card in deck['Action'][color]) {
            let count = deck['Action'][color][card];
            let probability = ((count / remainingCards) * 100).toFixed(2);
            let result = document.createElement("div");
            let symbol = getActionCardSymbol(card);
            result.innerHTML = `<span style="color: ${color.toLowerCase()}">${symbol}</span><span>${probability}</span>`;
            probabilityResults.appendChild(result);
        }
    }

    // Loop through special cards
    for (let card in deck['Special']) {
        let count = deck['Special'][card];
        let probability = ((count / remainingCards) * 100).toFixed(2);
        let result = document.createElement("div");
        let symbol = getSpecialCardSymbol(card);
        result.innerHTML = `<span style="color: black">${symbol}</span><span>${probability}</span>`;
        probabilityResults.appendChild(result);
    }
}

// Function to get action card symbols
function getActionCardSymbol(card) {
    switch (card) {
        case 'Stop':
            return 'S';
        case '+2':
            return '+';
        case 'Change Direction':
            return '↔';
        case 'Taki':
            return 'T';
        default:
            return '';
    }
}

// Function to get special card symbols
function getSpecialCardSymbol(card) {
    switch (card) {
        case 'Change Color':
            return 'C';
        case 'King':
            return 'K';
        case '+3':
            return '+3';
        case '+3 Breaker':
            return 'B';
        default:
            return '';
    }
}

// Initial probability calculation on page load
updateProbabilities();
