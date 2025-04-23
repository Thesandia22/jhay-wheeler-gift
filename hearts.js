const canvas = document.getElementById('heart-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function Heart(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 20 + 10;
  this.speed = Math.random() * 1 + 0.5;
  this.opacity = Math.random() * 0.5 + 0.3;
  this.color = `rgba(255, 0, 100, ${this.opacity})`;
}

Heart.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size,
                    this.x + this.size * 1.5, this.y + this.size / 3,
                    this.x, this.y + this.size);
  ctx.bezierCurveTo(this.x - this.size * 1.5, this.y + this.size / 3,
                    this.x - this.size / 2, this.y - this.size,
                    this.x, this.y);
  ctx.fill();
};

Heart.prototype.update = function() {
  this.y -= this.speed;
  this.draw();
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.update();
    if (heart.y + heart.size < 0) {
      hearts.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

function spawnHeart() {
  let x = Math.random() * canvas.width;
  let y = canvas.height + 10;
  hearts.push(new Heart(x, y));
}

setInterval(spawnHeart, 300);
animate();
