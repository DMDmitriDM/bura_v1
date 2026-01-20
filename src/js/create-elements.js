// create-elements.js

import { objimgOther } from './images.js';

export default function createElements() {
  // container
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);

  // game-box
  const gameBox = document.createElement('div');
  gameBox.classList.add('game-box');
  container.append(gameBox);

  // ---------------------------------------- //

  // blind
  // -----
  const blind = document.createElement('div');
  blind.classList.add('blind', 'blind-hide');
  gameBox.append(blind);

  const blindWrap = document.createElement('div');
  blindWrap.classList.add('blind-wrap');
  blind.append(blindWrap);

  const blindInfo = document.createElement('span');
  blindInfo.classList.add('blind-info');
  blindInfo.textContent = 'Текст';
  blindWrap.append(blindInfo);

  const blindBtn = document.createElement('button');
  blindBtn.classList.add('blind-btn', 'btn-game', 'btn-reset');
  blindBtn.textContent = 'OK';
  blindWrap.append(blindBtn);

  // ---------------------------------------- //

  // game-box-left
  // -------------
  const gameBoxLeft = document.createElement('div');
  gameBoxLeft.classList.add('game-box-left');
  gameBox.append(gameBoxLeft);

  // --- Play A
  const gameBoxLeftWrapA = document.createElement('div');
  gameBoxLeftWrapA.classList.add('game-box-left-wrap');
  gameBoxLeftWrapA.innerHTML = `<h4 class="title-play-a">Игрок А</h4>
    <div class="wrap-span"><span>Взятки: </span><span id="id-bribe-a">0</span></div>
    <div class="wrap-span"><span>Борода: </span><span id="id-beard-a">0</span></div>
    <div class="wrap-span"><span>Очки: </span><span id="id-points-a">0</span></div>`;
  gameBoxLeft.append(gameBoxLeftWrapA);

  // --- ruff
  const gameBoxLeftWrapRuff = document.createElement('div');
  gameBoxLeftWrapRuff.classList.add('game-box-left-wrap');
  gameBoxLeft.append(gameBoxLeftWrapRuff);

  const spanTitleRuff = document.createElement('span');
  spanTitleRuff.textContent = 'Козырь';
  gameBoxLeftWrapRuff.append(spanTitleRuff);

  const wrapRuffImg = document.createElement('div');
  wrapRuffImg.classList.add('wrap-ruff-img');
  gameBoxLeftWrapRuff.append(wrapRuffImg);

  const ruffImg = document.createElement('img');
  ruffImg.classList.add('ruff-img', 'img-max');
  ruffImg.setAttribute('id', 'id-img-ruff');
  ruffImg.src = objimgOther.otherAr;
  ruffImg.alt = 'Нет';
  wrapRuffImg.append(ruffImg);

  // --- count-cards
  const gameBoxLeftWrapCountCards = document.createElement('div');
  gameBoxLeftWrapCountCards.classList.add('game-box-left-wrap');
  gameBoxLeftWrapCountCards.innerHTML = `<span>В колоде</span>
    <div><span>карт: </span><span id="id-count-cards">36</span></div>`;
  gameBoxLeft.append(gameBoxLeftWrapCountCards);

  // --- Play B
  const gameBoxLeftWrapB = document.createElement('div');
  gameBoxLeftWrapB.classList.add('game-box-left-wrap');
  gameBoxLeftWrapB.innerHTML = `<div class="wrap-span"><span>Взятки: </span><span id="id-bribe-b">0</span></div>
    <div class="wrap-span"><span>Борода: </span><span id="id-beard-b">0</span></div>
    <div class="wrap-span"><span>Очки: </span><span id="id-points-b">0</span></div>
    <h4 class="title-play-b">Игрок В</h4>`;
  gameBoxLeft.append(gameBoxLeftWrapB);

  // ---------------------------------------- //

  // game-box-middle
  // -------------
  const gameBoxMiddle = document.createElement('div');
  gameBoxMiddle.classList.add('game-box-middle');
  gameBox.append(gameBoxMiddle);

  // Игрок А карты на руках
  const middleTopHandsA = document.createElement('div');
  middleTopHandsA.classList.add('middle-top');
  gameBoxMiddle.append(middleTopHandsA);

  for (let i = 0; i < 4; i++) {
    const wrapCard = document.createElement('div');
    wrapCard.classList.add('wrap-card-field', 'box-hands-a');
    wrapCard.setAttribute('id', `id-div-hands-a-${i}`);
    middleTopHandsA.append(wrapCard);

    const imgCards = document.createElement('img');
    imgCards.classList.add('img-max', 'img-hands-a');
    imgCards.setAttribute('id', `id-img-hands-a-${i}`);
    imgCards.src = objimgOther.otherAf;
    imgCards.alt = 'Cover';
    wrapCard.append(imgCards);
  }

  // ---

  // Поле хода
  const middleMiddle = document.createElement('div');
  middleMiddle.classList.add('middle-middle');
  gameBoxMiddle.append(middleMiddle);

  // Игрок А поле хода
  const middleTopFieldA = document.createElement('div');
  middleTopFieldA.classList.add('middle-top');
  middleMiddle.append(middleTopFieldA);

  for (let i = 0; i < 4; i++) {
    const wrapCard = document.createElement('div');
    wrapCard.classList.add('wrap-card-field');
    middleTopFieldA.append(wrapCard);

    const imgCards = document.createElement('img');
    imgCards.classList.add('img-max', 'img-field-a');
    imgCards.setAttribute('id', `id-img-field-a-${i}`);
    imgCards.src = objimgOther.otherAf;
    imgCards.alt = 'Cover';
    wrapCard.append(imgCards);
  }

  // Игрок В поле хода
  const middleBottomFieldB = document.createElement('div');
  middleBottomFieldB.classList.add('middle-bottom');
  middleMiddle.append(middleBottomFieldB);

  for (let i = 0; i < 4; i++) {
    const wrapCard = document.createElement('div');
    wrapCard.classList.add('wrap-card-field');
    middleBottomFieldB.append(wrapCard);

    const imgCards = document.createElement('img');
    imgCards.classList.add('img-max', 'img-field-b');
    imgCards.setAttribute('id', `id-img-field-b-${i}`);
    imgCards.src = objimgOther.otherAf;
    imgCards.alt = 'Cover';
    wrapCard.append(imgCards);
  }

  // ---

  // Игрок В карты на руках
  const middleBottomHandsB = document.createElement('div');
  middleBottomHandsB.classList.add('middle-bottom');
  gameBoxMiddle.append(middleBottomHandsB);

  for (let i = 0; i < 4; i++) {
    const wrapCard = document.createElement('div');
    wrapCard.classList.add('wrap-card-field', 'box-hands-b');
    wrapCard.setAttribute('id', `id-div-hands-b-${i}`);
    middleBottomHandsB.append(wrapCard);

    const imgCards = document.createElement('img');
    imgCards.classList.add('img-max', 'img-hands-b');
    imgCards.setAttribute('id', `id-img-hands-b-${i}`);
    imgCards.src = objimgOther.otherAf;
    imgCards.alt = 'Cover';
    wrapCard.append(imgCards);
  }

  // ---------------------------------------- //

  // game-box-right
  // -------------
  const gameBoxRight = document.createElement('div');
  gameBoxRight.classList.add('game-box-right');
  gameBox.append(gameBoxRight);

  // ---

  // btn-game btn-rotate
  const gameBoxRightWrapTop = document.createElement('div');
  gameBoxRightWrapTop.classList.add('game-box-right-wrap');
  gameBoxRight.append(gameBoxRightWrapTop);

  const btnGame = document.createElement('button');
  btnGame.classList.add('btn-game', 'btn-reset');
  btnGame.setAttribute('id', 'id-btn-game');
  btnGame.innerHTML = `<span class="btn-span">Игра</span>
    <svg class="btn-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"/>
    </svg>`;
  gameBoxRightWrapTop.append(btnGame);

  const btnRotate = document.createElement('button');
  btnRotate.classList.add('btn-game', 'btn-reset');
  btnRotate.setAttribute('id', 'id-btn-rotate');
  btnRotate.setAttribute('disabled', '');
  btnRotate.innerHTML = `<span class="btn-span">Сдача карт</span>
    <svg class="btn-svg" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.1 14.313V5.396L24.158 8.34c-2.33-2.325-5.033-3.503-8.11-3.503C9.902 4.837 4.901 9.847 4.899 16c.001 6.152 5.003 11.158 11.15 11.16 4.276 0 9.369-2.227 10.836-8.478l.028-.122h-3.23l-.022.068c-1.078 3.242-4.138 5.421-7.613 5.421a8 8 0 0 1-5.691-2.359A7.993 7.993 0 0 1 8 16.001c0-4.438 3.611-8.049 8.05-8.049 2.069 0 3.638.58 5.924 2.573l-3.792 3.789H27.1z"/>
    </svg>`;
  gameBoxRightWrapTop.append(btnRotate);

  // span-message-1 span-message-2
  const gameBoxRightWrapMiddle = document.createElement('div');
  gameBoxRightWrapMiddle.classList.add('game-box-right-wrap');
  gameBoxRightWrapMiddle.innerHTML = `<span class="span-message" id="id-message-1">Начать игру!</span>
    <span class="span-message span-message-hide" id="id-message-2">Начать игру!</span>`;
  gameBoxRight.append(gameBoxRightWrapMiddle);

  // btn-ok btn-step
  const gameBoxRightWrapBottom = document.createElement('div');
  gameBoxRightWrapBottom.classList.add('game-box-right-wrap');
  gameBoxRight.append(gameBoxRightWrapBottom);

  const btnOk = document.createElement('button');
  btnOk.classList.add('btn-game', 'btn-reset');
  btnOk.setAttribute('id', 'id-btn-ok');
  btnOk.setAttribute('disabled', '');
  btnOk.innerHTML = `<span class="btn-span">Ок</span>
    <svg class="btn-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2287 6.60355C21.6193 6.99407 21.6193 7.62723 21.2287 8.01776L10.2559 18.9906C9.86788 19.3786 9.23962 19.3814 8.84811 18.9969L2.66257 12.9218C2.26855 12.5349 2.26284 11.9017 2.64983 11.5077L3.35054 10.7942C3.73753 10.4002 4.37067 10.3945 4.7647 10.7815L9.53613 15.4677L19.1074 5.89644C19.4979 5.50592 20.1311 5.50591 20.5216 5.89644L21.2287 6.60355Z"/>
    </svg>`;
  gameBoxRightWrapBottom.append(btnOk);

  const btnStep = document.createElement('button');
  btnStep.classList.add('btn-game', 'btn-reset');
  btnStep.setAttribute('id', 'id-btn-step');
  btnStep.setAttribute('disabled', '');
  btnStep.innerHTML = `<span class="btn-span">Ваш ход</span>
    <svg class="btn-svg" width="24" height="24" viewBox="-5 -4.5 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4.071l-3.95 3.95A1 1 0 0 1 .636 6.607L6.293.95a.997.997 0 0 1 1.414 0l5.657 5.657A1 1 0 0 1 11.95 8.02L8 4.07v9.586a1 1 0 1 1-2 0V4.07z"/>
    </svg>`;
  gameBoxRightWrapBottom.append(btnStep);
}
