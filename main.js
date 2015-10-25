$(document).ready(function() {


  $('#tabs').tab();
  $('#recruitKoala').tooltip();
  $('#getHouse').tooltip();
  $('#upgrade1').tooltip();
  $('#jobFarmer').tooltip();


  var eucalyptus;
  var house;
  var koalas;
  var farmer;
  var era = $('#container-era');
  var white= true;

  var interSave = 60000;

  //VARIABLES PROVISIONALES PARA LAS ERAS
  var bCity=false;
  var bupgrades = false;
  var bjobs = false;


 


  loadGame();
  console.log(koala.quantity)
  //BOTON DE CONSEGUIR eucalyptus
  $('#geteucalyptus').click(function() {

    eucalyptus.quantity += eucalyptus.perClick;
    eucalyptus.counter.text(eucalyptus.quantity);
    addToSave(eucalyptus);
    if(eucalyptus.quantity >= koala.cost){
      koala.button.attr('class', 'btn noselect');
    }
    if (eucalyptus.quantity >= house.cost) {
      house.button.attr('class', 'btn noselect');
    };
    if (eucalyptus.quantity >= 20) {
      $('#upgrade1').attr('class', 'btn noselect');
    };
  });

  //BOTON DE COMPRAR KOALA
  $(koala.button).click(function(){
    if(koala.quantity < koala.max && eucalyptus.quantity >= koala.cost){
      $('#log').prepend("You buy 1 koala\n","<br />");
      eucalyptus.quantity -= koala.cost;
      koala.quantity ++;
      koala.available++;
      koala.cost = Math.round(1.75*koala.cost); // BALANCEO
      $(koala.button).tooltip('hide').attr('data-original-title', "Recruit a koala | " + koala.cost + " eucalyptus" ).tooltip('fixTitle').tooltip('show');    //MODIFICACIONES DEL INFO
      eucalyptus.counter.text(eucalyptus.quantity);
      koala.counter.text(koala.quantity+"/"+koala.max);
        if (eucalyptus.quantity < koala.cost) {
          koala.button.attr('class','btn noselect notYet');
        };
    }
  });

  //BOTON DE COMPRAR CASA
  $(house.button).click(function() {

    if(eucalyptus.quantity >= house.cost){
      $('#log').prepend("You buy 1 house\n","<br />");
      eucalyptus.quantity -= house.cost;
      house.quantity++;
      house.cost = 15+Math.round(0.5*house.cost);
      $(house.button).tooltip('hide').attr('data-original-title', "Get a house | " + house.cost + " eucalyptus | +5 limit koala.max" ).tooltip('fixTitle').tooltip('show');   //MODIFICACIONES DEL INFO
      house.button.html("House (" + house.quantity + ")");    //CAMBIAMOS EL HTML MEJOR PARA QUE OCUPE MENOS ESPACIO Y NO CREAR MUCHOS DIVS
      eucalyptus.counter.text(eucalyptus.quantity);
      koala.max+=5;  //BALANCEO
      koala.counter.text(koala.quantity+"/"+koala.max);
        if (eucalyptus.quantity < house.cost) {

          house.button.attr('class','btn noselect notYet');
        };
    }
  });

  //PRUEBA DE UPGRADE
  $('#upgrade1').click(function(){
    if (eucalyptus.quantity >=0) {
      $('#log').prepend("You take X upgrade\n","<br />");
      eucalyptus.perClick+=1000;
      eucalyptus.quantity -=0;
      eucalyptus.counter.text(eucalyptus.quantity);
    };
    console.log(eucalyptus.perClick)
    $('#upgrade1').tooltip('destroy');
    $('#upgrade1').remove();
  });


  //AVANZAR ERAS, CONTIENE ALGUNAS PRUEBAS PARA LOGROS Y CAMBIOS EN EL BOTON DE CAMBIO DE ERA
  $('#container-era').click(function(){
    if (!bCity) {
      bCity = true;
      $('#tabs').append("<li><a href=#mycity data-toggle=tab>City</a></li>");
      $('#myachievements ul').append("<li>Your first advance</li>");
      $('#container-era').html("<h2>SECOND ERA</h2>");
      $('#log').prepend("You promote to the second era\n","<br />");
    }else if (bCity && !bupgrades) {
      bupgrades = true;
      $('#tabs').append("<li><a href=#myupgrades data-toggle=tab>Upgrades</a></li>");
      $('#myachievements ul').append("<li>Your second advance</li>");
      $('#container-era').html("<h2>THIRD ERA</h2>");
      $('#log').prepend("You promote to the third era\n","<br />");

    }else if (bupgrades && !bjobs){
      bjobs = true;
      $('#tabs').append("<li><a href=#myjobs data-toggle=tab>Jobs</a></li>");
      $('#container-era').html("<h2>FOURTH ERA</h2>");
      $('#log').prepend("You promote to the fourth era\n","<br />");
    };
  });

  $('#sucFarmer').click(function(){
    if (farmer.quantity > 0) {
     farmer.quantity--;
     farmer.counter.html("Farmer(" + farmer.quantity + ")");
     eucalyptus.perTick -= farmer.perTick;
     koala.available++;
    };
  });

  $('#plusFarmer').click(function(){
    if (koala.available > 0) {
     koala.available--;
     farmer.quantity++;
     farmer.counter.html("Farmer(" + farmer.quantity + ")");
     eucalyptus.perTick += farmer.perTick;
    };
  });

  window.setInterval(function() {
    eucalyptus.quantity+= eucalyptus.perTick;
    eucalyptusCounter = eucalyptus.quantity;
    eucalyptus.counter.text(eucalyptus.quantity);
  }, 1000);


  //Cada minuto guarda el valor de las variables
  //JSON.stringify convierte el objeto a JSON ya que solo se pueden guardar strings con localstorage
  window.setInterval(saveGame, interSave);


 



  function saveGame(){
    localStorage.setItem("eucalyptus",JSON.stringify(eucalyptus));
    localStorage.setItem("house",JSON.stringify(house));
    localStorage.setItem("koalas",JSON.stringify(koala));
    localStorage.setItem("farmer",JSON.stringify(farmer));
    localStorage.setItem("era",era.html());
    $('#log').prepend("Saved\n","<br />");
    console.log("guardado");
  }

  //Para cargar los datos se llama al item que antes hemos creado y se parsea
  function loadGame(){

    //Load eucalyptus
    try{
      eucalyptus = JSON.parse(localStorage.getItem("eucalyptus"));
      if(eucalyptus == undefined){
        eucalyptus = new Resource("eucalyptus", 1,100,0,1, $('#eucalyptusCounter'),0);
      }else{
        eucalyptus.counter = $('#eucalyptusCounter');
        eucalyptus.counter.text(eucalyptus.quantity);
      }
    }catch(err){
      eucalyptus = new Resource("eucalyptus", 1,100,0,1, $('#eucalyptusCounter'),0);
      eucalyptus.counter = $('#eucalyptusCounter');
      eucalyptus.counter.text(eucalyptus.quantity);
    }

    //Load  Koala
    try{
      koala = JSON.parse(localStorage.getItem("koalas"));
      if(koala == undefined || koala == ""){
        koala = new Koala(0,2,5,$('#recruitKoala'),$('#koalaCounter'),0);
      }else{
        koala.button = $('#recruitKoala');
        koala.counter = $('#koalaCounter');
        koala.counter.text(koala.quantity+"/"+koala.max);
      }
    }catch(err){
      koala = new Koala(0,2,5,$('#recruitKoala'),$('#koalaCounter'),0);
      koala.button = $('#recruitKoala');
      koala.counter = $('#koalaCounter');
      koala.counter.text(koala.quantity+"/"+koala.max);
    }

    //Load House
    try{
      house = JSON.parse(localStorage.getItem("house"));
      if(house == undefined || house == ""){
        house = new Building("house", 1,0,15,$('#getHouse'));
      }else{
        house.button = $('#getHouse');
        house.button.html("House (" + house.quantity + ")");    //CAMBIAMOS EL HTML MEJOR PARA QUE OCUPE MENOS ESPACIO Y NO CREAR MUCHOS DIVS
      }
    }catch(err){
      house = new Building("house", 1,0,15,$('#getHouse'));
      house.button = $('#getHouse');
      house.button.html("House (" + house.quantity + ")");
    }

    //Load Farmer
    try{
      farmer = JSON.parse(localStorage.getItem("farmer"));
      if(farmer == undefined || farmer == ""){
        farmer = new Job("farmer", 1,5,0,$('#sucFarmer'),$('#plusFarmer'),1,$('#jobFarmer'));
      }else{
        farmer.suc = $('#sucFarmer');
        farmer.plus = $('#plusFarmer');
        farmer.counter = $('#jobFarmer');
      }
    }catch(err){
      farmer = new Job("farmer", 1,5,0,$('#sucFarmer'),$('#plusFarmer'),1,$('#jobFarmer'));
      farmer.suc = $('#sucFarmer');
      farmer.plus = $('#plusFarmer');
      farmer.counter = $('#jobFarmer');
    }

    era.html(localStorage.era);
    console.log(era.html());
    if(era.html()==""){
      era.html("<h2>FIRST ERA</h2>")
    }


    //If para que aparezcan los tabs seguro que debe haber un metodo mejor
    if(era.html()=="<h2>SECOND ERA</h2>"){
      $('#tabs').append("<li><a href=#mycity data-toggle=tab>City</a></li>");
    }else if(era.html()=="<h2>THIRD ERA</h2>"){
      $('#tabs').append("<li><a href=#myupgrades data-toggle=tab>Upgrades</a></li>");
    }else if(era.html()=="<h2>FOURTH ERA</h2>"){
      $('#tabs').append("<li><a href=#myjobs data-toggle=tab>Jobs</a></li>");
    }
  }


  $('#wipe').click(function(){
    if (confirm("Save data will be wiped, are you sure?")){
        localStorage.setItem("eucalyptus",undefined);
        localStorage.setItem("house",undefined);
        localStorage.setItem("koalas",undefined);
        localStorage.setItem("farmer",undefined);
        localStorage.setItem("era","<h2>FIRST ERA</h2>");
        location.reload();
      }
  })
    


  $('#save').click(saveGame);

  //Boton para cambiar el color del fondo y las letras

  $('#changeColor').click(function(){
    if(white){
      $('link[href="main.css"]').attr('href','dark.css');
      white=false;
    }else{
      $('link[href="dark.css"]').attr('href','main.css');
      white=true;
    }
  })

});
