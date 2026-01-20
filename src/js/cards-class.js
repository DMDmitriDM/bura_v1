// card-class.js

export default class Cards {
  // Массив с именами карт
  arrCardsName;
  // Колода карт
  arrCardDeck;
  // Кол-во карт в колоде
  countArrCardDeck;
  // Козырь
  kozir;
  // Массивы карт на руках у игроков А и В
  arrHandsCardA;
  arrHandsCardB;
  // Массивы карт игроков для хода
  arrFieldsCardA;
  arrFieldsCardB;
  // Массивы взятых карт по всем ходам в партии
  arrPartyCardsA;
  arrPartyCardsB;

  // Кто ходит
  playerIsMove;

  // Конструктор
  constructor() {
    this.arrCardsName = [
      '6b',
      '6h',
      '6k',
      '6p',
      '7b',
      '7h',
      '7k',
      '7p',
      '8b',
      '8h',
      '8k',
      '8p',
      '9b',
      '9h',
      '9k',
      '9p',
      '10b',
      '10h',
      '10k',
      '10p',
      'Vb',
      'Vh',
      'Vk',
      'Vp',
      'Db',
      'Dh',
      'Dk',
      'Dp',
      'Kb',
      'Kh',
      'Kk',
      'Kp',
      'Tb',
      'Th',
      'Tk',
      'Tp',
    ];

    this.arrHandsCardA = [];
    this.arrHandsCardB = [];

    this.arrFieldsCardA = [];
    this.arrFieldsCardB = [];

    this.arrPartyCardsA = [];
    this.arrPartyCardsB = [];
  }

  // ------------------------------------------------------------ //
  // ------------------------ utils ----------------------------- //
  // ------------------------------------------------------------ //

  // Тасование карт
  mixArray(arr) {
    const count = arr.length;
    for (let i = 0; i < count; i++) {
      // случайный индекс от 0 до count
      const x = Math.floor(Math.random() * count);
      let temp = arr[i];
      arr[i] = arr[x];
      arr[x] = temp;
    }
  }

  getPlayerIsRotate() {
    // случайный индекс от 0 до 2
    const x = Math.floor(Math.random() * 2);
    // -
    // console.log('случайный индекс от 0 до 2: ', x);

    return !x ? 'A' : 'B';
  }

  // Определяем вес карты для взяток и сортировки
  getWTCard(card) {
    let wt;

    if (card === '6b' || card === '6h' || card === '6k' || card === '6p') {
      wt = 1;
    } else if (
      card === '7b' ||
      card === '7h' ||
      card === '7k' ||
      card === '7p'
    ) {
      wt = 2;
    } else if (
      card === '8b' ||
      card === '8h' ||
      card === '8k' ||
      card === '8p'
    ) {
      wt = 3;
    } else if (
      card === '9b' ||
      card === '9h' ||
      card === '9k' ||
      card === '9p'
    ) {
      wt = 4;
    } else if (
      card === 'Vb' ||
      card === 'Vh' ||
      card === 'Vk' ||
      card === 'Vp'
    ) {
      wt = 5;
    } else if (
      card === 'Db' ||
      card === 'Dh' ||
      card === 'Dk' ||
      card === 'Dp'
    ) {
      wt = 6;
    } else if (
      card === 'Kb' ||
      card === 'Kh' ||
      card === 'Kk' ||
      card === 'Kp'
    ) {
      wt = 7;
    } else if (
      card === '10b' ||
      card === '10h' ||
      card === '10k' ||
      card === '10p'
    ) {
      wt = 8;
    } else if (
      card === 'Tb' ||
      card === 'Th' ||
      card === 'Tk' ||
      card === 'Tp'
    ) {
      wt = 9;
    }

    if (card[card.length - 1] === this.kozir.toLowerCase()) {
      wt += 10;
    }

    return wt;
  }

