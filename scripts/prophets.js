const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
}

function displayProphets(prophets) {
  prophets.forEach(function (prophet) {
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let birthDate = document.createElement('p');
    let birthPlace = document.createElement('p');

    fullName.textContent = prophet.name + ' ' + prophet.lastname;
    birthDate.textContent = 'Date of Birth: ' + prophet.birthdate;
    birthPlace.textContent = 'Place of Birth: ' + prophet.birthplace;
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', 'Portrait of ' + prophet.name + ' ' + prophet.lastname);

    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);

    cards.appendChild(card);
  });
}

getProphetData();
