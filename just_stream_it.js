// Definission de variables
const shuffledGenres = shuffleArray([...movieGenres]);
const selectedGridGenre2 = shuffledGenres[0];
const selectedGridGenre3 = shuffledGenres[1];
let selectedGridGenre4 = shuffledGenres[2];
const grid1 = createGridConfig("movieGrid1", "loadMoreBtn1");
const grid2 = createGridConfig(
  "movieGrid2",
  "loadMoreBtn2",
  selectedGridGenre2
);
const grid3 = createGridConfig(
  "movieGrid3",
  "loadMoreBtn3",
  selectedGridGenre3
);
const grid4 = createGridConfig(
  "movieGrid4",
  "loadMoreBtn4",
  selectedGridGenre4
);
const debouncedHandleScreenChange = debounce(handleScreenChange, 250);
const mediaQueryMobile = window.matchMedia("(max-width: 719px)");
const mediaQueryTablet = window.matchMedia(
  "(min-width: 720px) and (max-width: 1199px)"
);
const mediaQueryDesktop = window.matchMedia("(min-width: 1200px)");
mediaQueryMobile.addEventListener("change", debouncedHandleScreenChange);
mediaQueryTablet.addEventListener("change", debouncedHandleScreenChange);
mediaQueryDesktop.addEventListener("change", debouncedHandleScreenChange);
let previousWidth = window.innerWidth;
let resizeTimer;
let debounceTimeout;
let handleLoadMoreClick;
let handleResetClick;

// fonctions principales
function main() {
	createSections();
	createDivHeaders();
	calculateMoviesShown();
	initializeFilter();
	pageInit();
}

main()

