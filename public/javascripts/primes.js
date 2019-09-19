$(function() {
  var gridwidth = 144;
  var cellwidth = 20;
  $(".grid-container").css("grid-template", (cellwidth + "px ").repeat(gridwidth) + "/ " + (cellwidth + "px ").repeat(gridwidth))
  for (var i = 0; i < gridwidth*gridwidth; i++) {
    $(".grid-container").append('<div class="grid-item' + (isPrime(i+1) ? " prime" : "") +'"></div>');
    
  }
})

function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1 && num !== 0;
}