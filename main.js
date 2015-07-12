$(document).ready(function() {
  $('#tabs').tab();
  $('#recruitKoala').tooltip();
  var nBamboo = 0;
  var bambooCount = $('#bambooCounter');
  var koalaBut = $('#recruitKoala');
  var koalaCount = $('#koalaCounter');
  var nKoala = 0;
  var bCity=false;

  $('#getBamboo').click(function() {
    var nKoala = parseInt(koalaCount.text());
  	var nBamboo = parseFloat(bambooCount.text());
  	var costKoala = 5+(0.12*nKoala);

    nBamboo ++;
    bambooCount.text( nBamboo);
    if(nBamboo >= costKoala){
      koalaBut.attr('class', 'btn noselect');
      if (!bCity) {
      	$('#tabs').append("<li><a href=#mycity data-toggle=tab>city</a></li>");
      	bCity = true;
      };
    }
  });

  $('#recruitKoala').click(function(){
  	var nKoala = parseInt(koalaCount.text());
  	var nBamboo = parseFloat(bambooCount.text());
  	var costKoala = 5+(0.12*nKoala);

    if(nBamboo >= costKoala){
        nBamboo -= costKoala;
    	nKoala ++;
    	costKoala = 5+(0.12*nKoala);
    	$('#recruitKoala').tooltip('hide').attr('data-original-title', "Recruit a koala | " + costKoala + " bamboo" ).tooltip('fixTitle').tooltip('show');
	    bambooCount.text( nBamboo);
	    koalaCount.text( nKoala);
      	if (nBamboo < costKoala) {
      		koalaBut.attr('class','btn noselect notYet');
      	};
    }
  });

});
