const fetchWeather = async () => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?=&id=524901&appid=52d90289923cfb853c893acdf01c1de5`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);
    const data = await response.json();

    const currentTemp = Math.round(data.list[0].main.temp);
    const weatherDescription = data.list[0].weather.map(w => capitalize(w.description)).join(", ");
    const forecast = data.list.slice(0, 3).map(day => Math.round(day.main.temp));

    document.getElementById('weather-info').innerHTML = `
            <p>Current Temperature: ${currentTemp}°C</p>
            <p>Weather: ${weatherDescription}</p>
            <p>3-Day Forecast: ${forecast.join("°C, ")}°C</p>
        `;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weather-info').innerHTML = `<p>Unable to load weather data.</p>`;
  }
};

const capitalize = str => str.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");

document.addEventListener('DOMContentLoaded', fetchWeather);


const fetchSpotlights = async () => {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();

    const goldAndSilver = members.filter(member => member.level === 'Gold' || member.level === 'Silver');
    const randomMembers = goldAndSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

    const spotlightContainer = document.querySelector('.spotlight-container');
    spotlightContainer.innerHTML = randomMembers.map(member => `
            <div class="spotlight-card">
                <img src="images/company-logos/${member.logo}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p>${member.phone}</p>
                <p>${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${member.level}</p>
            </div>
        `).join('');
  } catch (error) {
    console.error('Error fetching spotlight data:', error);
  }
};

async function fetchMembers() {
  const response = await fetch('data/members.json');
  const members = await response.json();
  const directory = document.getElementById('directory');

  directory.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo">
            <div>
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Membership:</strong> ${member.membership}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `;
    directory.appendChild(card);
  });
}

document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('directory').className = 'grid';
  fetchMembers();
});

document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('directory').className = 'list';
  fetchMembers();
});

document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  fetchSpotlights();
  fetchMembers();
});