// Debounce
function debounce(func, delay) {
  return function (...args) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Création des sections
function createSections() {
  const mainContainer = document.querySelector("main.container");
  const sectionsData = [
    {
      headerText: "Best Movie Pick:",
      gridId: "featuredMovie",
      type: "featured",
    },
    {
      headerText: "Best Movies",
      gridId: "movieGrid1",
      buttonId: "loadMoreBtn1",
    },
    { headerText: "Movies 2", gridId: "movieGrid2", buttonId: "loadMoreBtn2" },
    { headerText: "Movies 3", gridId: "movieGrid3", buttonId: "loadMoreBtn3" },
    {
      headerText: "Movies 4",
      gridId: "movieGrid4",
      buttonId: "loadMoreBtn4",
      filterGenre: true,
    },
  ];

  sectionsData.forEach((sectionData, index) => {
    const section = document.createElement("section");
    section.innerHTML = `
      <div class="main-content">
        ${
          sectionData.type === "featured"
            ? `
        <div class="featured-movie-header">
          <h2>${sectionData.headerText}</h2>
        </div>
        <div class="featured-movie" id="${sectionData.gridId}">
          <!-- Featured movie will be dynamically inserted here -->
        </div>`
            : `
        <h2 class="grid-header" id="gridHeader${index}">${
                sectionData.headerText
              }</h2>
        ${sectionData.filterGenre ? '<select id="filterGenre"></select>' : ""}
        <div class="movie-grid" id="${sectionData.gridId}">
          <!-- Movie Grid ${index} will be dynamically inserted here -->
        </div>
        <div class="more-container">
          <div class="more-btn" id="${sectionData.buttonId}">More</div>
        </div>`
        }
      </div>
    `;
    mainContainer.appendChild(section);
  });
}

// Mélanger une liste
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Création des grid headers
function createDivHeaders() {
  const titleGrid2 = document.getElementById("gridHeader2");
  const titleGrid3 = document.getElementById("gridHeader3");
  const titleGrid4 = document.getElementById("gridHeader4");
  titleGrid2.textContent = `${selectedGridGenre2}` + " Movies";
  titleGrid3.textContent = `${selectedGridGenre3}` + " Movies";
  titleGrid4.textContent = `${selectedGridGenre4}` + " Movies";
}

// Définition d'une grid avec ses attributs
function createGridConfig(elementId, buttonId, genre = null) {
  const baseFetchUrl =
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=6";
  const fetchUrl = genre
    ? `${baseFetchUrl}&genre_contains=${encodeURIComponent(genre)}`
    : baseFetchUrl;

  return {
    elementId: elementId,
    buttonId: buttonId,
    buttonEh: false,
    movies: [],
    currentPage: 0,
    moviesShown: 0,
    resetCards: 0,
    fetchUrl: fetchUrl,
  };
}

// Appliquer le nombre de films
function applyMoviesShown(number) {
  const movieGrids = [grid1, grid2, grid3, grid4];
  for (const grid of movieGrids) {
    grid.moviesShown = number;
  }
}

// Calcul des films affichés selon la taille d'ecran
function calculateMoviesShown() {
  const mediaQueryMobile = window.matchMedia("(max-width: 719px)");
  const mediaQueryTablet = window.matchMedia(
    "(min-width: 720px) and (max-width: 1199px)"
  );
  const mediaQueryDesktop = window.matchMedia("(min-width: 1200px)");
  let number;
  if (mediaQueryMobile.matches) {
    number = 2;
  } else if (mediaQueryTablet.matches) {
    number = 4;
  } else if (mediaQueryDesktop.matches) {
    number = 6;
  }
  applyMoviesShown(number);
}

// Reset les 4 grilles
function clearMovieGrids() {
  const movieGrids = ["movieGrid1", "movieGrid2", "movieGrid3", "movieGrid4"];
  movieGrids.forEach((gridId) => {
    const gridElement = document.getElementById(gridId);
    while (gridElement.firstChild) {
      gridElement.removeChild(gridElement.firstChild);
    }
  });

  [grid1, grid2, grid3, grid4].forEach((grid) => {
    grid.currentPage = 0;
    initializeGrid(grid);
  });
}

// Reset une grille
function resetGrid(grid) {
  const movieGrid = document.getElementById(`${grid.elementId}`);
  const movieCards = movieGrid.getElementsByClassName("movie-card");
  const movieCardsArray = Array.from(movieCards);
  movieCardsArray.forEach((card) => movieGrid4.removeChild(card));
  grid.currentPage = 0;
  initializeGrid(grid);
}

// Reset la grille 4
function clearMovieGrid4() {
  const movieGrid4 = document.getElementById("movieGrid4");
  const movieCards = movieGrid4.getElementsByClassName("movie-card");
  const movieCardsArray = Array.from(movieCards);
  movieCardsArray.forEach((card) => movieGrid4.removeChild(card));
  grid4.currentPage = 0;
  grid4.movies = [];
}

// Gestion du redimensionnement
function handleScreenChange() {
  calculateMoviesShown();
  clearMovieGrids();
}

// Initialisation des filtres de la grille 4
function initializeFilter() {
  const filter = document.getElementById("filterGenre");
  filter.innerHTML = "";
  movieGenres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.innerText = genre;
    filter.appendChild(option);
  });

  filter.value = selectedGridGenre4;

  filter.addEventListener("change", () => {
    clearMovieGrid4();
    selectedGridGenre4 = `${filter.value}`;
    const titleGrid4 = document.getElementById("gridHeader4");
    titleGrid4.textContent = `${filter.value}` + " Movies";
    grid4.genre = `${filter.value}`;
    grid4.fetchUrl = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=12&genre_contains=${encodeURIComponent(
      filter.value
    )}`;
    initializeGrid(grid4);
  });
}

// Rapporter de multiples films
async function fetchMovies(genre, nextUrl) {
  const url = nextUrl;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const moviesData = await response.json();
  return moviesData.results;
}

// Rapporter les détails d'un film
async function fetchMovie(id) {
  const url = "http://localhost:8000/api/v1/titles/" + id;
  const response = await fetch(url);
  const movieData = await response.json();
  return movieData;
}

// Filtrer et formatter les données d'un film
function fillWithData(movie_data, type) {
  if (movie_data !== null && movie_data !== undefined) {
    const content_filters = ["Undefined", "|"];
    if (content_filters.includes(movie_data)) {
      return `Unknown ${type}.`;
    } else {
      return movie_data;
    }
  } else {
    return `Unknown ${type}.`;
  }
}

// Remplacer les posters de films 404
async function checkImage(url, movie_id) {
  const movieIdInt = parseInt(movie_id, 10);
  if (!unavailablePosters.includes(movieIdInt)) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return url;
      } else {
        return "default_poster.jpg";
      }
    } catch (error) {
      return "default_poster.jpg";
    }
  } else {
    const index = unavailablePosters.indexOf(movieIdInt);
    const replacementUrl = replacementPosters[index];
    return replacementUrl;
  }
}

// Remplir l'encart du film en une
async function displayFeaturedMovie(movie) {
  const featuredMovieElement = document.getElementById("featuredMovie");
  const movie_id = movie.id;
  const poster_url = await checkImage(movie.image_url, movie_id);
  featuredMovieElement.innerHTML = `
    <img class="featured-poster" src="${poster_url}" alt="${movie.original_title}">
    <div class="inner-movie-content">
      <div class="inner-movie-title"><h3>${movie.original_title}</h3></div>
      <div class="inner-movie-resume">${movie.description}</div>
      <div class="inner-movie-rating">Rating: ${movie.imdb_score}/10</div>
      <div class="inner-btn-container">
        <div class="inner-movie-button">Details</div>
      </div>
    </div>
  `;
  const btna = document.querySelector(".inner-movie-button");
  const btnb = document.querySelector(".featured-poster");
  btna.addEventListener("click", () => openModal(movie_id));
  btnb.addEventListener("click", () => openModal(movie_id));
}

// Verifier s'il y'a d'autres films à charger
function isThereMore(films, line, page) {
  if (line === 6) return false;

  if (line === 4) {
    return films > line && page === 0;
  }

  if (line === 2) {
    if (films <= line) return false;

    const movie_shown = 4;
    if (page === 1) {
      return films > movie_shown;
    } else if (page === 2) {
      return false;
    }
  }

  return false;
}

// Gestion du bouton de la grille
function loadMoreMovies(grid) {
  const movieCards = document.getElementById(grid.elementId).children;
  const loadMoreBtn = document.getElementById(grid.buttonId);
  grid.currentPage++;
  const morefilms = isThereMore(
    grid.movies.length,
    grid.moviesShown,
    grid.currentPage
  );
  if (grid.moviesShown === 6 || grid.movies.length < grid.moviesShown) {
    // Tous les films sont affichés, le bouton ne doit pas apparaître
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
    if (loadMoreBtn.textContent === "Reset") {
      let i = 1;
      for (const movieCard of movieCards) {
        if (i > grid.moviesShown) {
          movieCard.style.display = "none";
        }
        i++;
      }
      if (grid.elementId != "movieGrid4") {
        window.scrollBy(0, -(330 * grid.resetCards));
      }
      loadMoreBtn.textContent = "More";
      grid.currentPage = 0;
    } else {
      let i = 1;
      for (const movieCard of movieCards) {
        if (i <= grid.moviesShown * (grid.currentPage + 1)) {
          movieCard.style.display = "block";
        }
        i++;
      }
      if (morefilms) {
        loadMoreBtn.textContent = "More";
      } else {
        loadMoreBtn.textContent = "Reset";
      }
    }
  }
}

// Initialiser la grille
async function initializeGrid(grid) {
  if (grid.movies.length === 0) {
    grid.movies = await fetchMovies(grid.genre, grid.fetchUrl);
  }
  displayMovies(grid);
}

// Remplir la grille
async function displayMovies(grid) {
  const movieGrid = document.getElementById(grid.elementId);
  if (grid.currentPage === 0) {
    movieGrid.innerHTML = ""; // Clear the grid only if resetting
  }
  let movieCount = 0;
  for (const movie of grid.movies) {
    const poster_url = await checkImage(movie.image_url, movie.id);

    // Obtenir l'évaluation en étoiles
    const { fullStars, halfStar, emptyStars } = getStarRating(movie.imdb_score);
    let starsHtml = "";
    starsHtml += createStarElement("full").repeat(fullStars);
    starsHtml += createStarElement("half").repeat(halfStar);
    starsHtml += createStarElement("empty").repeat(emptyStars);

    // Créer la carte du film
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    if (movieCount >= grid.moviesShown) {
      movieCard.style.display = "none";
    }
    movieCard.innerHTML = `
      <img src="${poster_url}" alt="${movie.title}">
      <div class="movie-card-content">
        <h3>${movie.title}</h3>
        <div class="movie-card-rating">
          ${starsHtml}
        </div>
	  <div class="card-details-button">Details</div>
      </div>
    `;
    const movie_id = movie.id;
    movieCard.addEventListener("click", () => openModal(movie_id));
    movieGrid.appendChild(movieCard);
    movieCount++;
  }

  // More btn
  grid.resetCards = grid.movies.length - grid.moviesShown;
  const loadMoreBtn = document.getElementById(grid.buttonId);
  if (!grid.buttonEh) {
    grid.buttonEh = true;
    loadMoreBtn.addEventListener("click", () => loadMoreMovies(grid));
  }
  if (grid.moviesShown === 6 || grid.movies.length < grid.moviesShown) {
    // Tous les films sont affichés, le bouton ne doit pas apparaître
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

// Diviser le score par 2 pour obtenir un score sur 5
function getStarRating(score) {
  const rating = Math.round((score / 2) * 2) / 2;
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 >= 0.5 ? 1 : 0;
  let emptyStars = 5 - fullStars - halfStar;

  return { fullStars, halfStar, emptyStars };
}

// Créer les étoiles svg
function createStarElement(type) {
  switch (type) {
    case "full":
      return `<svg width="12" height="12" viewBox="0 0 24 24" fill="#ffc700" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" stroke="#ffc700" stroke-width="2"/></svg>`;
    case "half":
      return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" stroke="#ffc700" stroke-width="2" fill="none"/><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" fill="#ffc700" clip-path="inset(0 50% 0 0)"/></svg>`;
    case "empty":
      return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" stroke="#ffc700" stroke-width="2"/></svg>`;
    default:
      return "";
  }
}

