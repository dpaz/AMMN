$(document).ready(function() {
  $('#tabs').tab();
  $('#recruitKoala').tooltip();
  $('#getHouse').tooltip();
  $('#upgrade1').tooltip();

  var bamboo = new Resource("bamboo", 1,100,0,1);
  var bambooCount = $('#bambooCounter');

  var koala = new Koala(0,2,5);
  var koalaBut = $('#recruitKoala');
  var koalaCount = $('#koalaCounter');

  var house = new Building("house", 1,0,15);
  var houseBut = $('#getHouse');
  var houseCount = $('#houseCounter');

  var bCity=false;
  var bupgrades = false;
  var bjobs = false;

  //BOTON DE CONSEGUIR BAMBOO
  $('#getBamboo').click(function() {

    bamboo.quantity += bamboo.perClick;
    bambooCount.text(bamboo.quantity);
    if(bamboo.quantity >= koala.cost){
      koalaBut.attr('class', 'btn noselect');
    }
    if (bamboo.quantity >= house.cost) {
    	houseBut.attr('class', 'btn noselect');
    };
    if (bamboo.quantity >= 20) {
    	$('#upgrade1').attr('class', 'btn noselect');
    };
  });

  //BOTON DE COMPRAR KOALA
  $(koalaBut).click(function(){
    if(koala.quantity < koala.max && bamboo.quantity >= koala.cost){
        bamboo.quantity -= koala.cost;
    	koala.quantity ++;
    	koala.cost = 1.75*koala.cost;
    	$(koalaBut).tooltip('hide').attr('data-original-title', "Recruit a koala | " + koala.cost + " bamboo" ).tooltip('fixTitle').tooltip('show');
	    bambooCount.text(bamboo.quantity);
	    koalaCount.text(koala.quantity+"/"+koala.max);
      	if (bamboo.quantity < koala.cost) {
      		koalaBut.attr('class','btn noselect notYet');
      	};
    }
  });

  //BOTON DE COMPRAR CASA
  $(houseBut).click(function() {

    if(bamboo.quantity >= house.cost){
      bamboo.quantity -= house.cost;;
      house.quantity++;
      house.cost = 15+(0.5*house.cost);
      $(houseBut).tooltip('hide').attr('data-original-title', "Get a house | " + house.cost + " bamboo | +5 limit koala.max" ).tooltip('fixTitle').tooltip('show');
      houseCount.text(house.quantity);
	  bambooCount.text(bamboo.quantity);
	  koala.max+=5;
	  koalaCount.text(koala.quantity+"/"+koala.max);
      	if (bamboo.quantity < house.cost) {
      		houseBut.attr('class','btn noselect notYet');
      	};
    }
  });

  //PRUEBA DE UPGRADE
  $('#upgrade1').click(function(){
  	if (bamboo.quantity >=1) {
  		bamboo.perClick++;
  		bamboo.quantity -=1;
  		bambooCount.text(bamboo.quantity);
  	};
  	console.log(bamboo.perClick)
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
