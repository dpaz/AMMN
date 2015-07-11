$(document).ready(function() {
  $('#tabs').tab();
  var nBamboo = 0;
  var bambooCount = $('#bambooCounter');
  var koalaBut = $('#recruitKoala');

  $('#getBamboo').click(function() {
    var nBamboo = parseInt(bambooCount.text());
    nBamboo ++;
    bambooCount.text( nBamboo);
    if(nBamboo >= 5){
      koalaBut.attr('class', 'btn noselect');
    }
  });
});