// Ouvrir et remplir la modale
async function openModal(id) {
  console.log(`Movie ID = ${id}`);
  const movie = await fetchMovie(id);

  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = ""; // Clear previous content

  // Créer le contenu de la modale
  const {
    original_title: title,
    date_published,
    genres,
    countries,
    rated,
    duration,
    worldwide_gross_income,
    imdb_score,
    directors,
    long_description,
    actors,
    image_url,
  } = movie;
  const sanitizedRating = [
    "Not rated or unkown rating",
    "Not rated or unknown rating",
  ].includes(rated)
    ? "Not rated"
    : rated;
  const boxOffice = 
    typeof worldwide_gross_income === 'number'
      ? `${worldwide_gross_income} $`
      : "Unknown";

  modalContent.innerHTML = `
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2>${fillWithData(title, "title")}</h2>
    </div>
    <div class="modal-body">
      <div class="info-container">
        <div class="details">
          <div>${fillWithData(
            date_published.split("-")[0],
            "year"
          )} - ${fillWithData(genres.join(", "), "genres")}</div>
          <div>${sanitizedRating} - ${fillWithData(
               duration,
              "duration"
              )}mn (${fillWithData(countries.join(" / "), "country")})</div>
          <div>Box Office: ${boxOffice}</div>
          <div>IMDb Score: ${fillWithData(imdb_score, "score")}/10</div>
          <div class="directors-label">Director:</div>
          <div class="directors">${fillWithData(directors, "director")}</div>
          <div class="synopsis-label">Synopsis:</div>
          <div class="synopsis">${fillWithData(
            long_description,
            "synopsis"
          )}</div>
          <div class="actors-label">Featuring:</div>
          <div class="actors">${fillWithData(actors.join(", "), "actors")}</div>
        </div>
        <img src="${await checkImage(image_url, id)}" alt="${fillWithData(
    title,
    "title"
  )} Poster">
      </div>
    </div>
  `;

  // Gestion de la fermeture de la modale
  document.querySelector(".close").onclick = closeModal;

  // Afficher la modale
  const modal = document.getElementById("movieModal");
  modal.style.display = "block";
}

// Fermer la modale
function closeModal() {
  const modal = document.getElementById("movieModal");
  modal.style.display = "none";
}

// Gestion de la fermeture de la modale par un clik externe
window.addEventListener("click", (event) => {
  const modal = document.getElementById("movieModal");
  if (event.target == modal) {
    closeModal();
  }
});

// Initialisation de la Page
async function pageInit() {
  await initializeGrid(grid1);
  const bestMovies = grid1.movies;
  const highestScore = bestMovies[0].imdb_score;
  const topMovies = bestMovies.filter(
    (movie) => movie.imdb_score === highestScore
  );
  const selectedMovie = topMovies[Math.floor(Math.random() * topMovies.length)];
  const featuredMovie = await fetchMovie(selectedMovie.id);
  displayFeaturedMovie(featuredMovie);
  const loading = document.getElementById("loading");
  loading.style.display = "none";
  await initializeGrid(grid2);
  await initializeGrid(grid3);
  await initializeGrid(grid4);
}
