document.addEventListener('DOMContentLoaded', async () => {
  
  // Sélection des trois premiers genres
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  const shuffledGenres = shuffleArray([...movieGenres]);
  const selectedGridGenre2 = shuffledGenres[0];
  const selectedGridGenre3 = shuffledGenres[1];
  let selectedGridGenre4 = shuffledGenres[2];
  const titleGrid2 = document.getElementById('gridHeader2');
  const titleGrid3 = document.getElementById('gridHeader3');
  const titleGrid4 = document.getElementById('gridHeader4');
  titleGrid2.textContent = `${selectedGridGenre2}` + ' Movies';
  titleGrid3.textContent = `${selectedGridGenre3}` + ' Movies';
  titleGrid4.textContent = `${selectedGridGenre4}` + ' Movies';
  
  // Définition des 4 grilles
  let grid1 = { 
    elementId: 'movieGrid1', 
    buttonId: 'loadMoreBtn1', 
    movies: [], 
    currentPage: 0,
	moviesPerLine: 0,
    fetchUrl: 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=12'
  };
  
  let grid2 = { 
    elementId: 'movieGrid2', 
    buttonId: 'loadMoreBtn2', 
    movies: [], 
    currentPage: 0,
	moviesPerLine: 0,
    fetchUrl: `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=12&genre_contains=${encodeURIComponent(selectedGridGenre2)}`
  };
  
  let grid3 = { 
    elementId: 'movieGrid3', 
    buttonId: 'loadMoreBtn3', 
    movies: [], 
    currentPage: 0,
	moviesPerLine: 0,
    fetchUrl: `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=12&genre_contains=${encodeURIComponent(selectedGridGenre3)}`
  };
  
  let grid4 = { 
    elementId: 'movieGrid4', 
    buttonId: 'loadMoreBtn4', 
    movies: [], 
    currentPage: 0,
	moviesPerLine: 0,
    fetchUrl: `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=12&genre_contains=${encodeURIComponent(selectedGridGenre4)}`
  };
  
  // Appliquer le nombre de films par ligne 
  function applyMoviesPerLine(number) {
	const movieGrids = [grid1, grid2, grid3, grid4];
	for (const grid of movieGrids) {
	  grid.moviesPerLine = number;
	}  
  }
  
  // Calcul des films par ligne selon la taille d'ecran
  function calculateMoviesPerLine() {
	const mediaQueryMobile = window.matchMedia('(max-width: 720px)');
    const mediaQueryTablet = window.matchMedia('(min-width: 721px) and (max-width: 1679px)');
    const mediaQueryDesktop = window.matchMedia('(min-width: 1680px)');
	let number;
    if (mediaQueryMobile.matches) {
      number = 2;
    } else if (mediaQueryTablet.matches) {
      number = 4;
    } else if (mediaQueryDesktop.matches) {
      number = 6;
    }
	applyMoviesPerLine(number);
  }

  calculateMoviesPerLine();
  
 // Reset les 4 grilles
  function clearMovieGrids() {
    const movieGrids = ['movieGrid1', 'movieGrid2', 'movieGrid3', 'movieGrid4'];
    movieGrids.forEach(gridId => {
      const gridElement = document.getElementById(gridId);
      while (gridElement.firstChild) {
        gridElement.removeChild(gridElement.firstChild);
      }
    });
    
    [grid1, grid2, grid3, grid4].forEach(grid => {
      grid.currentPage = 0;
      grid.movies = [];
    });
  }
  
  // Reset la grille 4
  function clearMovieGrid4() {
    const movieGrid4 = document.getElementById('movieGrid4');
    const movieCards = movieGrid4.getElementsByClassName('movie-card');
    const movieCardsArray = Array.from(movieCards);
    movieCardsArray.forEach(card => movieGrid4.removeChild(card));
	grid4.currentPage = 0;
    grid4.movies = [];
  }
  
  // Gestion du redimensionnement
  let previousWidth = window.innerWidth;
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== previousWidth) {
        previousWidth = currentWidth;
        calculateMoviesPerLine();
        clearMovieCards();
        initializeGrid(grid1);
        initializeGrid(grid2);
        initializeGrid(grid3);
        initializeGrid(grid4);
      }
    }, 250); // adds delay to avoid spam
  });
  
  // Initialisation des filtres de la grille 4
  function initializeFilter() {
    const filter = document.getElementById('filterGenre');
    filter.innerHTML = '';
    movieGenres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre;
      option.innerText = genre;
      filter.appendChild(option);
    });
    
    filter.value = selectedGridGenre4;
	
	filter.addEventListener('change', () => {
	  clearMovieGrid4();
      selectedGridGenre4 = `${filter.value}`;
	  titleGrid4.textContent = `${filter.value}` + ' Movies';
      grid4.genre = `${filter.value}`;
      grid4.fetchUrl = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=12&genre_contains=${encodeURIComponent(filter.value)}`;
      grid4.currentPage = 0;
      initializeGrid(grid4);
    });
  }
  
  initializeFilter();
  
  // Rapporter de multiples films
  async function fetchMovies(genre, nextUrl) {
    const url = nextUrl;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const moviesData = await response.json();
    return moviesData.results;
  }
  
  // Rapporter les détails d'un film
  async function fetchMovie(id) {
  	const url = 'http://localhost:8000/api/v1/titles/' + id
  	const response = await fetch(url);
  	const movieData = await response.json();
  	return movieData;
  }
  
  // Filtrer et formatter les données d'un film
  function fillWithData(movie_data, type) {
  	if (movie_data !== null && movie_data !== undefined) {
  	  const content_filters = ['Undefined', '|'];
  	  if (content_filters.includes(movie_data)) {
  	    return (`Unknown ${type}.`);
  	  } else {
  	    return (movie_data);
  	  }
  	} else {
  	  return (`Unknown ${type}.`);
  	}
  }
  
  // Remplacer les posters de films 404
  async function checkImage(url, movie_id) {
	const movieIdInt = parseInt(movie_id, 10);
	if (!(unavailablePosters.includes(movieIdInt))) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return url;
        } else {
          return 'default_poster.jpg';
        }
      } catch (error) {
        return 'default_poster.jpg';
      }
	} else {
	  const index = unavailablePosters.indexOf(movieIdInt);
	  const replacementUrl = replacementPosters[index]
	  return replacementUrl;
	}
  }
  
  // Remplir l'encart du film en une
  async function displayFeaturedMovie(movie) {
    const featuredMovieElement = document.getElementById('featuredMovie');
	const movie_id = movie.id;
	const poster_url = await checkImage(movie.image_url, movie_id)
    featuredMovieElement.innerHTML = `
      <img class="featured-poster" src="${poster_url}" alt="${movie.original_title}">
      <div class="inner-movie-content">
        <div class="inner-movie-title"><h3>${movie.original_title}</h3></div>
        <div class="inner-movie-resume">${movie.description}</div>
        <p>Rating: ${movie.imdb_score}/10</p>
        <div class="inner-btn-container">
          <div class="inner-movie-button">Details</div>
        </div>
      </div>
    `;
    const btna = document.querySelector('.inner-movie-button');
    const btnb = document.querySelector('.featured-poster');
    btna.addEventListener('click', () => openModal(movie_id));
    btnb.addEventListener('click', () => openModal(movie_id));
  }
  
  // Gestion du bouton more
  async function loadMoreMovies(grid) {
	console.log(`Grid current page = ${grid.currentPage}`);
	console.log(`Grid movies pl = ${grid.moviesPerLine}`);
	console.log(`Grid lenght = ${grid.movies.length}`);
	if (grid.currentPage * grid.moviesPerLine + grid.moviesPerLine < grid.movies.length) {
      grid.currentPage++;
    } else {
      grid.currentPage = 0;
    }
    displayMovies(grid);
  }
  
  // Initialiser la grille
  async function initializeGrid(grid) {
	if (((grid.movies).length) === 0) {
      grid.movies = await fetchMovies(grid.genre, grid.fetchUrl);
	}
    displayMovies(grid);
	
	// More btn 1
	const loadMoreHandler = () => loadMoreMovies(grid);
    const buttonElement = document.getElementById(grid.buttonId);
    buttonElement.removeEventListener('click', grid.moreClickHandler);
    buttonElement.addEventListener('click', loadMoreHandler);
    grid.moreClickHandler = loadMoreHandler;
  }
  
  // Remplir la grille
  async function displayMovies(grid) {
    const movieGrid = document.getElementById(grid.elementId);
	if (grid.currentPage === 0) {
      movieGrid.innerHTML = ''; // Clear the grid only if resetting
	}
	
    const startIndex = grid.currentPage * grid.moviesPerLine;
    const endIndex = Math.min(startIndex + grid.moviesPerLine, grid.movies.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const movie = grid.movies[i];
	  const poster_url = await checkImage(movie.image_url, movie.id)
      
      // Obtenir l'évaluation en étoiles
      const { fullStars, halfStar, emptyStars } = getStarRating(movie.imdb_score);
      let starsHtml = '';
      starsHtml += createStarElement('full').repeat(fullStars);
      starsHtml += createStarElement('half').repeat(halfStar);
      starsHtml += createStarElement('empty').repeat(emptyStars);
	  
      // Créer la carte du film
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
      movieCard.innerHTML = `
        <img src="${poster_url}" alt="${movie.title}">
        <div class="movie-card-content">
          <h3>${movie.title}</h3>
          <div class="movie-card-rating">
            ${starsHtml}
          </div>
        </div>
      `;
      const movie_id = movie.id;
      movieCard.addEventListener('click', () => openModal(movie_id));
      movieGrid.appendChild(movieCard);
    }
	
	// More btn 2
    const loadMoreBtn = document.getElementById(grid.buttonId);
    if (endIndex < grid.movies.length) {
      loadMoreBtn.textContent = 'More';
      loadMoreBtn.classList.remove('hidden');
    } else if (grid.currentPage === 0) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.textContent = 'Reset';
    }
  }
  
  // Diviser le score par 2 pour obtenir un score sur 5
  function getStarRating(score) {
    const rating = Math.round(score / 2 * 2) / 2;
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 >= 0.5 ? 1 : 0;
    let emptyStars = 5 - fullStars - halfStar;
  
    return { fullStars, halfStar, emptyStars };
  }
  
  // Créer les étoiles svg
  function createStarElement(type) {
    switch (type) {
  	  case 'full':
  	    return `<svg width="12" height="12" viewBox="0 0 24 24" fill="#ffc700" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" stroke="#ffc700" stroke-width="2"/></svg>`;
  	  case 'half':
  	    return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" stroke="#ffc700" stroke-width="2" fill="none"/><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" fill="#ffc700" clip-path="inset(0 50% 0 0)"/></svg>`;
  	  case 'empty':
  	    return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" stroke="#ffc700" stroke-width="2"/></svg>`;
  	  default:
  	    return '';
    }
  }
  
  // Ouvrir et remplir la modale
  async function openModal(id) {
    console.log(`Movie ID = ${id}`);
    movie = await fetchMovie(id);
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = ''; // Clear previous content
	
    // Créer les éléments de la modale
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
	closeButton.onclick = () => { closeModal(); };
    const title = document.createElement('h2');
    const movie_title = fillWithData(movie.original_title, 'title');
    title.textContent = `${movie_title}`;
	
    modalHeader.appendChild(closeButton);
    modalHeader.appendChild(title);
	
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';
    const details_div = document.createElement('div');
    details_div.className = 'details';
    const yearAndGenre_div = document.createElement('div');
    const year = fillWithData(movie.date_published.split('-')[0], 'year');
    const genres = fillWithData(movie.genres.join(', '), 'genres');
    yearAndGenre_div.textContent = `${year} - ${genres}`;
    const rtc_div = document.createElement('div');
    const country = fillWithData(movie.countries.join(' / '), 'country');
    const rated_tmp = fillWithData(movie.rated, 'rating');
    const rating_filter = ['Not rated or unkown rating', 'Not rated or unknown rating'];
    let rated;
    if (rating_filter.includes(rated_tmp)) {
      rated = 'Not rated'
    } else {
  	  rated = rated_tmp;
    }
    const duration = fillWithData(movie.duration, 'duration');
    rtc_div.textContent = `${rated} - ${duration}mn ( ${country} )`;
    const score_div = document.createElement('div');
    const score = fillWithData(movie.imdb_score, 'score');
    score_div.textContent = `IMDb Score: ${score}/10`;
    const directorLabel = document.createElement('div');
    directorLabel.className = 'directors-label';
    directorLabel.textContent = 'Director:';
    const directors_div = document.createElement('div');
    directors_div.className = 'directors';
    const directors = fillWithData(movie.directors, 'director');
    directors_div.textContent = `${directors}`;
    const synopsisLabel = document.createElement('div');
    synopsisLabel.className = 'synopsis-label';
    synopsisLabel.textContent = 'Synopsis:';
    const synopsis_div = document.createElement('div');
    synopsis_div.className = 'synopsis';
    const synopsis = fillWithData(movie.long_description, 'synopsis');
    synopsis_div.textContent = `${synopsis}`;
    const actorsLabel = document.createElement('div');
    actorsLabel.className = 'actors-label';
    actorsLabel.textContent = 'Featuring:';
    const actors_div = document.createElement('div');
    actors_div.className = 'actors';
    const actors = fillWithData(movie.actors.join(', '), 'actors');
    actors_div.textContent = `${actors}`;
    
    details_div.appendChild(yearAndGenre_div);
    details_div.appendChild(rtc_div);
    details_div.appendChild(score_div);
    details_div.appendChild(directorLabel);
    details_div.appendChild(directors_div);
    details_div.appendChild(synopsisLabel);
    details_div.appendChild(synopsis_div);
    details_div.appendChild(actorsLabel);
    details_div.appendChild(actors_div);
  
    const poster_div = document.createElement('img');
    const poster_url = await checkImage(movie.image_url, movie.id)
    poster_div.src = poster_url;
    poster_div.alt = `${movie_title} Poster`;
  
    infoContainer.appendChild(details_div);
    infoContainer.appendChild(poster_div);
    modalBody.appendChild(infoContainer);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
	// Afficher la modale
    modal = document.getElementById('movieModal')
    modal.style.display = 'block';
  }
  
  // Fermer la modale
  function closeModal() {
    const modal = document.getElementById('movieModal');
    modal.style.display = 'none';
  }
  
  // Gestion de la fermeture de la modale par un clik externe
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('movieModal');
    if (event.target == modal) {
      closeModal();
    }
  });
  
  // Initialisation de la Page
  await initializeGrid(grid1);
  const bestMovies = grid1.movies;
  const highestScore = bestMovies[0].imdb_score;
  const topMovies = bestMovies.filter(movie => movie.imdb_score === highestScore);
  const selectedMovie = topMovies[Math.floor(Math.random() * topMovies.length)];
  const featuredMovie = await fetchMovie(selectedMovie.id);
  displayFeaturedMovie(featuredMovie);
  await initializeGrid(grid2);
  await initializeGrid(grid3);
  await initializeGrid(grid4);
});