$(document).ready(function() {
  $('#tabs').tab();
  $('#recruitKoala').tooltip();
  $('#getHouse').tooltip();
  $('#upgrade1').tooltip();

  var bamboo = new Resource("bamboo", 1,100,0,1, $('#bambooCounter'));

  var koala = new Koala(0,2,5,$('#recruitKoala'),$('#koalaCounter'));

  var house = new Building("house", 1,0,15,$('#getHouse'),$('#houseCounter'));

  var bCity=false;
  var bupgrades = false;
  var bjobs = false;

  //BOTON DE CONSEGUIR BAMBOO
  $('#getBamboo').click(function() {

    bamboo.quantity += bamboo.perClick;
    bamboo.counter.text(bamboo.quantity);
    if(bamboo.quantity >= koala.cost){
      koala.button.attr('class', 'btn noselect');
    }
    if (bamboo.quantity >= house.cost) {
    	house.button.attr('class', 'btn noselect');
    };
    if (bamboo.quantity >= 20) {
    	$('#upgrade1').attr('class', 'btn noselect');
    };
  });

  //BOTON DE COMPRAR KOALA
  $(koala.button).click(function(){
    if(koala.quantity < koala.max && bamboo.quantity >= koala.cost){
        bamboo.quantity -= koala.cost;
    	koala.quantity ++;
    	koala.cost = 1.75*koala.cost;
    	$(koala.button).tooltip('hide').attr('data-original-title', "Recruit a koala | " + koala.cost + " bamboo" ).tooltip('fixTitle').tooltip('show');
	    bamboo.counter.text(bamboo.quantity);
	    koala.counter.text(koala.quantity+"/"+koala.max);
      	if (bamboo.quantity < koala.cost) {
      		koala.button.attr('class','btn noselect notYet');
      	};
    }
  });

  //BOTON DE COMPRAR CASA
  $(house.button).click(function() {

    if(bamboo.quantity >= house.cost){
      bamboo.quantity -= house.cost;;
      house.quantity++;
      house.cost = 15+(0.5*house.cost);
      $(house.button).tooltip('hide').attr('data-original-title', "Get a house | " + house.cost + " bamboo | +5 limit koala.max" ).tooltip('fixTitle').tooltip('show');
      house.counter.text(house.quantity);
	  bamboo.counter.text(bamboo.quantity);
	  koala.max+=5;
	  koala.counter.text(koala.quantity+"/"+koala.max);
      	if (bamboo.quantity < house.cost) {
      		house.button.attr('class','btn noselect notYet');
      	};
    }
  });

  //PRUEBA DE UPGRADE
  $('#upgrade1').click(function(){
  	if (bamboo.quantity >=1) {
  		bamboo.perClick+=10;
  		bamboo.quantity -=1;
  		bamboo.counter.text(bamboo.quantity);
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
