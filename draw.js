let audio = new AudioData();

function draw () {
  ctx.clearRect(0, 0, W * 100, H * 100);
  audio.update();

  (function Stripes () {
    ctx.save();

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    [
      5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
      55, 60, 65, 70, 75, 80, 85, 90,95
    ].forEach((v) => {
      ctx.moveTo(W * v, 0);
      if (Math.random() > 0.01) {
        ctx.bezierCurveTo(
          W * v + audio.low.frequencyData.reduce((a, v) => a + (v / 512), 0.0), H * 25,
          W * v - audio.medium.frequencyData.reduce((a, v) => a + (v / 512), 0.0), H * 75,
          W * v, H * 100
        );
      } else {
        ctx.bezierCurveTo(
          W * v - audio.low.frequencyData.reduce((a, v) => a + (v / 512), 0.0), H * 25,
          W * v + audio.medium.frequencyData.reduce((a, v) => a + (v / 512), 0.0), H * 75,
          W * v, H * 100
        );
      }
    });
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  })();





  (function CircledSquare () {
    ctx.save();
    ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(W * 50, H * 25);
    ctx.bezierCurveTo(W * 62.5, H * 37.5, W * 62.5, H * 62.5, W * 50, H * 75);
    ctx.moveTo(W * 50, H * 75);
    ctx.bezierCurveTo(W * 37.5, H * 62.5, W * 37.5, H * 37.5, W * 50, H * 25);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  })();
}
