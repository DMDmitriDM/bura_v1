// btn-click.js

import { objImgCards, objImgRuff, objimgOther } from './images.js';

import Cards from './cards-class.js';

// ------------------------------------------------------------ //
// ------------------------------------------------------------ //
// ------------------------------------------------------------ //

// --- variables --- //

let firstGame = true;
let firstParty = true;

// Взятки
let countBribeA = 0;
let countBribeB = 0;

// Борода
let countBeardA = 0;
let countBeardB = 0;

// ------------------------------------------------------------ //

const cards = new Cards();

// ------------------------------------------------------------ //
// ------------------------------------------------------------ //
// ------------------------------------------------------------ //

export function btnsClick() {
  // --- elements blind --- //
  const blind = document.querySelector('.blind');
  const infoBlind = document.querySelector('.blind-info');
  const btnBlind = document.querySelector('.blind-btn');

  // --- elements btn ----- //
  const btnGame = document.getElementById('id-btn-game');
  const btnRotate = document.getElementById('id-btn-rotate');
  const btnOk = document.getElementById('id-btn-ok');
  const btnStep = document.getElementById('id-btn-step');

  // ---- elements ------- //
  const arrElImgHandsA = document.querySelectorAll('.img-hands-a');
  const arrElImgFieldA = document.querySelectorAll('.img-field-a');

  const arrElImgFieldB = document.querySelectorAll('.img-field-b');
  const arrElBoxHandsB = document.querySelectorAll('.box-hands-b');
  const arrElImgHandsB = document.querySelectorAll('.img-hands-b');

  // ---
  const bribeA = document.getElementById('id-bribe-a');
  const beardA = document.getElementById('id-beard-a');
  const pointsA = document.getElementById('id-points-a');

  const imgRuff = document.getElementById('id-img-ruff');
  const countCards = document.getElementById('id-count-cards');

  const bribeB = document.getElementById('id-bribe-b');
  const beardB = document.getElementById('id-beard-b');
  const pointsB = document.getElementById('id-points-b');

  // ---
  const info1 = document.getElementById('id-message-1');
  const info2 = document.getElementById('id-message-2');

  // ------------------------------------------------------------ //

  // Окно с уведомлением кто ходит первым
  async function makeBlind() {
    blind.classList.remove('blind-hide');

    await new Promise((resolve) => {
      btnBlind.addEventListener('click', () => {
        blind.addEventListener(
          'transitionend',
          () => {
            resolve();
          },
          { once: true },
        );

        blind.classList.add('blind-hide');
      });
    });
  }

  // Начать цикл из партий
  btnGame.addEventListener('click', () => {
    btnGame.setAttribute('disabled', '');
    btnRotate.removeAttribute('disabled');

    // Первый раз при загрузке страницы
    if (firstGame) {
      firstGame = false;
    } else {
      // Всё очищать
      countBribeA = 0;
      countBribeB = 0;
      countBeardA = 0;
      countBeardB = 0;

      bribeA.textContent = '0';
      bribeB.textContent = '0';
      beardA.textContent = '0';
      beardB.textContent = '0';
      pointsA.textContent = '0';
      pointsB.textContent = '0';

      countCards.textContent = '36';

      info2.textContent = '';
      info2.classList.add('span-message-hide');
    }

    // Цикл партий - первая партия
    firstParty = true;

    info1.textContent = 'Сдать карты!';
  });

  // ------------------------------------------------------------ //

  // Сдача карт для партии
  btnRotate.addEventListener('click', async () => {
    btnRotate.setAttribute('disabled', '');

    // Если не первая партия
    if (!firstParty) {
      // Очищаем инфу кроме бороды
      countBribeA = 0;
      countBribeB = 0;
      bribeA.textContent = '0';
      bribeB.textContent = '0';
      pointsA.textContent = '0';
      pointsB.textContent = '0';

      info2.textContent = '';
      info2.classList.add('span-message-hide');
    }

    cards.cleareArrPartyCardsAB();
    cards.getCardDeck();
    cards.refuelArrHandsCard();

    refreshHands();

    countCards.textContent = String(cards.countArrCardDeck);
    imgRuff.src = objImgRuff[`ruff${cards.kozir}`];

    info1.textContent = 'Карты розданы!';

    // Если первая партия то определяем кто первым ходит
    if (firstParty) {
      // Начинает игрок:
      cards.playerIsMove = cards.getPlayerIsRotate();

      // for test
      // cards.playerIsMove = 'A';

      infoBlind.textContent = `Жребий выпал на ход игроку ${cards.playerIsMove}`;
      await makeBlind();

      firstParty = false;
    }

    // Здесь проверка на буру, смена playerIsMove и вывод инфы
    executeBura();

    // Ход за игроком А до В
    if (cards.playerIsMove === 'A') {
      cards.playPlayerAFirst();

      refreshHands();
      refreshFields();
    }

    info1.textContent = 'Ваш ход!';

    btnStep.removeAttribute('disabled');
  });

  // ------------------------------------------------------------ //

  // -- btnOk ---
  btnOk.addEventListener('click', () => {
    // console.log('-- btnOk ---');

    // Дополняем карты на руках если есть карты в колоде
    // Если карт в колоде нет то arrHandsA & arrHandsB пустые
    // Массивы карт хода arrFieldsCardA & arrFieldsCardB уже очищены в btnStep "Ваш ход"

    cards.refuelArrHandsCard();
    countCards.textContent = String(cards.countArrCardDeck);

    // Здесь проверка на буру, смена playerIsMove и вывод инфы
    executeBura();

    // arrHandsCardA & arrFieldsCardA могут изменится
    // если Ход за игроком А

    // Ход за игроком А до В
    if (cards.playerIsMove === 'A' && cards.arrHandsCardA.length) {
      cards.playPlayerAFirst();
    }

    refreshHands();
    refreshFields();

    // Карты закончились на руках
    if (!cards.arrHandsCardA.length && !cards.arrHandsCardB.length) {
      btnRotate.removeAttribute('disabled');
      btnOk.setAttribute('disabled', '');
      btnStep.setAttribute('disabled', '');
      info1.textContent = 'Сдать карты!';

      // ---
      // console.log('arrPartyCardsA: ', cards.arrPartyCardsA);
      // console.log('arrPartyCardsB: ', cards.arrPartyCardsB);

      // Очки за партию
      const countPointsA = cards.getCountPoints(cards.arrPartyCardsA);
      pointsA.textContent = String(countPointsA);

      const countPointsB = cards.getCountPoints(cards.arrPartyCardsB);
      pointsB.textContent = String(countPointsB);

      const oldPlayerIsMove = cards.playerIsMove;

      if (countPointsA > countPointsB) {
        cards.playerIsMove = 'A';
      } else if (countPointsA < countPointsB) {
        cards.playerIsMove = 'B';
      } else if (countPointsA === countPointsB && countBribeA > countBribeB) {
        cards.playerIsMove = 'A';
      } else if (countPointsA === countPointsB && countBribeA < countBribeB) {
        cards.playerIsMove = 'B';
      } else {
        cards.playerIsMove = oldPlayerIsMove;
      }

      if (cards.playerIsMove === 'A') {
        countBeardB += 2;
      } else {
        countBeardA += 2;
      }

      beardA.textContent = String(countBeardA);
      beardB.textContent = String(countBeardB);

      // Убираем козырь
      imgRuff.src = objimgOther.otherAr;

      info2.textContent = `Партия за игроком: ${cards.playerIsMove}`;
      info2.classList.remove('span-message-hide');

      // Борода 6
      if (countBeardA === 6 || countBeardB === 6) {
        if (countBeardA === 6) {
          info1.textContent = 'Игрок А козлик!';
        } else {
          info1.textContent = 'Игрок В козлик!';
        }

        btnRotate.setAttribute('disabled', '');
        btnOk.setAttribute('disabled', '');
        btnStep.setAttribute('disabled', '');

        btnGame.removeAttribute('disabled');
      }
    } else {
      // Продолжаем партию - карты на руках есть
      btnOk.setAttribute('disabled', '');
      btnStep.removeAttribute('disabled');
      info1.textContent = 'Ваш ход!';
    }
  });

  // ------------------------------------------------------------ //

  // Ваш ход
  // Если был ход за игроком А, то он уже "сходил" при сдаче карт или по кнопке "OK"
  btnStep.addEventListener('click', () => {
    // Очищаем
    info2.textContent = '';
    info2.classList.add('span-message-hide');

    // ---

    // Игрок В должен выбрать карты для хода
    if (!cards.arrFieldsCardB.length) {
      info1.textContent = 'Не выбрано карт для хода!';
      return false;
    }

    // Ход за игроком В и карты не одной масти
    if (
      cards.playerIsMove === 'B' &&
      !cards.checkCardSuit(cards.arrFieldsCardB)
    ) {
      info1.textContent = 'Выбраны карты не одной масти!';
      return;
    }

    // Ход был за игроком А и кол-во карт не равно
    if (
      cards.playerIsMove === 'A' &&
      cards.arrFieldsCardB.length !== cards.arrFieldsCardA.length
    ) {
      info1.textContent = `Вы должны ходить с ${cards.arrFieldsCardA.length} карт(ы)!`;
      return;
    }

    // Сотрируем по "весу" игрока В
    cards.sortArrCardsByWT(cards.arrFieldsCardB);
    // -
    // console.log('arrFieldsCardB: ', cards.arrFieldsCardB);

    // Удаляем карты хода из массива hands игрока В
    cards.removeArrFromArr(cards.arrFieldsCardB, cards.arrHandsCardB);

    // ---

    // Ход игрока А после В
    if (cards.playerIsMove === 'B') {
      cards.playPlayerASecond();
    }

    // ---

    refreshHands();
    refreshFields();

    // Определяем победителя, меняем кто ходит первым и выводим информацию
    cards.playerIsMove = cards.getPlayerIsWin();
    info1.textContent = `Взятка за игроком ${cards.playerIsMove}!`;

    // Изменяем массивы взятых карт по всем ходам в партии
    // Изменяем кол-во взяток за партию
    if (cards.playerIsMove === 'A') {
      cards.arrPartyCardsA.push(...cards.arrFieldsCardA);
      cards.arrPartyCardsA.push(...cards.arrFieldsCardB);
      countBribeA += 1;
      bribeA.textContent = String(countBribeA);
    } else {
      cards.arrPartyCardsB.push(...cards.arrFieldsCardA);
      cards.arrPartyCardsB.push(...cards.arrFieldsCardB);
      countBribeB += 1;
      bribeB.textContent = String(countBribeB);
    }

    // ---

    // Очищаем массивы выбранных карт для хода
    cards.cleareArrFieldsCardAB();

    btnStep.setAttribute('disabled', '');
    btnOk.removeAttribute('disabled');
  });

  // ------------------------------------------------------------ //

  // Клик по карте игроком В
  for (let i = 0; i < 4; i++) {
    arrElBoxHandsB[i].addEventListener('click', () => {
      if (btnStep.disabled) {
        return;
      }

      // Если i входит в arrHandsCardB
      if (i < cards.arrHandsCardB.length) {
        arrElBoxHandsB[i].classList.toggle('wrap-card-field-check');

        // Добавляем или удаляем карту из arrFieldsCardB
        const index = cards.arrFieldsCardB.indexOf(cards.arrHandsCardB[i]);
        if (index === -1) {
          cards.arrFieldsCardB.push(cards.arrHandsCardB[i]);
        } else {
          cards.arrFieldsCardB.splice(index, 1);
        }

        info1.textContent = 'Ваш ход!';
      }

      // ---
      // console.log('click arrFieldsCardB: ', cards.arrFieldsCardB);
    });
  }

  // ------------------------------------------------------------ //
  // ------------------------------------------------------------ //
  // ------------------------------------------------------------ //

  function refreshHands() {
    for (let i = 0; i < 4; i++) {
      // на руках кол-во карт для вывода на img
      if (i < cards.arrHandsCardA.length) {
        // arrElImgHandsA[i].src = objImgCards[`card${cards.arrHandsCardA[i]}`];
        // Скроем карты игрока В
        arrElImgHandsA[i].src = objimgOther.otherAs;
      } else {
        arrElImgHandsA[i].src = objimgOther.otherAf;
      }

      if (i < cards.arrHandsCardB.length) {
        arrElImgHandsB[i].src = objImgCards[`card${cards.arrHandsCardB[i]}`];
      } else {
        arrElImgHandsB[i].src = objimgOther.otherAf;
      }

      // Убираем обводку выбранных карт
      arrElBoxHandsB[i].classList.remove('wrap-card-field-check');
    }
  }

  function refreshFields() {
    for (let i = 0; i < 4; i++) {
      // кол-во карт для вывода на img
      if (i < cards.arrFieldsCardA.length) {
        arrElImgFieldA[i].src = objImgCards[`card${cards.arrFieldsCardA[i]}`];
      } else {
        arrElImgFieldA[i].src = objimgOther.otherAf;
      }

      if (i < cards.arrFieldsCardB.length) {
        arrElImgFieldB[i].src = objImgCards[`card${cards.arrFieldsCardB[i]}`];
      } else {
        arrElImgFieldB[i].src = objimgOther.otherAf;
      }
    }
  }

  // ---

  function executeBura() {
    const playABura = cards.testBura(cards.arrHandsCardA);
    const playBBura = cards.testBura(cards.arrHandsCardB);
    // ---
    // console.log('playABura: ', playABura);
    // console.log('playBBura: ', playBBura);

    // for test
    // const playABura = true;

    if (playABura && playBBura) {
      info2.textContent = `Бура! Ход за ироком ${cards.playerIsMove} не изменился`;
      info2.classList.remove('span-message-hide');
    } else if (playABura) {
      if (cards.playerIsMove === 'A') {
        info2.textContent = `Бура! Ход за ироком ${cards.playerIsMove} не изменился`;
      } else {
        cards.playerIsMove = 'A';
        info2.textContent = `Бура! Ход перешёл к ироку ${cards.playerIsMove}`;
      }

      info2.classList.remove('span-message-hide');
    } else if (playBBura) {
      if (cards.playerIsMove === 'B') {
        info2.textContent = `Бура! Ход за ироком ${cards.playerIsMove} не изменился`;
      } else {
        cards.playerIsMove = 'B';
        info2.textContent = `Бура! Ход перешёл к ироку ${cards.playerIsMove}`;
      }

      info2.classList.remove('span-message-hide');
    }
  }
}
