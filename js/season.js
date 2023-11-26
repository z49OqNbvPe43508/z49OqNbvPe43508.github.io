function season() {
  today = new Date();
  now = today.getTime();
  today.setTime(now);
  month = today.getMonth()+1;
  src = '';

  if (month >= 3 && month <= 5) {
    src = "css/spring.css";
  } else if (month >= 6 && month <= 8) {
    src = "css/summer.css";
  } else if (month >= 9 && month <= 11) {
    src = "css/autumn.css";
  } else {
    src = "css/winter.css";
  }

  var css = '<'; css+='link rel="stylesheet" href=' + src + ' \/'; css+='>';
  document.write(css);
}
season();