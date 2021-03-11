const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');



// Solution 1: Use API Quotes instead of Local Quotes
let apiUrlQuotes = [];

// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiUrlQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Show New Quote
function newQuote() {
    // Pick a random quote from apiQuotes array
    const quote = apiUrlQuotes[Math.floor(Math.random() * apiUrlQuotes.length)];

    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// On Load
getQuotes();

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


/*
// Solution 2: Use Local Quotes
// Show New Quote
function newQuote() {
    // Pick a random quote from apiQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote);
}

newQuote();
*/