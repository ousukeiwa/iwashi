const emojis = ['🍎', '🍎', '🍇', '🍇', '🍉', '🍉', '🍌', '🍌', '🍓', '🍓', '🍒', '🍒'];
let firstCard = null; // 1枚目にめくったカード
let secondCard = null; // 2枚目にめくったカード
let lockBoard = false; // 判定中にクリックできないようにする鍵
let matchedCount = 0; // 揃ったペアの数

const board = document.getElementById('game-board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');

// ゲームを初期化してスタートする関数
function initGame() {
  board.innerHTML = '';
  message.textContent = '';
  restartBtn.style.display = 'none';
  matchedCount = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // カードをシャッフル（混ぜる）
  const shuffledEmojis = emojis.sort(() => 0.5 - Math.random());

  // カードを画面に配置
  shuffledEmojis.forEach(emoji => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.emoji = emoji; // 裏側に絵文字のデータを隠し持つ
    cardElement.textContent = emoji;
    
    // クリックした時の処理を追加
    cardElement.addEventListener('click', flipCard);
    board.appendChild(cardElement);
  });
}

// カードをめくる処理
function flipCard() {
  // すでにめくられているカードや、判定中はクリック無効
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains('matched')) return;

  // カードを表にする
  this.classList.add('open');

  // 1枚目の場合
  if (!firstCard) {
    firstCard = this;
    return;
  }

  // 2枚目の場合
  secondCard = this;
  checkForMatch();
}

// 絵柄が揃ったかチェックする処理
function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    // 揃った場合
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCount += 2;
    resetCards();

    // 全部揃ったらクリア！
    if (matchedCount === emojis.length) {
      message.textContent = '🎉 全問正解！クリア！ 🎉';
      restartBtn.style.display = 'inline-block';
    }
  } else {
    // 外れた場合（1秒後に裏返す）
    lockBoard = true; // 裏返るまで他のカードを触れなくする
    setTimeout(() => {
      firstCard.classList.remove('open');
      secondCard.classList.remove('open');
      resetCards();
    }, 1000);
  }
}

// 記憶をリセットして次のターンへ
function resetCards() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// ページが開かれたらゲームスタート！
initGame();