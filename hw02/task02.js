'use strict';
// Урок 2. Продвинутая работа с функциями и классами
// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы,
// но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.
// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером,
// где будут отображаться отзывы.
// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного
// отзыва менее 50 или более 500 символов, функция должна генерировать исключение.
// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.
const initialData = [
  {
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
    product: 'Samsung Galaxy Z Fold 3',
    reviews: [
      {
        id: '3',
        text: 'Интересный дизайн, но дорогой.',
      },
    ],
  },
  {
    product: 'Sony PlayStation 5',
    reviews: [
      {
        id: '4',
        text: 'Люблю играть на PS5, графика на высоте.',
      },
    ],
  },
  {
    product: 'Sony PlayStation 5123123123',
    reviews: [],
  },
];

let revId = 5;

const prodEl = document.querySelector('.products');
// console.dir(prodEl);
for (const item of initialData) {
  const prodItem = document.createElement('h1');
  prodItem.classList.add('product-title');
  prodItem.textContent = item.product;
  prodItem.addEventListener('click', switchHiddenReviews);
  prodEl.append(prodItem);

  if (item.reviews) {
    const revRoot = document.createElement('div');
    revRoot.classList.add('reviews');
    revRoot.textContent = 'Reviews:';
    for (const rev of item.reviews) {
      const revItem = document.createElement('p');
      revItem.classList.add('reviews-item');
      revItem.textContent = `${rev.id}.  ${rev.text}`;
      revRoot.appendChild(revItem);
    }
    const revAddText = document.createElement('input');
    revAddText.type = 'text';
    revAddText.placeholder = 'Add review please';
    revAddText.classList.add('reviews-add-input');
    revRoot.appendChild(revAddText);
    revRoot.innerHTML += '<button class="addreview" onclick="addReview(event);"> add review </button>';
    revRoot.classList.add('hidden');
    prodItem.appendChild(revRoot);
  }
  // console.log(item);
}

function addReview(e) {
  if (e.target?.previousSibling?.value) {
    const review = e.target?.previousSibling?.value;
    if (review.length > 500 || review.length < 50) {
      // console.log('wrong size review ' + review.length);
      throw new Error('wrong review size should be more than 50 chars but less than 500 chars');
    } else {
      // console.log('good size review ' + review.length);
      const revRoot = e.target.closest('.reviews');
      const revRootItem = revRoot.querySelector('.reviews-add-input');
      const revItem = document.createElement('p');
      revItem.classList.add('reviews-item');
      revItem.textContent = `${revId++}.  ${review}`;
      revRootItem.insertAdjacentElement('beforebegin', revItem);
      e.target.previousSibling.value = '';
    }
  }
}

function switchHiddenReviews(e) {
  if (e.target.querySelector('.reviews')) {
    if (e.target.querySelector('.reviews').classList.contains('hidden')) {
      e.target.querySelector('.reviews').classList.remove('hidden');
    } else {
      e.target.querySelector('.reviews').classList.add('hidden');
    }
  }
}

// function reviewAdd(root, review) {
//   const revItem = document.createElement('p');
//   revItem.classList.add('reviews-item');
//   revItem.textContent = `${revId++}.  ${review}`;
//   revRootItem.insertAdjacentElement('afterend', revItem);

// }
