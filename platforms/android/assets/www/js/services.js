var app = angular.module('ionium.services', []);

app.service('DashList', function($state) {
    var ruta="";
    var ruta2="";
    var ruta3="";
    var ruta4="";
    var ruta5="";
  if($state.current.name == "app.promociones" || $state.current.name == "app.home" && $state.current.name != "app.red" & $state.current.name != "nuestrared" && $state.current.name != "app.radio"){
    //ruta="/android_asset/www/img/Promo_punto.png";
    ruta="img/Promo_punto.png";
  }
  else{
    ruta="img/Promo.png";
  }

  if($state.current.name == "app.red" && $state.current.name != "app.promociones" && $state.current.name != "app.nuestrared" && $state.current.name != "app.radio"){
    ruta2="img/Categorias_Punto.png";
  }
  else{
    ruta2="img/Categorias.png";
  }

  if($state.current.name == "nuestrared" && $state.current.name != "app.red" && $state.current.name != "app.radio" && $state.current.name != "app.promociones" ){
    ruta3="img/Nuestra_red_punto.png";
  }
  else{
    ruta3="img/Nuestra_red.png";
  }

  if($state.current.name == "nuestrared" && $state.current.name != "app.red" && $state.current.name == "app.radio" && $state.current.name != "app.promociones" ){
    ruta4="img/Radio_punto.png";
  }
  else{
    ruta4="img/Radio.png";
  }






  var menu = [


      {
        id: 61,
        title: 'Promociones',
        icon: ruta,
        state: 'promociones()',
        authenticate:'isAuthenticated',
        idclass:'linea1',
        idclass2:'linea6',

      },{
        id: 62,
        title: 'Nuestra RED',
        icon: ruta2,
        state: 'categorias()',
        authenticate:'isAuthenticated',
        idclass:'linea2',
        idclass2:'linea7',
      },{
        id: 63,
        title: 'Facebook',
        icon: ruta3,
        state: 'nuestrared()',
        authenticate:'isAuthenticated',
        idclass:'linea3',
        idclass2:'linea8',
      },

      {
        id: 65,
        title: 'Radio',
        icon: ruta4,
        state: 'radio()',
        authenticate:'!isAuthenticated',
        idclass:'linea4',
        idclass2:'linea9',
      },

    /*  {
        id: 66,
        title: 'Cerrar sesión',
        icon: 'img/Cerrar_sesion.png',
        state: 'showConfirmCerraSession()',
        authenticate:'!isAuthenticated',
        idclass:'linea5',
        idclass2:'linea10',
      },*/

      {
        id: 66,
        title: 'Eventos',
        icon: 'img/Calendario.png',
        state: 'calendario()',
        authenticate:'!isAuthenticated',
        idclass:'linea5',
        idclass2:'linea10',
      },

    ];

  var getMenuById = function(id){
    for(var i in menu){
      if(menu[i].id == id)
        return menu[i];
    }
  };

  var getAllMenu  = function(){
    return menu;
  }

console.log($state.current.name);

  return {
    getMenuById: getMenuById,
    getAllMenu : getAllMenu
  };
});
