document.addEventListener('DOMContentLoaded', async () => {
  const movieGenres = [
    'Action', 'Adult', 'Adventure', 'Animation', 'Biography', 
    'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 
    'Fantasy', 'Film-Noir', 'History', 'Horror', 'Music', 
    'Musical', 'Mystery', 'News', 'Reality-TV', 'Romance', 
    'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
  ];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  const shuffledGenres = shuffleArray([...movieGenres]);
  
  // Sélectionner les trois premiers genres du tableau mélangé
  const selectedGridGenre2 = shuffledGenres[0];
  const selectedGridGenre3 = shuffledGenres[1];
  let selectedGridGenre4 = shuffledGenres[2];
  
  const titleGrid2 = document.getElementById('gridHeader2');
  const titleGrid3 = document.getElementById('gridHeader3');
  const titleGrid4 = document.getElementById('gridHeader4');
  titleGrid2.textContent = `${selectedGridGenre2}` + ' Movies';
  titleGrid3.textContent = `${selectedGridGenre3}` + ' Movies';
  titleGrid4.textContent = `${selectedGridGenre4}` + ' Movies';
  
  const unavailablePosters = [259534, 75467, 469785, 291855, 47478, 2170667, 76759, 122565, 3978706, 1621830, 119385, 346336, 64116, 4991384, 5959980, 9477520, 78748, 75963, 179955, 85913, 10702760, 376076, 59578, 78299, 110081, 3569782, 50986, 88031, 77711, 139876, 95467, 457430, 376127, 1049413, 5943392, 7060460, 12364, 32976, 33045, 44837, 53946, 55499, 57358, 62229, 71315, 86022, 95468, 89108, 90982, 112553, 174299, 118715, 169858, 113247, 266543, 1028532, 1857670, 1821317, 6395628, 9675716, 28010, 48424, 54997, 50665, 52954, 57091, 58461, 67328, 58642, 70460, 63522, 61184, 78841, 117666, 118767, 103639, 221344, 860906, 38355, 30993, 31725, 57611, 53985, 61811, 65088, 64541, 75824, 61809, 75276, 67814, 71487, 164063, 291730, 11737772, 1827487, 2187153, 3801314, 36855, 33238, 40724, 36342, 51065, 57525, 68327, 75902, 75612, 62467, 79095, 79417, 95647, 111845, 118845, 132477, 144117, 185125, 233841, 375571, 1039960, 1152282, 3646462, 3822396, 6270936, 15163, 31225, 22286, 39037, 39040, 32455, 37469, 40705, 40338, 44954, 50243, 47136, 49601, 50987, 61814, 61196, 59646, 62041, 66198, 64793, 63555, 83089, 84855, 84726, 96163, 99492, 117631, 120265, 268126, 309047, 858492, 499375, 923811, 2316000, 23027, 8742774, 36431, 37077, 39190, 40636, 50539, 51525, 56194, 57717, 60176, 61537, 63462, 64840, 62523, 65838, 69663, 68883, 70334, 74916, 77941, 79116, 85175, 84807, 84707, 87373, 89804, 116922, 130827, 117731, 143348, 164538, 190798, 288330, 416320, 422320, 1447500, 1509132, 1595366, 1705772, 2355791, 6485666, 23649, 24772, 28096, 3883, 25004, 33704, 37988, 37515, 37671, 41088, 38854, 45205, 47985, 54250, 54953, 55506, 54965, 58218, 59358, 62428, 60908, 62323, 68699, 68528, 68899, 70290, 70809, 71249, 74720, 83004, 82671, 86961, 86005, 78269, 84237, 80549, 120324, 171804, 165798, 169880, 154506, 161860, 215369, 273870, 290820, 345549, 268380, 403579, 449951, 479751, 6067752, 6734886, 34248, 37054, 30418, 37638, 40067, 46000, 45124, 46878, 48347, 46511, 49743, 52993, 53133, 58409, 60747, 61882, 64323, 68611, 73802, 76162, 82348, 82222, 82933, 85238, 86087, 87530, 87921, 106438, 106341, 120663, 117407, 117715, 120917, 119711, 123948, 138704, 233422, 173714, 317842, 317226, 435679, 467003, 1020972, 1582546, 2302966, 2180477, 3088580, 4271820, 4920274, 18033, 21730, 31002, 34172, 38984, 38238, 37415, 43435, 43142, 45943, 44170, 54116, 57494, 57997, 58390, 60395, 59379, 61084, 62069, 63483, 70291, 71115, 74312, 71840, 80388, 79542, 81554, 84516, 85859, 86194, 86969, 96219, 95530, 104008, 100842, 113870, 110367, 114312, 180073, 208990, 323872, 337721, 376144, 406158, 808185, 1690953, 2047787, 2551492, 3512072, 4251266, 4258292, 7892050, 8959820, 14142, 16473, 20570, 23590, 21873, 31143, 34923, 33963, 35279, 33582, 35807, 33740, 37939, 34337, 37611, 39416, 39895, 40335, 39341, 40837, 42980, 43153, 48729, 50097, 51713, 55972, 58329, 59740, 63678, 66831, 67108, 65143, 72097, 71532, 70726, 71864, 74705, 75066, 77474, 80928, 85210, 84532, 86543, 86551, 90985, 93668, 97493, 95511, 101991, 98732, 100465, 102975, 104779, 113189, 114323, 119978, 132064, 135166, 139239, 128725, 216787, 320661, 305952, 335345, 370244, 407929, 412019, 796335, 847050, 920457, 1451409, 1853673, 2469980, 4780662, 6537238, 8364418, 2130, 23973, 21750, 18909, 24262, 30265, 31619, 30812, 30270, 31925, 30764, 31235, 31951, 34814, 35189, 36184, 37024, 36395, 38965, 37931, 40793, 37428, 38289, 43910, 46081, 44888, 47191, 47278, 49453, 51151, 53352, 53458, 54403, 54307, 54310, 57242, 56370, 59851, 58898, 59410, 61473, 63646, 67824, 67549, 70022, 70723, 71771, 72973, 77937, 77613, 79596, 75708, 75155, 80798, 79655, 81207, 82351, 87433, 83744, 88276, 101561, 104563, 103838, 109731, 119780, 120102, 130297, 139809, 148375, 202641, 217894, 208675, 228021, 226874, 254782, 283283, 287322, 290661, 292066, 313542, 316369, 339489, 345950, 381936, 391249, 405422, 464106, 449869, 1112110, 1305797, 2660888, 3259474, 4193400, 5440700, 15310, 22651, 24894, 28650, 26720, 27623, 27521, 30746, 30554, 26493, 31621, 33457, 36022, 34734, 35612, 39842, 39029, 40076, 40072, 38780, 39213, 42915, 42949, 44811, 44015, 45186, 50997, 51732, 51818, 52745, 53876, 57168, 61747, 65086, 67315, 69260, 68280, 66892, 66328, 67570, 69822, 69976, 70468, 71402, 73169, 77921, 81568, 91769, 93791, 93677, 96061, 95305, 97339, 108583, 105211, 112454, 114054, 114474, 122111, 129332, 138090, 172477, 194841, 223777, 246879, 268690, 290218, 286516, 291202, 302955, 360486, 388562, 373152, 375705, 384309, 418239, 473488, 486893, 782867, 860907, 2555958, 5668054, 12752, 17028, 22268, 21910, 24210, 23326, 23488, 27332, 23629, 27459, 25788, 27902, 29895, 31178, 31517, 33016, 32536, 32396, 34091, 33918, 33987, 33404, 35157, 35664, 34941, 37449, 36146, 37588, 36104, 37895, 39017, 39473, 39975, 40751, 39783, 40137, 39926, 39607, 40339, 40364, 40379, 41807, 42326, 43164, 45339, 48340, 50680, 49279, 51636, 53454, 53149, 54864, 54866, 58294, 56452, 57007, 58700, 62793, 60814, 63699, 64806, 66090, 67770, 69765, 70672, 73636, 75069, 74797, 76618, 76542, 78950, 77294, 79988, 80057, 77215, 80790, 80546, 81796, 89087, 91699, 93371, 91983, 103135, 107630, 116409, 116583, 119223, 118926, 118829, 119574, 120906, 136694, 124811, 124621, 150718, 155713, 174997, 184115, 245238, 244504, 250638, 332831, 360845, 410400, 1649430, 1664806, 4964788, 8464364, 8023734, 8026554, 20556, 17159, 24368, 25101, 28850, 29087, 31548, 27518, 29001, 30254, 31676, 31000, 28401, 30708, 33491, 34711, 32993, 32262, 32220, 33342, 34208, 33757, 34919, 34742, 32176, 35671, 36356, 36057, 37030, 37791, 38499, 39203, 39036, 38520, 39299, 39850, 39313, 39511, 40840, 40787, 41144, 42250, 42877, 44427, 44905, 46834, 46464, 48211, 50653, 50565, 51362, 50982, 52649, 52634, 53085, 54988, 54091, 55441, 54272, 59456, 62185, 64224, 66301, 68225, 69771, 71569, 74812, 77889, 80749, 81573, 83713, 86355, 89869, 87909, 92718, 96098, 94849, 100274, 98220, 101516, 103706, 106918, 116329, 116147, 117194, 132386, 126250, 136997, 163612, 171946, 174521, 230231, 236462, 258883, 279249, 293113, 320241, 365830, 376177, 382255, 403353, 419256, 480269, 796314, 856282, 10457128, 1213672, 1206543, 7167686, 7715202, 16205, 16310, 12645, 17029, 21932, 23856, 21969, 17103, 24465, 25040, 26264, 26292, 26426, 29646, 27205, 30283, 31346, 32059, 31043, 33095, 31828, 31572, 34110, 33853, 35487, 34175, 34273, 36926, 36610, 37866, 37990, 38259, 37632, 37656, 37522, 38955, 39031, 39428, 39655, 40438, 41530, 42957, 41929, 42006, 45847, 45789, 46333, 46556, 45679, 48527, 48542, 50763, 52293, 51767, 52315, 52847, 52639, 52141, 55024, 58191, 56096, 58371, 61906, 61931, 64554, 64371, 64827, 66256, 70131, 72735, 73879, 76686, 81686, 81748, 84847, 87682, 86403, 87432, 93284, 93999, 94884, 104714, 102768, 110771, 107286, 114936, 113228, 119733, 122151, 137003, 134154, 146315, 242795, 249893, 265713, 285874, 284880, 325655, 330602, 871896, 983909, 1211956, 1228953, 1504398, 1821478, 1840372, 2002868, 2877104, 6237966, 6929642, 6400166, 6910730, 7658610, 7725626, 9260636, 7801, 16953];
  
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
  
  function applyMoviesPerLine(number) {
	const movieGrids = [grid1, grid2, grid3, grid4];
	for (const grid of movieGrids) {
	console.log('number');
	console.log(number);
	console.log('grid');
	console.log(grid);
	  grid.moviesPerLine = number;
	}  
  }
  
  function clearMovieCards() {
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
  
  function clearMovieGrid4() {
    const movieGrid4 = document.getElementById('movieGrid4');
    const movieCards = movieGrid4.getElementsByClassName('movie-card');
    const movieCardsArray = Array.from(movieCards);
    movieCardsArray.forEach(card => movieGrid4.removeChild(card));
	grid4.currentPage = 0;
    grid4.movies = [];
  }
  
  function calculateMoviesPerLine() {
	const mediaQueryMobile = window.matchMedia("(max-width: 720px)");
    const mediaQueryTablet = window.matchMedia("(min-width: 721px) and (max-width: 1679px)");
    const mediaQueryDesktop = window.matchMedia("(min-width: 1680px)");
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
  
  //let previousWidth = window.innerWidth;
  //window.addEventListener('resize', () => {
  //  const currentWidth = window.innerWidth;
  //  if (currentWidth !== previousWidth) {
  //    previousWidth = currentWidth;
  //    calculateMoviesPerLine();
  //    clearMovieCards()
  //    initializeGrid(grid1);
  //    initializeGrid(grid2);
  //    initializeGrid(grid3);
  //    initializeGrid(grid4);
  //  };
  //});
  
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
  
  async function fetchMovies(genre, nextUrl) {
    const url = nextUrl;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const moviesData = await response.json();
	//console.log(`Fetch url = ${url}`);
	//console.log(`Movies = ${moviesData.results}`);
    return moviesData.results;
  }
  
  async function fetchMovie(id) {
  	const url = 'http://localhost:8000/api/v1/titles/' + id
  	const response = await fetch(url);
  	const movieData = await response.json();
  	return movieData;
  }
  
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
  
  async function checkImage(url, movie_id) {
	const movieIdInt = parseInt(movie_id, 10);
	if (!(unavailablePosters.includes(movieIdInt))) {
      try {
	    //const anti_cors_url = 'https://corsproxy.io/?' + encodeURIComponent(`${url}`);
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
	  return 'default_poster.jpg';
	}
  }
  
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
  
  async function initializeGrid(grid) {
	if (((grid.movies).length) === 0) {
      grid.movies = await fetchMovies(grid.genre, grid.fetchUrl);
	}
    displayMovies(grid);
    document.getElementById(grid.buttonId).addEventListener('click', () => {
      if (grid.currentPage * grid.moviesPerLine + grid.moviesPerLine < grid.movies.length) {
        grid.currentPage++;
      } else {
        grid.currentPage = 0;
      }
      displayMovies(grid);
    });
	//console.log(`Movies = ${(grid.movies).length}`);
	//console.log(`Movies per lines = ${grid.moviesPerLine}`);
  }
  
  async function displayMovies(grid) {
    const movieGrid = document.getElementById(grid.elementId);
	if (grid.currentPage === 0) {
      movieGrid.innerHTML = ''; // Clear the grid only if resetting
	}
	
    const startIndex = grid.currentPage * grid.moviesPerLine;
    const endIndex = Math.min(startIndex + grid.moviesPerLine, grid.movies.length);

    console.log('grid.moviesPerLine');
    console.log(grid.moviesPerLine);
    console.log('startIndex');
    console.log(startIndex);
    console.log('endIndex');
    console.log(endIndex);
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
	
    const loadMoreBtn = document.getElementById(grid.buttonId);
	console.log(`Grid lenght = ${(grid.movies).length}`);
    if (endIndex < grid.movies.length) {
    console.log('toto');
    console.log('endIndex');
        console.log(endIndex);
        console.log('grid.movies.length');
        console.log(grid.movies.length);

      loadMoreBtn.textContent = 'More';
      loadMoreBtn.classList.remove('hidden');
    } else if (grid.currentPage === 0) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.textContent = 'Reset';
    }
  }
  
  function getStarRating(score) {
    // Diviser le score par 2 pour obtenir une échelle de 5 étoiles
    const rating = Math.round(score / 2 * 2) / 2;
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 >= 0.5 ? 1 : 0;
    let emptyStars = 5 - fullStars - halfStar;
  
    return { fullStars, halfStar, emptyStars };
  }
  
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
  
  async function openModal(id) {
    console.log(`Movie ID = ${id}`);
    movie = await fetchMovie(id);
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = ''; // Clear previous content
  
    // Create elements
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
    //const countryCodesList = movie.countries.split(', ');
    const country = fillWithData(movie.countries.join(' / '), 'country');
    const rated_tmp = fillWithData(movie.rated, 'rating');
    const rating_filter = ['Not rated or unkown rating', 'Not rated or unknown rating'];
    let rated;
    if (rating_filter.includes(rated_tmp)) {
      rated = "Not rated"
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
  
    modal = document.getElementById('movieModal')
    modal.style.display = 'block';
    window.addEventListener('click', function(event) {if (event.target == modal) {modal.style.display = 'none';}});
  }
  
  function closeModal() {
    const modal = document.getElementById('movieModal');
    modal.style.display = 'none';
  }
  
  // PAGE INIT
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
  
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('movieModal');
    if (event.target == modal) {
      closeModal();
    }
  });
});