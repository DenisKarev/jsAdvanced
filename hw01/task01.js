'use strict';
// Урок 1. Коллекции и итераторы. Модули
// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать.
//     Каждая итерация должна возвращать следующий альбом из коллекции.
// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator.
//     Каждый альбом имеет следующую структуру:
// {
// title: "Название альбома",
// artist: "Исполнитель",
// year: "Год выпуска"
// }
// • Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате:
//     Название альбома - Исполнитель (Год выпуска)

const musicalCollection = {
    mCollection: [
      { title: 'Название альбома1', artist: 'Исполнитель1', year: '2001' },
      { title: 'Название альбома2', artist: 'Исполнитель2', year: '2002' },
      { title: 'Название альбома3', artist: 'Исполнитель3', year: '2003' },
      { title: 'Название альбома4', artist: 'Исполнитель4', year: '2004' },
    ],
    [Symbol.iterator]: function () {
      let curr = 0;
      const lib = [...this.mCollection];
      return {
        next: () => {
          console.log(this);
          return curr++ < lib.length
            ? {
                done: false,
                value: lib[curr-1]
              }
            : {done: true};
        },
      };
    },
  };
  
  for (const album of musicalCollection) {
    console.log(`Title: ${album.title}, atrist: ${album.title} (${album.year})`);
  }
  