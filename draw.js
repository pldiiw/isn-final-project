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

  (function PointsCloud () {
    ctx.save();

    ctx.fillStyle = 'white';
    if (Math.random() > 0.1) {
      " ".repeat(Math.round(W * 100)).split('').forEach((v, i) => {
        ctx.fillRect(i, Math.sin(frameCount-i) * 100 * H,  1, 1);
      });
    } else {
      " ".repeat(Math.round(W * 100)).split('').forEach((v, i) => {
        ctx.fillRect(i, Math.sin(frameCount*i) * 100 * H,  1, 1);
      });
    }
    ctx.restore();
  })();

  (function Stripes () {
    ctx.save();

    ctx.strokeStyle = 'white';
    ctx.shadowBlur = 100;
    ctx.shadowColor = 'white';
    ctx.beginPath();
      if (Math.random() > 0.025) {
        " ".repeat(19).split('').forEach((v, i) => {
          const xoffset = W * (i + 1) * 5;
          const td = audio.low.timeDomainData.reduce((a, v) => v > a ? v : a);
          ctx.moveTo(xoffset, 0);
          ctx.bezierCurveTo(xoffset + td, H * 25, xoffset - td, H * 75, xoffset, H * 100);
        });
      } else {
        " ".repeat(19).split('').forEach((v, i) => {
          const xoffset = W * (i + 1) * 5;
          const td = audio.low.timeDomainData.reduce((a, v) => v > a ? v : a);
          ctx.moveTo(0, xoffset);
          ctx.bezierCurveTo(W * 25, xoffset + td, W * 75, xoffset - td, W * 100, xoffset);
        });
      }
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

    let td = audio.all.timeDomainData.reduce((a, v) => a + v / 2048);
    if (Math.random() > 1.3) td = -td;
    if (!globals.TribalSquare.wich) {
      ctx.beginPath();
      ctx.translate(W * 50, H * 50);
      ctx.rotate(frameCount / 60);
      ctx.rect(W * -10, W * -10, W * 20, W * 20);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.moveTo(W * 50, H * 25);
      ctx.quadraticCurveTo(W * 65 + td, H * 50 - td, W * 50, H * 75);
      ctx.moveTo(W * 50, H * 75);
      ctx.quadraticCurveTo(W * 35 - td, H * 50 + td, W * 50, H * 25);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }


    ctx.restore();
  })();

}
