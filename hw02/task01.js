'use strict';
// Урок 2. Продвинутая работа с функциями и классами
// Задание 1

// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное
// свойство для хранения списка книг, а также методы для добавления книги, удаления книги и
// получения информации о наличии книги.
// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом
// и представляет собой список книг в библиотеке.
// Реализуйте геттер allBooks, который возвращает текущий список книг.
// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким
// названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию.
// Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и
// возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.
// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента.
// Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class Library {
  #books = [];

  get allBooks() {
    if (this.#books) {
      return [...this.#books];
    } else {
      return [];
    }
  }

  addBook(title) {
    if (this.hasBook(title)) {
      throw new Error('Library already has named book!');
    }
    this.#books.push(title);
  }

  removeBook(title) {
    if (this.hasBook(title)) {
      const index = this.#books.indexOf(title);
      const deleted = this.#books.splice(index, 1);
      return deleted;
    } else {
      throw new Error('Given book does not exists in the library!');
    }
  }

  hasBook(title) {
    if (this.#books) {
        return this.#books.indexOf(title) !== -1;
    } else {
        throw new Error('Empty library!')
    }
  }

  constructor(books) {
    if (books) {
      const arr = Array.from(books);
      const set = new Set(arr);
      if (arr.length !== set.size) {
        throw new Error('Given array has duplicate elements!');
      }
      this.#books = [...books];
    } else {
      this.#books = ['Book title1', 'Book title2', 'Book title3', 'Book title4', 'Book title5', 'Book title6'];
    }
  }
}

let lib;
try {
  lib = new Library(['book01', 'book02']);   // to test constructor  !!
                                            // if duplicate book names happens -- library === undefined
                                            // thus code below does not have sense ))) because multiple of errors
//   lib = new Library();
} catch (error) {
  console.log(error.message);
}

try {
  lib.addBook('Book title7');
} catch (error) {
  console.log(error.message);
}

try {
  console.log(lib.removeBook('book01'));
} catch (error) {
  console.log(error.message);
}
const del = lib.hasBook('Book title7');
console.log(`Has book: \t${del}`);

console.log(lib.allBooks);

