// 設定 (Canvas)
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var imgCnt = 25;
var aryImg = [];
var cvsw = document.documentElement.clientWidth;
var cvsh = document.documentElement.clientHeight;
var imgBaseSizeW = 15;
var imgBaseSizeH = 18.5;
var aspectMax = 1.5;
var aspectMin = 0.5;
var speedMax = 1.5;
var speedMin = 0.5;
var angleAdd = 4;
var newWind = 0;
var wind = 10;
var windMax = 25;
var windMin = 5;
var img = new Image();
today = new Date();
now = today.getTime();
today.setTime(now);
month = today.getMonth()+1;
img.src = '';
if (month >= 3 && month <= 5) {
  img.src = "img/spring.png";
} else if (month >= 6 && month <= 8) {
  img.src = "img/summer.png";
} else if (month >= 9 && month <= 11) {
  img.src = "img/autumn.png";
} else {
  img.src = "img/winter.png";
}
img.onload = flow_start;

function fitCanvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  cvsw = document.documentElement.clientWidth;
  cvsh = document.documentElement.clientHeight;
};

fitCanvasSize();
window.onresize = fitCanvasSize;

function setImages(){
  var aspect = 0;
  for (var i=0; i<imgCnt; i++){
    aspect = Math.random()*(aspectMax-aspectMin)+aspectMin;
    aryImg.push({
      "posx": Math.random()*cvsw,
      "posy": Math.random()*cvsh,
      "sizew": imgBaseSizeW*aspect,
      "sizeh": imgBaseSizeH*aspect,
      "speedy": Math.random()*(speedMax-speedMin)+speedMin,
      "angle": Math.random()*360,
    });
  }
}

var idx = 0;
var cos = 0;
var sin = 0;
var rad = Math.PI / 180;
function flow(){
  ctx.clearRect(0,0,cvsw,cvsh);
  for (idx = 0; idx<imgCnt; idx++){
    aryImg[idx].posx += wind/aryImg[idx].sizew;
    aryImg[idx].posy += aryImg[idx].speedy;
    (idx%2) ? aryImg[idx].angle += 1 : aryImg[idx].angle -= 1;
    cos = Math.cos(aryImg[idx].angle * rad);
    sin = Math.sin(aryImg[idx].angle * rad);
    ctx.setTransform(cos, sin, sin, cos, aryImg[idx].posx, aryImg[idx].posy);
    ctx.drawImage(img, 0, 0, aryImg[idx].sizew, aryImg[idx].sizeh);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (aryImg[idx].posy >= cvsh){
      aryImg[idx].posy =- aryImg[idx].sizeh;
      if (imgCnt < idx){
        aryImg.splice(idx, 1);
      }
    }
    if (aryImg[idx].posx >= cvsw){
      aryImg[idx].posx =- aryImg[idx].sizew;
      if (imgCnt < idx){
        aryImg.splice(idx, 1);
      }
    }
  }
}

function windowChange(){
  newWind = Math.random()*(windMax-windMin)+windMin;
  setInterval(function(){
    if(newWind != wind){
      (newWind > wind) ? wind += 0.01 : wind -= 0.01;
    }
  }, 100);
}

function flow_start(){
  setImages();
  setInterval(windowChange,3000);
  setInterval(flow,10);
}

// 非表示 (初期値)
document.querySelector(".back").style.display = "none";
document.querySelector(".nav-left").style.display = "none";

// 画面の切り替え
const front = document.querySelector(".front");
const back = document.querySelector(".back");
const nav_left = document.querySelector(".nav-left");
const nav_right = document.querySelector(".nav-right");

nav_left.addEventListener('click', function(){
    back.style.display = "none";
    front.style.display = "flex";
    nav_left.style.display = "none";
    nav_right.style.display = "flex";
})

nav_right.addEventListener('click', function(){
    back.style.display = "flex";
    front.style.display = "none";
    nav_left.style.display = "flex";
    nav_right.style.display = "none";
})

// キー操作
window.addEventListener('keydown', function(event){
    if (event.key == 'ArrowLeft') {
        back.style.display = "none";
        front.style.display = "flex";
        nav_left.style.display = "none";
        nav_right.style.display = "flex";
    } else if ((event.key == 'ArrowRight')) {
        back.style.display = "flex";
        front.style.display = "none";
        nav_left.style.display = "flex";
        nav_right.style.display = "none";
    }
})