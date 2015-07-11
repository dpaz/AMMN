$(document).ready(function() {
  $('#tabs').tab();
  var nBamboo = 0;
  var bambooCount = $('#bambooCounter');
  var koalaBut = $('#recruitKoala');
  var koalaCount = $('#koalaCounter');
  var nKoala = 0;

  $('#getBamboo').click(function() {
    var nBamboo = parseInt(bambooCount.text());
    nBamboo ++;
    bambooCount.text( nBamboo);
    if(nBamboo >= 5){
      koalaBut.attr('class', 'btn noselect');
    }
  });

  $('#recruitKoala').click(function(){
  	var nKoala = parseInt(koalaCount.text());
  	var nBamboo = parseInt(bambooCount.text());

    if(nBamboo >= 5){
    	nKoala ++;
	    nBamboo = nBamboo -5;
	    bambooCount.text( nBamboo);
	    koalaCount.text( nKoala);
      	if (nBamboo < 5) {
      		koalaBut.attr('class','btn noselect notYet');
      	};
    } 
  });

});
