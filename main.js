$(document).ready(function() {
  $('#tabs').tab();
  $('#recruitKoala').tooltip();
  $('#getHouse').tooltip();
  $('#upgrade1').tooltip();
  var nBamboo = 0;
  var bambooCount = $('#bambooCounter');
  var koalaBut = $('#recruitKoala');
  var koalaCount = $('#koalaCounter');
  var nKoala = 0;
  var maxKoala = 2;
  var houseBut = $('#getHouse');
  var houseCount = $('#houseCounter');
  var nHouse = 0;
  var bCity=false;
  var bupgrades = false;
  var bjobs = false;

  //BOTON DE CONSEGUIR BAMBOO
  $('#getBamboo').click(function() {
    var nKoala = parseInt(koalaCount.text());
  	var nBamboo = parseFloat(bambooCount.text());
  	var nHouse = parseInt(houseCount.text());
	var bambooClick = parseFloat($('#bambooClick').text());
  	var costKoala = 5+(0.12*nKoala);
  	var costHouse = 15+(0.5*nHouse);
    nBamboo += bambooClick;
    bambooCount.text(nBamboo);
    if(nBamboo >= costKoala){
      koalaBut.attr('class', 'btn noselect');
    }
    if (nBamboo >= costHouse) {
    	houseBut.attr('class', 'btn noselect');
    };
    if (nBamboo >= 20) {
    	$('#upgrade1').attr('class', 'btn noselect');
    };
  });

  //BOTON DE COMPRAR KOALA
  $(koalaBut).click(function(){
  	var nKoala = parseInt(koalaCount.text());
  	var nBamboo = parseFloat(bambooCount.text());
  	var costKoala = 5+(0.12*nKoala);
  	var maxKoala = parseInt($('#maximKoala').text());

    if(nKoala < maxKoala && nBamboo >= costKoala){
        nBamboo -= costKoala;
    	nKoala ++;
    	costKoala = 5+(0.12*nKoala);
    	$(koalaBut).tooltip('hide').attr('data-original-title', "Recruit a koala | " + costKoala + " bamboo" ).tooltip('fixTitle').tooltip('show');
	    bambooCount.text(nBamboo);
	    koalaCount.text(nKoala+"/"+maxKoala);
      	if (nBamboo < costKoala) {
      		koalaBut.attr('class','btn noselect notYet');
      	};
    }
  });

  //BOTON DE COMPRAR CASA
  $(houseBut).click(function() {
    var nKoala = parseInt(koalaCount.text());
  	var nBamboo = parseFloat(bambooCount.text());
  	var nHouse = parseInt(houseCount.text());
  	var costHouse = 15+(0.5*nHouse);
  	var maxKoala = parseInt($('#maximKoala').text());

    console.log(maxKoala);
    if(nBamboo >= costHouse){
      nBamboo -= costHouse;;
      nHouse++;
      costHouse = 15+(0.5*nHouse);
      $(houseBut).tooltip('hide').attr('data-original-title', "Get a house | " + costHouse + " bamboo | +5 limit maxKoala" ).tooltip('fixTitle').tooltip('show');
      houseCount.text(nHouse);
	  bambooCount.text(nBamboo);
	  maxKoala+=5;
	  $('#maximKoala').text(maxKoala);
	  koalaCount.text(nKoala+"/"+maxKoala);
      	if (nBamboo < costHouse) {
      		houseBut.attr('class','btn noselect notYet');
      	};
    }
  });

  //PRUEBA DE UPGRADE
  $('#upgrade1').click(function(){
  	var nBamboo = parseFloat(bambooCount.text());
  	var bambooClick = parseFloat($('#bambooClick').text());
  	if (nBamboo >=20) {
  		bambooClick++;
  		 $('#bambooClick').text(bambooClick);
  		 nBamboo -=20;
  		 bambooCount.text(nBamboo);
  	};
  	$('#upgrade1').tooltip('destroy');
  	$('#upgrade1').remove();
  });


  //AVANZAR ERAS, CONTIENE ALGUNAS PRUEBAS PARA LOGROS Y CAMBIOS EN EL BOTON DE CAMBIO DE ERA
  $('#container-era').click(function(){
  	if (!bCity) {
  		bCity = true;
    	$('#tabs').append("<li><a href=#mycity data-toggle=tab>city</a></li>");
      	$('#myachievements ul').append("<li>Your first advance</li>");
      	$('#container-era').html("<h2>SECOND ERA</h2>");
    }else if (bCity && !bupgrades) {
    	bupgrades = true;
    	$('#tabs').append("<li><a href=#myupgrades data-toggle=tab>upgrades</a></li>");
      	$('#myachievements ul').append("<li>Your second advance</li>");
      	$('#container-era').html("<h2>THIRD ERA</h2>");
    }else if (bupgrades && !bjobs){
    	bjobs = true;
    	$('#tabs').append("<li><a href=#myjobs data-toggle=tab>jobs</a></li>");
      	$('#container-era').html("<h2>FOURTH ERA</h2>");
    };
  });

});
