// script.js

// キャンバスの取得
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ゲームの状態変数
let score = 0;
let isGameOver = false;

// 自機の設定
const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    color: '#00f0ff',
    speed: 5
};

// 弾と敵の管理配列
let bullets = [];
let enemies = [];

// キー入力の監視
let keys = {};
document.addEventListener('keydown', (e) => {
    // ゲームオーバー時にスペースキーでリスタート
    if (isGameOver && e.code === 'Space') {
        resetGame();
        return;
    }
    keys[e.code] = true;
});
document.addEventListener('keyup', (e) => keys[e.code] = false);

// ■ ゲームのリセット（再スタート）処理
function resetGame() {
    score = 0;
    isGameOver = false;
    bullets = [];
    enemies = [];
    player.x = canvas.width / 2 - 15;
    player.y = canvas.height - 50;
    
    // スコア表示もリセット
    document.getElementById('score').innerText = score;
    
    // ゲームループ再開
    gameLoop();
}

// ■ 1. 自機の描画
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// ■ 2. 自機の移動
function updatePlayer() {
    if (isGameOver) return; // ゲームオーバー中は動かせない

    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
    // スペースキーで弾発射
    if (keys['Space']) {
        shootBullet();
        keys['Space'] = false; // 連射防止
    }
}

// ■ 3. 弾の生成と移動
function shootBullet() {
    bullets.push({
        x: player.x + player.width / 2 - 2.5,
        y: player.y,
        width: 5,
        height: 10,
        color: '#ff0',
        speed: 7
    });
}

function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        if (bullet.y < 0) bullets.splice(index, 1);
    });
}

// ■ 4. 敵の生成と移動
function spawnEnemy() {
    if (Math.random() < 0.02) { 
        enemies.push({
            x: Math.random() * (canvas.width - 30),
            y: 0,
            width: 30,
            height: 30,
            color: '#ff0055',
            speed: 2 + Math.random() * 2
        });
    }
}

function updateEnemies() {
    enemies.forEach((enemy, eIndex) => {
        enemy.y += enemy.speed;
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        if (enemy.y > canvas.height) {
            isGameOver = true;
        }

        // 当たり判定
        bullets.forEach((bullet, bIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                enemies.splice(eIndex, 1);
                bullets.splice(bIndex, 1);
                score += 100;
                document.getElementById('score').innerText = score;
            }
        });
    });
}

// ■ メインループ
function gameLoop() {
    if (isGameOver) {
        // ゲームオーバー画面の描画
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center'; // 文字を中央揃えに
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        
        ctx.font = '16px Arial';
        ctx.fillText("Press Space to Restart", canvas.width / 2, canvas.height / 2 + 40);
        return; // ここでループを止める
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayer();
    drawPlayer();
    updateBullets();
    spawnEnemy();
    updateEnemies();

    requestAnimationFrame(gameLoop);
}

// ゲーム開始
gameLoop();