  // Сортировка карт по весу
  sortArrCardsByWT(arr) {
    arr.sort((a, b) => {
      return this.getWTCard(b) - this.getWTCard(a);
    });
  }

  // Получить масть карты
  getCardSuit(str) {
    return str.slice(str.length - 1);
  }

  // Проверка на масть выбранных карт для хода и для буры
  // return true - все карты одной масти
  checkCardSuit(arrCard) {
    for (let i = 0; i < arrCard.length - 1; i++) {
      if (this.getCardSuit(arrCard[i]) !== this.getCardSuit(arrCard[i + 1])) {
        return false;
      }
    }

    return true;
  }

  // Проверка на Буру
  // return true - карт 4 и все одной масти
  testBura(arrCard) {
    return arrCard.length === 4 && this.checkCardSuit(arrCard);
  }

  // Очки за карту
  getOneCardPoints(card) {
    if (card === 'Vb' || card === 'Vh' || card === 'Vk' || card === 'Vp') {
      return 2;
    } else if (
      card === 'Db' ||
      card === 'Dh' ||
      card === 'Dk' ||
      card === 'Dp'
    ) {
      return 3;
    } else if (
      card === 'Kb' ||
      card === 'Kh' ||
      card === 'Kk' ||
      card === 'Kp'
    ) {
      return 4;
    } else if (
      card === '10b' ||
      card === '10h' ||
      card === '10k' ||
      card === '10p'
    ) {
      return 10;
    } else if (
      card === 'Tb' ||
      card === 'Th' ||
      card === 'Tk' ||
      card === 'Tp'
    ) {
      return 11;
    } else {
      return 0;
    }
  }

  // Очки за массив карт
  getCountPoints(arrCards) {
    let count = 0;

    for (let i = 0; i < arrCards.length; i++) {
      count += this.getOneCardPoints(arrCards[i]);
    }

    return count;
  }

  // Удалить элименты массива из другого массива
  removeArrFromArr(removeArr, fromArr) {
    for (let i = 0; i < removeArr.length; i++) {
      const index = fromArr.indexOf(removeArr[i]);
      if (index !== -1) {
        fromArr.splice(index, 1);
      }
    }
  }

  // Очистить массивы карт хода игроков А и В
  cleareArrFieldsCardAB() {
    this.arrFieldsCardA.length = 0;
    this.arrFieldsCardB.length = 0;
  }

  // Очистить массивы взятых карт
  cleareArrPartyCardsAB() {
    this.arrPartyCardsA.length = 0;
    this.arrPartyCardsB.length = 0;
  }

  // ------------------------------------------------------------ //
  // ------------------------ function -------------------------- //
  // ------------------------------------------------------------ //

  // Тасуем карты и определяем козыря
  getCardDeck() {
    this.arrCardDeck = [...this.arrCardsName];
    this.countArrCardDeck = this.arrCardDeck.length;

    this.mixArray(this.arrCardDeck);
    // ---
    // console.log(this.arrCardDeck);

    this.kozir = this.arrCardDeck[this.arrCardDeck.length - 1];
    this.kozir = this.kozir[this.kozir.length - 1].toUpperCase();
    // ---
    // console.log(this.kozir);
  }

  // Добавляем на руки карты из колоды
  refuelArrHandsCard() {
    // Вычисляем кол-во карт которые можно добавить на руки
    let addCount = 4;
    addCount -= this.arrHandsCardA.length;

    // Но не болше чем осталось в колоде
    while (this.countArrCardDeck - addCount * 2 < 0) {
      addCount -= 1;
    }

    // Наполняем масивы "На руках"
    this.arrHandsCardA.push(...this.arrCardDeck.splice(0, addCount));
    this.arrHandsCardB.push(...this.arrCardDeck.splice(0, addCount));

    // Осталось в колоде
    this.countArrCardDeck -= addCount * 2;

    // Сортируем

    this.arrHandsCardA.sort((a, b) => {
      return this.getWTCard(b) - this.getWTCard(a);
    });

    this.arrHandsCardB.sort((a, b) => {
      return this.getWTCard(b) - this.getWTCard(a);
    });

    // console.log('---');
    // console.log(addCount);
    // console.log(this.arrHandsCardA);
    // console.log(this.arrHandsCardB);
    // console.log(this.arrCardDeck);
    // console.log(this.countArrCardDeck);
  }

