

const millisInASecond = 1000;

$(document).ready(function() {
  
  var timer = setInterval(function() {
    
    $('#epoch').text(Math.round((new Date).getTime() / 1000));
    
  }, 1000);
  
});