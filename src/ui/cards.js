import { getPokemonImage } from '../utilities/utilities.js';
import { showNewPokemonModal } from './modal.js';
import { getPokemonList } from '../api.js';
import { savePageOnStorage, searchPageOnStorage } from '../storage/storage.js';

const returnPokemonCard = (name, id) => {
  const $pokemonCard = document.createElement('article');
  $pokemonCard.className = 'card pokemon-card';
  $pokemonCard.setAttribute('id', id);

  const $pokemonCardImage = document.createElement('img');
  $pokemonCardImage.className = 'card-img-top pokemon-card__image';
  $pokemonCardImage.src = getPokemonImage(id);
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

const $pokemonCardsContainer = document.querySelector(
  '.pokemon-cards-container',
);

export const returnPokemonCards = (arrayPokemon) => {
  const POKEMON_COUNT = 898;

  const $fragment = document.createDocumentFragment();

  for (let i = 0; i < arrayPokemon.length; i += 1) {
    const { name, url } = arrayPokemon[i];
    const id = url.replace('v2', '').replace(/\D/g, '');

    if (id > POKEMON_COUNT) break;

    const $pokemonCard = returnPokemonCard(name, id);
    $fragment.appendChild($pokemonCard);
  }

  return $fragment;
};

export const renderPokemonCards = async (pageNumber = 0, pokemonPerPage = 20) => {
  const resultsCache = searchPageOnStorage(pageNumber, pokemonPerPage);

  if (!resultsCache) {
    const { results } = await getPokemonList(pageNumber, pokemonPerPage);

    savePageOnStorage(pageNumber, pokemonPerPage, results);

    const $pokemonCards = returnPokemonCards(results);

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