  // ------------------------------------------------------------ //

  // Определить победителя взятки
  getPlayerIsWin() {
    // Если ход за игроком А, то карты игрока В
    // для взятки должны быть не меньше по весу с учётом козыря
    // если хотя бы одна карта меньше или не той масти - взятка за А
    if (this.playerIsMove === 'A') {
      for (let i = 0; i < this.arrFieldsCardB.length; i++) {
        // kozir
        if (
          this.getCardSuit(this.arrFieldsCardB[i]) === this.kozir.toLowerCase()
        ) {
          if (
            this.getWTCard(this.arrFieldsCardB[i]) <
            this.getWTCard(this.arrFieldsCardA[i])
          ) {
            return 'A';
          }
        } else if (
          this.getCardSuit(this.arrFieldsCardB[i]) ===
          this.getCardSuit(this.arrFieldsCardA[i])
        ) {
          if (
            this.getWTCard(this.arrFieldsCardB[i]) <
            this.getWTCard(this.arrFieldsCardA[i])
          ) {
            return 'A';
          }
        } else {
          return 'A';
        }
      }

      return 'B';
    } else {
      // Если ход за игроком В, то карты игрока А
      // для взятки должны быть не меньше по весу с учётом козыря
      // если хотя бы одна карта меньше или не той масти - взятка за В
      for (let i = 0; i < this.arrFieldsCardA.length; i++) {
        // kozir
        if (
          this.getCardSuit(this.arrFieldsCardA[i]) === this.kozir.toLowerCase()
        ) {
          if (
            this.getWTCard(this.arrFieldsCardA[i]) <
            this.getWTCard(this.arrFieldsCardB[i])
          ) {
            return 'B';
          }
        } else if (
          this.getCardSuit(this.arrFieldsCardA[i]) ===
          this.getCardSuit(this.arrFieldsCardB[i])
        ) {
          if (
            this.getWTCard(this.arrFieldsCardA[i]) <
            this.getWTCard(this.arrFieldsCardB[i])
          ) {
            return 'B';
          }
        } else {
          return 'B';
        }
      }

      return 'A';
    }
  }

  // ------------------------------------------------------------ //

  // Компьютер за игрока А ход за игроком А
  playForAplayerIsMoveA() {
    let arrCardA = [];

    const objSuitArr = {
      b: [],
      h: [],
      k: [],
      p: [],
    };

    for (let i = 0; i < this.arrHandsCardA.length; i++) {
      const suit = this.getCardSuit(this.arrHandsCardA[i]);
      objSuitArr[suit].push(this.arrHandsCardA[i]);
    }

    // Если есть 4 карты одинаковой масти будем ходить с них
    const values = Object.values(objSuitArr);

    for (let i = 0; i < values.length; i++) {
      if (values[i].length === 4) {
        arrCardA = values[i];
        break;
      }
    }

    if (arrCardA.length) {
      return arrCardA;
    }

    // Если есть 3 карты одинаковой масти будем ходить с них
    for (let i = 0; i < values.length; i++) {
      if (values[i].length === 3) {
        arrCardA = values[i];
        break;
      }
    }

    if (arrCardA.length) {
      return arrCardA;
    }

    // Если есть 2 карты одинаковой масти
    // Их может быть 2 пары
    const arrTwo = [];

    for (let i = 0; i < values.length; i++) {
      if (values[i].length === 2) {
        arrTwo.push(values[i]);
      }
    }

    // Всего одна пара
    if (arrTwo.length === 1) {
      return arrTwo[0];
    }

    // 2 пары
    if (arrTwo.length === 2) {
      // Определим "вес" кождой пары
      const arrWT0 =
        this.getWTCard(arrTwo[0][0]) + this.getWTCard(arrTwo[0][1]);
      const arrWT1 =
        this.getWTCard(arrTwo[1][0]) + this.getWTCard(arrTwo[1][1]);

      if (arrWT0 >= arrWT1) {
        return arrTwo[0];
      } else {
        return arrTwo[1];
      }
    }

    // Все карты разной масти
    arrCardA.push(this.arrHandsCardA[this.arrHandsCardA.length - 1]);

    return arrCardA;
  }

