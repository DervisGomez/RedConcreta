angular.module('ionium').controller(
		'calendarioController',
		function($scope, AuthService, $ionicModal, $http, $ionicPopup, $ionicPlatform, $interval, $cordovaNetwork, $rootScope, $localStorage, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $firebaseArray,stripe) {
			
			var ref = firebase.database().ref();
			$scope.calendario = $firebaseArray(ref.child('eventos'));
			console.log($scope.calendario);
			$scope.visible=[];
			$scope.calendario.$loaded().then(function(){
				var x=0;
		        angular.forEach($scope.calendario, function(calen) {
		            console.log(calen);
		            $scope.visible.push({
		            	id:calen.$id,
		            	costo:calen.costo,
		            	cupo:calen.costo,
		            	description:calen.description,
		            	image:calen.image,
		            	start:calen.start,
		            	end:calen.end,
		            	title:calen.title,
		            	visible:false,
		            	ind:x
		            });
		            x++;
		        });
		    });

		    $scope.ver=function(id){
		    	console.log(id)
		    	$scope.visible[id].visible=!$scope.visible[id].visible;
		    }

			$scope.participantes="5";

			$scope.cardDetails = {
			    number: "",
			    cvc: "",
			    exp_month:"",
			    exp_year: "",
			};


			$ionicModal.fromTemplateUrl('templates/themes/agendar.html', {
			    scope: $scope,
			    animation: 'slide-in-up'
			}).then(function(modal) {
			    $scope.modal = modal;
			});
			$scope.data = {
				max : 0,
				cantidad: 0,
				aparecer: false,
				atual: 0,
				participantes: "",
				id: 0,
				precio: 0
			};

			$scope.participante= {
				nombre:"",
				apellido:"",
				telefono:"",
				fechanacimiento:""
			}
			$scope.cantidadparticipante= [];
			$scope.showAlert = function(titulo,descripcion) {
				var alertPopup = $ionicPopup.alert({
					title : titulo,
					template : descripcion
				});

			};

			$scope.agendar = function(title,notes,startDate,endDate){
				var success = function(message) { alert("Success: " + JSON.stringify(message)); };
			 	var error = function(message) { alert("Error: " + message); };
				window.plugins.calendar.createEventInteractively(title,notes,startDate,endDate,success,error);
			}

			$scope.ir = function(ind){
				console.log(ind.image)
				$scope.data.id=ind.id;
				$scope.data.max=parseInt(ind.cupo);
				$scope.data.cantidad=parseInt(1);
				$scope.data.aparece=false;
				$scope.data.aparece2=true;
				$scope.data.aparece3=true;
				$scope.data.aparece4=false;
				$scope.data.fechainicio=ind.start;
				$scope.data.image=ind.image;
				$scope.data.precio=parseFloat(ind.costo);
				$scope.data.total=parseFloat(ind.costo);
				$scope.cantidadparticipante= [];
				$scope.cantidadparticipante.push({
							idevento:$scope.data.id,
							nombre:"",
							apellido:"",
							fechanacimiento:"",
							telefono:""	,
							correo:""						
						});
				$scope.participante= {
					nombre:"",
					apellido:"",
					telefono:"",
					fechanacimiento:""
				}
			 	$scope.openModal();
			}

			$scope.masparticipantes=function(){
				console.log("hola");
				$scope.data.aparece=true;
				$scope.data.aparece2=false;
			}

			$scope.totalparticipantes=function(){
				if($scope.data.cantidad<=$scope.data.max){
					$scope.data.aparece2=true;
					$scope.data.aparece=false;
					$scope.data.total=$scope.data.precio*$scope.data.cantidad;
					if($scope.cantidadparticipante.length<$scope.data.cantidad){
						for(var i=$scope.cantidadparticipante.length;i<$scope.data.cantidad;i++){
							$scope.cantidadparticipante.push({
								idevento:$scope.data.id,
								nombre:"",
								apellido:"",
								fechanacimiento:"",
								telefono:""	,
								correo:""					
							});
						}
					}else{
						for(var i=$scope.data.cantidad;i<$scope.cantidadparticipante.length;i++){
							console.log("hola");
							$scope.cantidadparticipante.splice(i);
						}
					}
				}else{
					$scope.showAlert("Calendario","solo hay disponible "+$scope.data.max+" cupos");
				}
			}

			$scope.annadir=function(){
				console.log("hola");
				$scope.data.cantidad=$scope.data.cantidad+1;
				$scope.data.total=$scope.data.precio*$scope.data.cantidad;
				$scope.cantidadparticipante.push({
					idevento:$scope.data.id,
					nombre:"",
					apellido:"",
					fechanacimiento:"",
					telefono:""	,
					correo:""					
				});
			}

			$scope.irPagar=function(){
				for (var i = 0; i < $scope.cantidadparticipante.length; i++){
					console.log(i);
					if($scope.cantidadparticipante[i].correo==""||$scope.cantidadparticipante[i].nombre==""||$scope.cantidadparticipante[i].fechanacimiento==""||$scope.cantidadparticipante[i].apellido==""||$scope.cantidadparticipante[i].telefono==""){
						$scope.showAlert("Calendario","Faltan al menos un dato de un participante");
						return;
					}	
				}
				$scope.data.aparece3=false;
				$scope.data.aparece4=true;
			}

			$scope.pagarTotal=function(){
				$ionicLoading.show({
									content: 'Loading',
									animation: 'fade-in',
									showBackdrop: true,
									maxWidth: 200,
									showDelay: 0
								});
				if($scope.cardDetails.number!=undefined&&$scope.cardDetails.cvc!=undefined&&$scope.cardDetails.exp_month!=undefined&&$scope.cardDetails.exp_year!=undefined){
					stripe.card.createToken($scope.cardDetails)
					.then(function (response) {
					    console.info('token created for card ending in ', response);
					    var price=parseFloat($scope.data.precio)*parseInt($scope.data.cantidad);
					    console.log(price);			      
					    var payment = {
					        token: response.id,
					        price: $scope.data.total
					    }
					    AuthService.setPago(payment).then(function(response) {
					    	console.log('successfully submitted payment for £', response);
					    	for (var i = 0; i < $scope.data.cantidad; i++){
								console.log($scope.cantidadparticipante[i]);
								AuthService.setParticipantes($scope.cantidadparticipante[i]);
							}
							$ionicLoading.hide();
							$scope.showAlert("Calendario","Inscripción exitosa");
							
					    },function (error) {
					        $ionicLoading.hide();
					    	$scope.showAlert("Calendario","Ocurrio un error en el servidor"+error);
					    });
					},
					function (error) {
						$ionicLoading.hide();
					    $scope.showAlert("Calendario","Ocurrio un error el pago no fue aceptado "+error);
					});
				}else{
					$ionicLoading.hide();
					$scope.showAlert("Calendario","Ha introducido los datos de la tarjeta incorrectamente");
				}
			}




			$scope.reservar = function(ind){
				$scope.data.aparecer=true;
				$scope.data.max=parseInt(ind.cupo);
				if($scope.data.cantidad==undefined){
					$scope.showAlert("Calendario","La cantidad de participantes en el evento es invalido");
				}else{
					$scope.data.cantidad=parseInt($scope.data.cantidad);
				}
			}

			$scope.openModal = function() {
			    $scope.modal.show();
			};
			$scope.closeModal = function() {
			    $scope.modal.hide();
			};
			$scope.validadcantidad=function(){
				if($scope.data.cantidad==undefined){
					$scope.showAlert("Calendario","La cantidad de participantes en el evento es invalido");
				}else{
					$scope.cantidadparticipante= []
					$scope.data.aparecer=true;
					$scope.data.actual=1
					$scope.data.participantes=$scope.data.actual+"/"+$scope.data.cantidad;
					for (var i = 0; i < $scope.data.cantidad; i++){
						$scope.cantidadparticipante.push({
							idevento:$scope.data.id,
							nombre:"",
							apellido:"",
							fechanacimiento:"",
							telefono:""							
						});
					}
					$scope.cardDetails = {
					    number: "",
					    cvc: 1,
					    exp_month: 1,
					    exp_year: 2,
					};
					$scope.participante.nombre="";
					$scope.participante.fechanacimiento="";
					$scope.participante.apellido="";
					$scope.participante.telefono="";
					console.log($scope.cantidadparticipante.length);
				}
			}
			$scope.siguiente = function() {
				if($scope.data.actual<$scope.data.cantidad){
					if($scope.participante.nombre!=""&&$scope.participante.fechanacimiento!=""&&$scope.participante.apellido!=""&&$scope.participante.telefono!=""){
						$scope.cantidadparticipante[$scope.data.actual-1].nombre=$scope.participante.nombre;
						$scope.cantidadparticipante[$scope.data.actual-1].fechanacimiento=$scope.participante.fechanacimiento;
						$scope.cantidadparticipante[$scope.data.actual-1].apellido=$scope.participante.apellido;
						$scope.cantidadparticipante[$scope.data.actual-1].telefono=$scope.participante.telefono;
						console.log($scope.cantidadparticipante[$scope.data.actual-1].nombre);
						console.log($scope.cantidadparticipante[$scope.data.actual].nombre);
						$scope.participante.nombre=$scope.cantidadparticipante[$scope.data.actual].nombre;
						$scope.participante.fechanacimiento=$scope.cantidadparticipante[$scope.data.actual].fechanacimiento;
						$scope.participante.apellido=$scope.cantidadparticipante[$scope.data.actual].apellido;
						$scope.participante.telefono=$scope.cantidadparticipante[$scope.data.actual].telefono;
						$scope.data.actual=$scope.data.actual+1;
						$scope.data.participantes=$scope.data.actual+"/"+$scope.data.cantidad;
					}else{
						$scope.showAlert("Calendario","	Hay campos vacios");
					}					
				}else{
					$scope.showAlert("Calendario","Esta en el último participante");
				}
			};
			$scope.anterior = function() {
			    if($scope.data.actual>1){
			    	if($scope.participante.nombre!=""&&$scope.participante.fechanacimiento!=""&&$scope.participante.apellido!=""&&$scope.participante.telefono!=""){
						$scope.cantidadparticipante[$scope.data.actual-1].nombre=$scope.participante.nombre;
						$scope.cantidadparticipante[$scope.data.actual-1].fechanacimiento=$scope.participante.fechanacimiento;
						$scope.cantidadparticipante[$scope.data.actual-1].apellido=$scope.participante.apellido;
						$scope.cantidadparticipante[$scope.data.actual-1].telefono=$scope.participante.telefono;
						$scope.data.actual=$scope.data.actual-1;
						$scope.participante.nombre=$scope.cantidadparticipante[$scope.data.actual-1].nombre;
						$scope.participante.fechanacimiento=$scope.cantidadparticipante[$scope.data.actual-1].fechanacimiento;
						$scope.participante.apellido=$scope.cantidadparticipante[$scope.data.actual-1].apellido;
						$scope.participante.telefono=$scope.cantidadparticipante[$scope.data.actual-1].telefono;
						$scope.data.participantes=$scope.data.actual+"/"+$scope.data.cantidad;
					}else{
						$scope.showAlert("Calendario","	Hay campos vacios");
					}
				}else{
					$scope.showAlert("Calendario","Esta en el primer participante");
				}
			};
			$scope.guardar = function() {
				$ionicLoading.show({
									content: 'Loading',
									animation: 'fade-in',
									showBackdrop: true,
									maxWidth: 200,
									showDelay: 0
								});
				console.log($scope.data.actual);
				$scope.cantidadparticipante[$scope.data.actual-1].nombre=$scope.participante.nombre;
				$scope.cantidadparticipante[$scope.data.actual-1].fechanacimiento=$scope.participante.fechanacimiento;
				$scope.cantidadparticipante[$scope.data.actual-1].apellido=$scope.participante.apellido;
				$scope.cantidadparticipante[$scope.data.actual-1].telefono=$scope.participante.telefono;
				for (var i = 0; i < $scope.data.cantidad; i++){
					console.log(i);
					if($scope.cantidadparticipante[i].nombre==""||$scope.cantidadparticipante[i].fechanacimiento==""||$scope.cantidadparticipante[i].apellido==""||$scope.cantidadparticipante[i].telefono==""){
						$scope.data.actual=i+1;
						console.log($scope.data.actual);
						$scope.participante.nombre=$scope.cantidadparticipante[$scope.data.actual-1].nombre;
						$scope.participante.fechanacimiento=$scope.cantidadparticipante[$scope.data.actual-1].fechanacimiento;
						$scope.participante.apellido=$scope.cantidadparticipante[$scope.data.actual-1].apellido;
						$scope.participante.telefono=$scope.cantidadparticipante[$scope.data.actual-1].telefono;
						$scope.data.participantes=$scope.data.actual+"/"+$scope.data.cantidad;
						$ionicLoading.hide();
						$scope.showAlert("Calendario","Faltan al menos un dato de un participante");
						return;
					}	
				}
				$scope.guardarParticipantes();
			};

			$scope.guardarParticipantes = function(){
				if($scope.cardDetails.number!=undefined&&$scope.cardDetails.cvc!=undefined&&$scope.cardDetails.exp_month!=undefined&&$scope.cardDetails.exp_year!=undefined){
					stripe.card.createToken($scope.cardDetails)
					.then(function (response) {
					    console.info('token created for card ending in ', response);
					    var price=parseFloat($scope.data.precio)*parseInt($scope.data.cantidad);
					    console.log(price);			      
					    var payment = {
					        token: response.id,
					        price: price
					    }
					    AuthService.setPago(payment).then(function(response) {
					    	console.log('successfully submitted payment for £', response);
					    	for (var i = 0; i < $scope.data.cantidad; i++){
								console.log($scope.cantidadparticipante[i]);
								AuthService.setParticipantes($scope.cantidadparticipante[i]);
							}
							$ionicLoading.hide();
							$scope.showAlert("Calendario","Inscripción exitosa");
							$scope.data.aparecer=false;
					    },function (error) {
					        $ionicLoading.hide();
					    	$scope.showAlert("Calendario","Ocurrio un error en el servidor"+error);
					    });
					},
					function (error) {
						$ionicLoading.hide();
					    $scope.showAlert("Calendario","Ocurrio un error el pago no fue aceptado "+error);
					});
				}else{
					$ionicLoading.hide();
					$scope.showAlert("Calendario","Ha introducido los datos de la tarjeta incorrectamente");
				}				
			};

		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
