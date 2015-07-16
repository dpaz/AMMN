$(document).ready(function() {


  $('#tabs').tab();
  $('#recruitKoala').tooltip();
  $('#getHouse').tooltip();
  $('#upgrade1').tooltip();
  $('#jobFarmer').tooltip();
  
  var bamboo;
  var house;
  var koalas;
  var farmer;
  var era;

  var interSave = 3600000;

  //VARIABLES PROVISIONALES PARA LAS ERAS
  var bCity=false;
  var bupgrades = false;
  var bjobs = false;


  loadGame();
  console.log(koala.quantity)
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
      koala.available++;
      koala.cost = 1.75*koala.cost;
      $(koala.button).tooltip('hide').attr('data-original-title', "Recruit a koala | " + koala.cost + " bamboo" ).tooltip('fixTitle').tooltip('show');    //MODIFICACIONES DEL INFO
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
      bamboo.quantity -= house.cost;
      house.quantity++;
      house.cost = 15+(0.5*house.cost);
      $(house.button).tooltip('hide').attr('data-original-title', "Get a house | " + house.cost + " bamboo | +5 limit koala.max" ).tooltip('fixTitle').tooltip('show');   //MODIFICACIONES DEL INFO
      house.button.html("House (" + house.quantity + ")");    //CAMBIAMOS EL HTML MEJOR PARA QUE OCUPE MENOS ESPACIO Y NO CREAR MUCHOS DIVS
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

  $('#sucFarmer').click(function(){
    if (farmer.quantity > 0) {
     farmer.quantity--;
     farmer.counter.html("Farmer(" + farmer.quantity + ")");
     bamboo.perTick -= farmer.perTick;
     koala.available++;
    };
  });

  $('#plusFarmer').click(function(){
    if (koala.available > 0) {
     koala.available--;
     farmer.quantity++;
     farmer.counter.html("Farmer(" + farmer.quantity + ")");
     bamboo.perTick += farmer.perTick;
    };
  });

  window.setInterval(function() {
    bamboo.quantity+= bamboo.perTick;
    bambooCounter = bamboo.quantity;
    bamboo.counter.text(bamboo.quantity);
  }, 1000);


  //Cada minuto guarda el valor de las variables
  //JSON.stringify convierte el objeto a JSON ya que solo se pueden guardar strings con localstorage
  window.setInterval(function(){
    localStorage.setItem("bamboo",JSON.stringify(bamboo));
    localStorage.setItem("house",JSON.stringify(house));
    localStorage.setItem("koalas",JSON.stringify(koala));
    localStorage.setItem("farmer",JSON.stringify(farmer));
    localStorage.setItem("era",$('#container-era').html());
  }, interSave)

  //Para cargar los datos se llama al item que antes hemos creado y se parsea
  function loadGame(){
    bamboo = JSON.parse(localStorage.getItem("bamboo"));
    if(bamboo == undefined){
      bamboo = new Resource("bamboo", 1,100,0,1, $('#bambooCounter'),0);
    }else{
      bamboo.counter = $('#bambooCounter');
      bamboo.counter.text(bamboo.quantity);
    }
    koala = JSON.parse(localStorage.getItem("koalas"));
    if(koala == undefined){
      koala = new Koala(0,2,5,$('#recruitKoala'),$('#koalaCounter'),0);
    }else{
      koala.button = $('#recruitKoala');
      koala.counter = $('#koalaCounter');
      koala.counter.text(koala.quantity+"/"+koala.max);
    }
    house = JSON.parse(localStorage.getItem("house"));
    if(house == undefined){
      house = new Building("house", 1,0,15,$('#getHouse'));
    }else{
      house.button = $('#getHouse');
      house.button.html("House (" + house.quantity + ")");    //CAMBIAMOS EL HTML MEJOR PARA QUE OCUPE MENOS ESPACIO Y NO CREAR MUCHOS DIVS
    }
    farmer = JSON.parse(localStorage.getItem("farmer"));
    if(farmer == undefined){
      farmer = new Job("farmer", 1,5,0,$('#sucFarmer'),$('#plusFarmer'),1,$('#jobFarmer'));
    }else{
      farmer.suc = $('#sucFarmer');
      farmer.plus = $('#plusFarmer');
      farmer.counter = $('#jobFarmer');
    }
    $('#container-era').html(localStorage.era); 
  }

});
