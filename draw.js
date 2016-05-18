let audio = new AudioData();
let globals = {
  Clear : {},
  Stripes: {},
  TribalSquare: {
    left: 10,
    wich: true
  }
};

function draw () {
  audio.update();

  (function Clear () {
    ctx.save();

    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, W * 100, H * 100);

    ctx.restore();
  })();

  (function Stripes () {
    ctx.save();

    ctx.strokeStyle = 'white';
    ctx.shadowBlur = 100;
    ctx.shadowColor = 'white';
    ctx.beginPath();
    " ".repeat(19).split('').forEach((v, i) => {
      const xoffset = W * (i + 1) * 5;
      if (Math.random() > 0.1) {
        ctx.moveTo(xoffset, 0);
        ctx.bezierCurveTo(xoffset, H * 25, xoffset, H * 75, xoffset, H * 100);
      } else {
        ctx.moveTo(0, xoffset);
        ctx.bezierCurveTo(W * 25, xoffset, W * 75, xoffset, W * 100, xoffset);
      }
    });
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  })();

  (function TribalSquare () {
    ctx.save();

    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'white';

    if (globals.TribalSquare.left < 0) {
      globals.TribalSquare.wich = !globals.TribalSquare.wich;
      globals.TribalSquare.left = Math.random() * 10;
    }
    globals.TribalSquare.left--;

    if (globals.TribalSquare.wich) {
      ctx.translate(W * 50, H * 50);
      ctx.rotate(frameCount / 60);
      ctx.rect(W * -10, W * -10, W * 20, W * 20);
    } else {
      ctx.beginPath();
      ctx.moveTo(W * 50, H * 25);
      ctx.quadraticCurveTo(W * 65, H * 50, W * 50, H * 75);
      ctx.moveTo(W * 50, H * 75);
      ctx.quadraticCurveTo(W * 35, H * 50, W * 50, H * 25);
      ctx.closePath();
    }

    ctx.stroke();
    ctx.fill();

    ctx.restore();
  })();
}
