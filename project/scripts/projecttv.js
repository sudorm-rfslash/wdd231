const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Nzk2MTE2OTBlNzJjNjgxMjY5N2I3MDAxODcxYzExZSIsIm5iZiI6MTczMDQzMzg0Mi41MDQ0NjU2LCJzdWIiOiI2NGIwYjgwMzI1M2ZhYjAxMWIxZDYzNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kMfJRqH2BDu0CrZENaTHVaWoYw3TW6Z_M2_ddgHKM_Y'
  }
};

const movieCardsContainer = document.getElementById('movieCards');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

async function fetchMovies(url) {
  fetch(url, options)
    .then(response => response.json())
    .then(data => displayMovies(data.results.slice(0, 20)))
    .catch(error => console.error('Error fetching data:', error));
}

function formatDate(dateString) {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function displayMovies(movies) {
  movieCardsContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('figure');
    movieCard.innerHTML = `
      <img 
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
        alt="${movie.title || movie.name}" 
        loading="lazy">
      <figcaption>
        <h3>${movie.title || movie.name}</h3>
        <p>Rating: ${movie.vote_average.toFixed(1)}/10</p>
      </figcaption>
    `;

    // Store movie data for modal display
    movieCard.addEventListener('click', () => openModal(movie));
    movieCardsContainer.appendChild(movieCard);
  });
}

function openModal(movie) {
  const titleLink = document.getElementById('titlelink');
  const releaserating = document.getElementById('releaserating');
  const overview = document.getElementById('overview');

  titleLink.innerHTML = `<a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">${movie.title || movie.name} ⭷</a>`;
  releaserating.innerHTML = `
    <p><strong>Release Date:</strong> ${formatDate(movie.first_air_date)}</p>
    <p><strong>Rating:</strong> ${movie.vote_average.toFixed(1)}</p>
  `;
  overview.innerHTML = `<strong>Overview:</strong> ${movie.overview || 'No overview available.'}`;

  modal.style.display = 'block';
}

document.getElementById('modalClose').addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


modalClose.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Fetch trending TV shows on page load
fetchMovies('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
