import axios from 'axios';
import Notiflix from 'notiflix';
import { renderPage } from './renderSelectedBooks';
import getRefs from './refs';
const { titleEl, categoryContainerEl } = getRefs();

categoryContainerEl.addEventListener('click', renderCategory);

async function seMore(category) {
  // Notiflix.Loading.pulse('Please hang on...');
  Notiflix.Loading.dots('Please wait');

  try {
    const { data } = await axios.get(
      `https://books-backend.p.goit.global/books/category?category=${category}`
    );
    Notiflix.Loading.remove();
    return data;
  } catch (error) {
    Notiflix.Loading.remove();
    Notiflix.Notify.failure('Something went wrong. Please try again');
    console.log(error);
  }
}

async function renderCategory(e) {
  if (e.target.classList.contains('see-more-btn')) {
    const id = e.target.attributes.id.value;
    const words = id.split(' ');
    lastWord = words[words.length - 1];
    const titleCategory = id.split(' ').slice(0, -1).join(' ');

    titleEl.textContent = titleCategory;
    titleEl.innerHTML += ` <span class="home-bs__title-part">${lastWord}</span>`;
    const data = await seMore(id);

    const categoriesBtn = document.querySelectorAll('.category-btn');
    const activeCategoryBtn = document.querySelector('.active-category');
    for (const btn of categoriesBtn) {
      if (btn.textContent === id) {
        btn.classList.add('active-category');
      }
    }
    activeCategoryBtn.classList.remove('active-category');
    renderPage(data);
  }
}