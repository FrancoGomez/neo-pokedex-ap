import { getPokemonImage, hideElement, showElement } from '../utilities/utilities.js';
import { getPokemonInfo } from '../api.js';
import { savePokemonOnStorage, searchPokemonOnStorage } from '../storage/storage.js';

export const editPokemonModal = ({
  name, id, weight, height, types,
}) => {
  const $namePokemonModal = document.querySelector(
    '#pokemon-modal__pokemon-name',
  );
  const $imagePokemonModal = document.querySelector(
    '#pokemon-modal__pokemon-image',
  );
  const $weightPokemonModal = document.querySelector(
    '#pokemon-modal__pokemon-weight',
  );
  const $heightPokemonModal = document.querySelector(
    '#pokemon-modal__pokemon-height',
  );
  const $typesPokemonModal = document.querySelector(
    '#pokemon-modal__pokemon-types',
  );

  $namePokemonModal.textContent = `${name} #${id
    .toString()
    .padStart(3, '0')}`;
  $imagePokemonModal.src = getPokemonImage(id);
  $weightPokemonModal.textContent = `Weight: ${weight / 10}kg`;
  $heightPokemonModal.textContent = `Height: ${height / 10}m`;
  $typesPokemonModal.textContent = 'Type: ';

  if (types.length > 1) {
    $typesPokemonModal.textContent = 'Types: ';
  }

  types.forEach((type, index) => {
    if (index !== 0) {
      $typesPokemonModal.textContent += ', ';
    }
    $typesPokemonModal.textContent += type.type.name;
  });
};

const $pokemonModal = document.querySelector('#pokemon-modal');

export const showErrorPokemonNotFound = () => {
  const $modalTitle = document.querySelector('#pokemon-modal__pokemon-name');
  const $alertLoading = document.querySelector('#alert-loading');
  const $alertNotFound = document.querySelector('#alert-pokemon-not-found');

  $modalTitle.textContent = 'Error 404';
  hideElement($alertLoading);
  showElement($alertNotFound);
};

export const showNewPokemonModal = async (pokemonId) => {
  const $cardPokemonModal = document.querySelector('#pokemon-modal__card');
  const $alertLoading = document.querySelector('#alert-loading');

  const pokemonInfoCache = searchPokemonOnStorage(pokemonId);

  if (!pokemonInfoCache) {
    const pokemonInfo = await getPokemonInfo(pokemonId);

    if (!pokemonInfo) return showErrorPokemonNotFound();

    savePokemonOnStorage(pokemonId, pokemonInfo);

    editPokemonModal(pokemonInfo);
    showElement($cardPokemonModal);
    hideElement($alertLoading);
  }

  editPokemonModal(pokemonInfoCache);
  showElement($cardPokemonModal);
  hideElement($alertLoading);

  return null;
};

export const resetModalState = () => {
  const $modalTitle = document.querySelector('#pokemon-modal__pokemon-name');
  const $alertLoading = document.querySelector('#alert-loading');
  const $alertNotFound = document.querySelector('#alert-pokemon-not-found');
  const $cardPokemonModal = document.querySelector('#pokemon-modal__card');

  $modalTitle.textContent = 'Loading...';
  showElement($alertLoading);
  hideElement($alertNotFound);
  hideElement($cardPokemonModal);
};

$pokemonModal.addEventListener('hidden.bs.modal', () => {
  resetModalState();
});
