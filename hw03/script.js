// Урок 3. Промисы. Хранилище

// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах.
// Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:
// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:
// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

'use strict';
// import LS from './ls.js';

let initialData = [
  {
    id: '1',
    product: 'Apple iPhone 13',
    reviews: [
      {
        id: '1',
        text: 'Отличный телефон! Батарея держится долго.',
      },
      {
        id: '2',
        text: 'Камера супер, фото выглядят просто потрясающе.',
      },
    ],
  },
  {
    id: '2',
    product: 'Samsung Galaxy Z Fold 3',
    reviews: [
      {
        id: '3',
        text: 'Интересный дизайн, но дорогой.',
      },
    ],
  },
  {
    id: '3',
    product: 'Sony PlayStation 5',
    reviews: [
      {
        id: '4',
        text: 'Люблю играть на PS5, графика на высоте.',
      },
    ],
  },
  {
    id: '4',
    product: 'Sony PlayStation 5123123123',
    reviews: [],
  },
];
let productId = 5;
let reviewId = 5;

const locSt = new LS();
if (locSt.exist) {
  initialData = locSt.getAllProducts();
  initHtmlView();
} else {
  initHtmlView();
  locSt.saveLocalData(initialData);
}

function initHtmlView() {
  const prodEl = document.querySelector('.products');
  for (const item of initialData) {
    const prodItem = document.createElement('h1');
    prodItem.classList.add('product-title');
    prodItem.setAttribute('data-pid',item.id);
    prodItem.textContent = item.product;
    prodItem.addEventListener('click', switchHiddenReviews);
    prodItem.insertAdjacentHTML(
      'beforeend',
      '<button class="reviews-add-button" onclick="addReview(event);"> add review </button>'
    );
    prodEl.append(prodItem);

    const revRoot = document.createElement('div');

    if (item.reviews?.length) {
      revRoot.classList.add('reviews');
      revRoot.textContent = 'Reviews:';
      for (const rev of item.reviews) {
        const revItem = document.createElement('p');
        const revDelButton = document.createElement('button');
        revItem.classList.add('reviews-item');
        revItem.setAttribute('data-revid',rev.id);
        revItem.textContent = rev.text;
        revDelButton.textContent = 'Delete review';
        revDelButton.classList.add('reviews-del-button');
        revDelButton.addEventListener('click', delReview);
        revItem.insertAdjacentElement('beforeend', revDelButton);
        revRoot.append(revItem);
      }
      // const revAddText = document.createElement('input');
      // revAddText.type = 'text';
      // revAddText.placeholder = 'Add review please';
      // revAddText.classList.add('reviews-add-input');
      // revRoot.append(revAddText);
      // revRoot.innerHTML += '<button class="addreview" onclick="addReview(event);"> add review </button>';
    } else {
      revRoot.classList.add('reviews');
      revRoot.textContent = 'no reviews yet ;((:';
    }
    revRoot.classList.add('hidden');
    prodItem.append(revRoot);
  }
}

function addReview(e) {
  console.log(`product id: ${e.target.closest('.product-title').getAttribute('data-pid')}`);
  locSt.setCurrentProduct(e.target.closest('.product-title').getAttribute('data-pid'));
  location.href = './addreview.html'
}

function switchHiddenReviews(e) {
  const el = e.target.querySelector('.reviews');
  if (el) {
    el.classList.toggle('hidden');
    // if (e.target.querySelector('.reviews').classList.contains('hidden')) {
    //   e.target.querySelector('.reviews').classList.remove('hidden');
    // } else {
    //   e.target.querySelector('.reviews').classList.add('hidden');
    // }
  }
}

function delReview(e) {
  const rid = e.target.closest('.reviews-item').getAttribute('data-revid');
  const pid = e.target.closest('.product-title').getAttribute('data-pid');
  locSt.removeReview(pid, rid);
  const prod = locSt.getProductById(pid);
  // console.log(prod);
  if (!prod.reviews.length) {
    e.target.closest('.reviews').textContent = 'no reviews yet ;((:';
  }
  e.target.closest('p.reviews-item').remove();
}

function addProduct(e) {
  location.href = './addproduct.html';
}

