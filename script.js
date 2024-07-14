const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes =[]; //Here Globally we have to declare it with let bcoz it's value always Changes 

//Show Laoding
function loading(){
    loader.hidden =false;
    quoteContainer.hidden =true;
}

function complete(){
    quoteContainer.hidden =false;
    loader.hidden =true;
}


function newQuote(){
    loading();
    //Pick a random Quote From apiQuotes array
    const quote =apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if Author Text is blank and if yes then replace it unknown
    if(!quote.author){
        authorText.textContent = 'UNKNOWN';
    } else{
        authorText.textContent =quote.author;
    }

    //Check QuoteLength to determinne Styling
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    } else{   
        quoteText.classList.remove('long-quote');
    }
//Set QUote , Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); //Converting Javascript Object into Json Object
        //Now as we have to print Random quote, Hence We will use math ranodm and floor funcion
        newQuote();
    } catch(error){
        //Catch the error here.
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load call the function getQuotes
getQuotes();

