const WebSocket = require('ws');

// WebSocketサーバーをポート8080で立ち上げる
const server = new WebSocket.Server({ port: 8080 });

// 接続が確立したときの処理
server.on('connection', socket => {
    console.log('新しいクライアントが接続しました');

    // クライアントからメッセージを受信したときの処理
    socket.on('message', message => {
        console.log('受信メッセージ:', message);

        // 受信したメッセージを全てのクライアントにブロードキャストする
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // クライアントが接続を閉じたときの処理
    socket.on('close', () => {
        console.log('クライアントが切断されました');
    });
});

console.log('WebSocketサーバーがポート8080で起動しました');