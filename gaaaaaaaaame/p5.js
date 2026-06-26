function setup() {
    createCanvas(800, 500);  //サイズ
    background('#191970');   //背景色： 藍色（#191970)
  }
  
  function draw() {
    noStroke();  //ストローク無効化
  
    let size = 25;  //ハートのサイズ
    let space =40;  //ハートの間隔
    
    for (x = 0; x <= width; x += space) {
      for (y = 0; y <= height; y += space) {
        fill('#B6FF01');    //図形の塗り潰し:黄緑色(#B6FF01)
        heart(x, y, size);  //ハート描画
      }
    }
  }
  
  function heart(x, y, size) {
    beginShape();     //ハート描画開始
    vertex(x, y);     //頂点座標
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);  //ベジェ曲線 描画
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);  //ベジェ曲線 描画
    endShape(CLOSE);  //ハート描画終了
  }