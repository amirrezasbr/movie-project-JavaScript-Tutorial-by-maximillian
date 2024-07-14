const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backDrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const updateUi = () => {
  if ((movies.length = 0)) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};
const cancelMovieDeletion = () => {
  toggleBackDrop();
  deleteMovieModal.classList.remove("visible");
};
const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
};
const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackDrop();
  const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
  const submitDeletionButton = deleteMovieModal.querySelector(".btn--danger");
  cancelDeletionButton.addEventListener("click", cancelMovieDeletion);
  submitDeletionButton.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
};
const renderMovieElement = (title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `<div class='movie-element__image'>
  <img src="${imageUrl} alt='${title}'">
    </div>
    <div class='movie-info'>
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
    </div>
    `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};
const clearMovieInput = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("please enter valid value enter between 1 and 5");
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  clearMovieInput();
  toggleBackDrop();
  updateUi();
  renderMovieElement(newMovie.title, newMovie.image, newMovie.rating);
};
const toggleBackDrop = () => {
  backDrop.classList.remove("visible");
};
const closeMovieModal = () => {
  addMovieModal.classList.toggle("visible");
};
const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackDrop();
};
const cancelAddMovie = () => {
  closeMovieModal();
  clearMovieInput();
  // toggleBackDrop();
};
const backDropHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
};
startAddMovieButton.addEventListener("click", showMovieModal);
backDrop.addEventListener("click", backDropHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovie);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
