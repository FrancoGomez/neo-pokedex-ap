import { showNewPokemonModal } from './modal.js';
import { getPokemonList } from '../api.js';
import { savePageOnStorage, searchPageOnStorage } from '../storage/storage.js';
import mapPokemonList from '../mappers/pokemonList.js';

const $pokemonCardsContainer = document.querySelector(
  '.pokemon-cards-container',
);

const returnPokemonCard = (imageURL, name, id) => {
  const $pokemonCard = document.createElement('article');
  $pokemonCard.className = 'card pokemon-card';
  $pokemonCard.setAttribute('id', id);

  const $pokemonCardImage = document.createElement('img');
  $pokemonCardImage.className = 'card-img-top pokemon-card__image';
  $pokemonCardImage.src = imageURL;
  $pokemonCardImage.setAttribute('data-bs-toggle', 'modal');
  $pokemonCardImage.setAttribute('data-bs-target', '#pokemon-modal');

  $pokemonCardImage.setAttribute('alt', name);

  const $pokemonCardBody = document.createElement('div');
  $pokemonCardBody.className = 'card-body bg-primary text-white rounded-bottom pokemon-card__body';

  const $pokemonName = document.createElement('h2');
  $pokemonName.textContent = name;

  const $pokemonId = document.createElement('p');
  $pokemonId.textContent = `#${id.padStart(3, '0')}`;

  $pokemonCardBody.appendChild($pokemonName);
  $pokemonCardBody.appendChild($pokemonId);

  $pokemonCard.appendChild($pokemonCardImage);
  $pokemonCard.appendChild($pokemonCardBody);

  return $pokemonCard;
};

export const returnPokemonCards = ({ count, pokemons }) => {
  const $fragment = document.createDocumentFragment();

  for (let i = 0; i < pokemons.length; i += 1) {
    const { imageURL, name, id } = pokemons[i];

    if (id > count) break;

    const $pokemonCard = returnPokemonCard(imageURL, name, id);
    $fragment.appendChild($pokemonCard);
  }

  return $fragment;
};

export const renderPokemonCards = async (
  pageNumber = 0,
  pokemonPerPage = 20,
) => {
  localStorage.clear();
  const resultsCache = searchPageOnStorage(pageNumber, pokemonPerPage);

  if (!resultsCache) {
    const { count, results } = await getPokemonList(
      pageNumber,
      pokemonPerPage,
    );

    savePageOnStorage(
      pageNumber,
      pokemonPerPage,
      mapPokemonList(count, results),
    );

    const $pokemonCards = returnPokemonCards(
      mapPokemonList(count, results),
    );

    $pokemonCardsContainer.appendChild($pokemonCards);

    return null;
  }

  const $pokemonCards = returnPokemonCards(resultsCache);

  $pokemonCardsContainer.appendChild($pokemonCards);

  return null;
};

export const deletePokemonCards = () => {
  const cardAmount = $pokemonCardsContainer.childElementCount;

  for (let i = cardAmount - 1; i >= 0; i -= 1) {
    $pokemonCardsContainer.children[i].remove();
  }
};

const handlePokemonCardClick = async (target) => {
  if (target.classList.contains('pokemon-card__image')) {
    showNewPokemonModal(target.alt);
  }
};

$pokemonCardsContainer.onclick = (e) => {
  handlePokemonCardClick(e.target);
};
