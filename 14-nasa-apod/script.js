const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('loader');


// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

function updateDOM() {
    resultsArray.forEach(result => {
        // Card Container
        const card = document.createElement('div');
        card.classList.add('card');
        // Link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        // Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        // Save Text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        saveText.textContent = 'Add to Favorites';
        // Card Text
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = result.explanation;
        // Footer Container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // Date
        const date = document.createElement('strong');
        date.textContent = result.date;
        // Copyright
        const copyright = document.createElement('span');
        copyright.textContent = result.copyright === undefined ? '' : ` ${result.copyright}`;
        // Append
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}

// Get 10 images from NASA API
async function getNasaPictures() {
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDOM();
    } catch (error) {
        // Catch error here
    }
}

// On load
getNasaPictures();

/* <div class="card">
    <a href="" title="View Full Image" target="_blank">
        <img src="https://apod.nasa.gov/apod/image/2104/FlamenebulaIR.jpg" alt="NASA Picture of the Day"
            class="card-img-top">
    </a>
    <div class="card-body">
        <h5 class="card-title">Title of Image</h5>
        <p class="clickable">Add to Favorites</p>
        <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi aliquam
            veritatis corporis eligendi minima eius eos aspernatur quis. Quia illum aliquam laborum neque
            provident ipsa error natus dolorem. Tenetur, ullam? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Fugit error, odio minima temporibus aperiam deleniti iste recusandae sapiente
            dolorum maiores impedit vel! Magnam dolor deleniti debitis nostrum, voluptatibus quasi omnis.
        </p>
        <small class="text-muted">
            <strong>12-12-2020</strong>
            <span>Copyright Info</span>
        </small>
    </div>
</div> */