  playPlayerAFirst() {
    // Получаем массив хода игрока А для поля хода
    this.arrFieldsCardA.push(...this.playForAplayerIsMoveA());
    // -
    // console.log('arrFieldsCardA: ', this.arrFieldsCardA);

    // Удаляем карты хода из массива hands игрока А
    this.removeArrFromArr(this.arrFieldsCardA, this.arrHandsCardA);
  }

  // ------------------------------------------------------------ //

  // Компьютер за игрока А ход за игроком В
  // Игрок В сходил картами arrFieldsCardB их надо "перебить"
  playForAplayerIsMoveB() {
    const suit = this.getCardSuit(this.arrFieldsCardB[0]);
    const nowKozir = this.kozir.toLowerCase();

    const arrCardA = [];

    if (suit === nowKozir) {
      // console.log('Игрок В зашёл с козырей!');

      for (let i = 0; i < this.arrFieldsCardB.length; i++) {
        for (let j = this.arrHandsCardA.length - 1; j >= 0; j--) {
          if (
            this.getWTCard(this.arrHandsCardA[j]) >
            this.getWTCard(this.arrFieldsCardB[i])
          ) {
            // Уже есть
            if (arrCardA.indexOf(this.arrHandsCardA[j]) !== -1) {
              continue;
            }
            arrCardA.push(this.arrHandsCardA[j]);
            // Эту бъём выходим
            break;
          }
        }
      }
    } else {
      // console.log('Игрок В зашёл не с козырей!');

      for (let i = 0; i < this.arrFieldsCardB.length; i++) {
        for (let j = this.arrHandsCardA.length - 1; j >= 0; j--) {
          // Карта должна соответствовать масти или козырю
          if (
            this.getCardSuit(this.arrHandsCardA[j]) !== suit &&
            this.getCardSuit(this.arrHandsCardA[j]) !== nowKozir
          ) {
            continue;
          }

          if (
            this.getWTCard(this.arrHandsCardA[j]) >
            this.getWTCard(this.arrFieldsCardB[i])
          ) {
            // Уже есть
            if (arrCardA.indexOf(this.arrHandsCardA[j]) !== -1) {
              continue;
            }
            arrCardA.push(this.arrHandsCardA[j]);
            // Эту бъём выходим
            break;
          }
        }
      }
    }

    // Взятка возможна!
    if (arrCardA.length === this.arrFieldsCardB.length) {
      return arrCardA;
    } else {
      // Взятка не возможна!
      const arrXCardA = this.arrHandsCardA.slice(
        this.arrHandsCardA.length - this.arrFieldsCardB.length,
      );
      return arrXCardA;
    }
  }

  playPlayerASecond() {
    // Получаем массив хода игрока А для поля хода
    this.arrFieldsCardA.push(...this.playForAplayerIsMoveB());

    // Сотрируем по "весу" игрока А / в принципе не нужно
    this.sortArrCardsByWT(this.arrFieldsCardA);
    // -
    // console.log('arrFieldsCardA: ', this.arrFieldsCardA);

    // Удаляем карты хода из массива hands игрока А
    this.removeArrFromArr(this.arrFieldsCardA, this.arrHandsCardA);
  }
}
