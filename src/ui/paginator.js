import {
  activeElement,
  desactiveElement,
  disableElement,
  undisableElement,
} from '../utilities/utilities.js';
import { deletePokemonCards, renderPokemonCards } from './cards.js';

const returnNavigationOption = (textContent) => {
  const $pageOption = document.createElement('li');
  $pageOption.className = 'page-item page-navigation-option';
  $pageOption.setAttribute('id', `button-${textContent}`);

  if (textContent === 'Previous') {
    $pageOption.classList.add('disabled');
  }

  if (typeof textContent === 'number') {
    $pageOption.classList.add('option');

    if (textContent === 1) {
      $pageOption.classList.add('active');
    }
  }

  const $pageLinkOption = document.createElement('a');
  $pageLinkOption.className = 'page-link';

  $pageLinkOption.textContent = textContent;

  $pageOption.appendChild($pageLinkOption);

  return $pageOption;
};

const handlePaginationState = (button) => {
  if (button.textContent === 'Previous') {
    const activeButton = document.querySelector('.active');
    desactiveElement(activeButton);
    activeElement(activeButton.previousSibling);
  } else if (!Number.isNaN(Number(button.textContent))) {
    const activeButton = document.querySelector('.active');
    desactiveElement(activeButton);

    if (button.className === 'page-link') {
      activeElement(button.parentElement);
    } else {
      activeElement(button);
    }
  } else if (button.textContent === 'Next') {
    const activeButton = document.querySelector('.active');

    desactiveElement(activeButton);

    activeElement(activeButton.nextSibling);
  }

  const $previousButton = document.querySelector('#button-Previous');
  const $nextButton = document.querySelector('#button-Next');
  const activeButton = document.querySelector('.active');

  if (activeButton.id === 'button-1') {
    disableElement($previousButton);
  } else if ($previousButton.classList.contains('disabled')) {
    undisableElement($previousButton);
  }

  if (activeButton.id === 'button-45') {
    disableElement($nextButton);
  } else if ($nextButton.classList.contains('disabled')) {
    undisableElement($nextButton);
  }
};

const handlePaginationButtonRequest = () => {
  const activeButton = document.querySelector('.active');

  const numberIdActiveButton = Number(activeButton.id.replace('button-', ''));
  // The API starts from page zero, the pagination from page 1
  const pageIndex = numberIdActiveButton - 1;

  deletePokemonCards();
  renderPokemonCards(pageIndex);
};

const handlePaginationClick = (button) => {
  if (
    button.classList.contains('disabled')
        || button.classList.contains('active')
  ) {
    return;
  }

  handlePaginationState(button);
  handlePaginationButtonRequest();
};

export const returnPageNavigationOptions = () => {
  const POKEMON_COUNT = 898;
  const POKEMON_PER_PAGE = 20;
  const PAGE_AMOUNT = Math.ceil(POKEMON_COUNT / POKEMON_PER_PAGE);

  const $fragment = document.createDocumentFragment();

  const $pagePreviousOption = returnNavigationOption('Previous');
  $fragment.appendChild($pagePreviousOption);

  for (let i = 1; i <= PAGE_AMOUNT; i += 1) {
    const $pageOption = returnNavigationOption(i);
    $fragment.appendChild($pageOption);
  }

  const $pageNextOption = returnNavigationOption('Next');
  $fragment.appendChild($pageNextOption);

  return $fragment;
};

export const initPagination = () => {
  const $pagination = document.querySelector('#pagination');

  const $paginationOptions = returnPageNavigationOptions();

  $pagination.appendChild($paginationOptions);

  $pagination.onclick = ({ target }) => {
    handlePaginationClick(target);
  };
};
