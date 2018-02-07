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
		            var fe=calen.start.split(" ");
			    	var a=fe[0].split("-");
			    	var mes="";
			    	switch(parseInt(a[1])){
			    		case 1:
			    			mes=" Ene "
			    		break;
			    		case 2:
			    			mes=" Feb "
			    		break;
			    		case 3:
			    			mes=" Mar "
			    		break;
			    		case 4:
			    			mes=" Abr "
			    		break;
			    		case 5:
			    			mes=" May "
			    		break;
			    		case 6:
			    			mes=" Jun "
			    		break;
			    		case 7:
			    			mes=" Jul "
			    		break;
			    		case 8:
			    			mes=" Ago "
			    		break;
			    		case 9:
			    			mes=" Sep "
			    		break;
			    		case 10:
			    			mes=" Oct "
			    		break;
			    		case 11:
			    			mes=" Nov "
			    		break;
			    		case 12:
			    			mes=" Dic "
			    		break;
			    	}
			    	console.log(a[2]+mes+a[0]);
		            $scope.visible.push({
		            	id:calen.id,
		            	costo:calen.costo,
		            	cupo:calen.costo,
		            	description:calen.description,
		            	image:calen.image,
		            	start:calen.start,
		            	fecha:a[2]+mes+a[0],
		            	end:calen.end,
		            	title:calen.title,
		            	direccion:calen.direccion,
		            	visible:false,
		            	ind:x
		            });
		            x++;
		        });
		    });

			$scope.soMes=function ($event) {
				var h=$scope.cardDetails.exp_month+"";
				if($scope.cardDetails.exp_month<0||$scope.cardDetails.exp_month>12){
					$scope.cardDetails.exp_month=parseInt(h.substring(0,h.length-1));
				}				
			}

			$scope.soAnno=function ($event) {
				var h=$scope.cardDetails.exp_year+"";
				if($scope.cardDetails.exp_year>9999){
					$scope.cardDetails.exp_year=parseInt(h.substring(0,h.length-1));
				}			
			}

			$scope.soCVV=function ($event) {
				var h=$scope.cardDetails.cvc+"";
				if(h.length>4){
					$scope.cardDetails.cvc=parseInt(h.substring(0,h.length-1));
				}			
			}

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
			    address_zip:"",
				correo:""
			}


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
				if(ind.cupo>0){
					if(parseFloat(ind.costo)==0){
						$scope.data.botonPagar="Registrarse";
					}else{
						$scope.data.botonPagar="Pagar";
					}
				 	$scope.openModal();
					console.log(ind.image)
					$scope.data.id=ind.id;
					$scope.data.direccion=ind.direccion;
					$scope.data.max=parseInt(ind.cupo);
					$scope.data.cantidad=parseInt(1);
					$scope.data.aparece=false;
					$scope.data.aparece2=true;
					$scope.data.aparece3=true;
					$scope.data.aparece4=false;
					$scope.data.aparece5=true;
					$scope.data.aparece6=false;
					$scope.data.title=ind.title;
					$scope.data.fecha=ind.fecha;
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
					$scope.cardDetails = {
					    number: "",
					    cvc: "",
					    exp_month:"",
					    exp_year: "",
					    address_zip:"",
					    correo:""
					}					
				}else{
					$scope.showAlert("Calendario","No hay cupos disponibles");
				}				
			}

			$scope.masparticipantes=function(){
				console.log("hola");
				if($scope.data.aparece3){
					$scope.data.aparece=true;
					$scope.data.aparece2=false;
				}
				
			}

			$scope.totalparticipantes=function(){
				if($scope.data.aparece3){
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
				
			}

			$scope.annadir=function(){
				if($scope.data.cantidad<$scope.data.max){
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
				}else{
					$scope.showAlert("Calendario","solo hay disponible "+$scope.data.max+" cupos");
				}
			}

			$scope.irPagar=function(){
				for (var i = 0; i < $scope.cantidadparticipante.length; i++){
					console.log(i);
					if($scope.cantidadparticipante[i].correo==""||$scope.cantidadparticipante[i].nombre==""||$scope.cantidadparticipante[i].fechanacimiento==""||$scope.cantidadparticipante[i].apellido==""||$scope.cantidadparticipante[i].telefono==""){
						$scope.showAlert("Calendario","Faltan al menos un dato de un participante");
						return;
					}	
				}
				if(parseFloat($scope.data.precio)==0){
					$scope.data.cantidad=$scope.cantidadparticipante.length;
					$scope.data.aparece3=false;
					$scope.data.aparece=false;
					$ionicLoading.show({
									content: 'Loading',
									animation: 'fade-in',
									showBackdrop: true,
									maxWidth: 200,
									showDelay: 0
								});
					for (var i = 0; i < $scope.cantidadparticipante.length; i++){
						console.log($scope.cantidadparticipante[i]);
						AuthService.setParticipantes($scope.cantidadparticipante[i]);
					}
					$ionicLoading.hide();
					$scope.data.aparece4=false;
					$scope.data.aparece5=false;
					$scope.data.aparece6=true;
				}else{
					$scope.data.cantidad=$scope.cantidadparticipante.length;
					$scope.data.aparece3=false;
					$scope.data.aparece4=true;
					$scope.data.aparece2=true;
					$scope.data.aparece=false;
				}
				
			}

			$scope.pagarTotal=function(){
				$ionicLoading.show({
									content: 'Loading',
									animation: 'fade-in',
									showBackdrop: true,
									maxWidth: 200,
									showDelay: 0
								});
				if($scope.cardDetails.correo!=undefined&&$scope.cardDetails.number!=undefined&&$scope.cardDetails.cvc!=undefined&&$scope.cardDetails.exp_month!=undefined&&$scope.cardDetails.exp_year!=undefined&&$scope.cardDetails.address_zip!=""){
					console.log($scope.cardDetails.cvc);
					var key="TEST-babe268e-4653-4666-b374-104d22ee885b"
					Mercadopago.setPublishableKey(key);
					Mercadopago.getPaymentMethod({
	                    "bin": $scope.cardDetails.number
	                }, setPaymentMethodInfo);
	                var $form = document.querySelector('#pay');
	                Mercadopago.createToken($form, sdkResponseHandler);
				}else{
					$ionicLoading.hide();
					$scope.showAlert("Calendario","Ha introducido los datos de la tarjeta incorrectamente");
				}
			}

			function setPaymentMethodInfo(status, response) {
				console.log(response);
			    if (status == 200) {
			        // do somethings ex: show logo of the payment method
			        $scope.metodo={method:response[0].id}
			        var form = document.querySelector('#pay');

			        if (document.querySelector("input[name=paymentMethodId]") == null) {
			            var paymentMethod = document.createElement('input');
			            paymentMethod.setAttribute('name', "paymentMethodId");
			            paymentMethod.setAttribute('type', "hidden");
			            paymentMethod.setAttribute('value', response[0].id);

			            //form.appendChild(paymentMethod);
			        } else {
			        	$scope.metodo={method:""}
			            document.querySelector("input[name=paymentMethodId]").value = response[0].id;
			        }
			    }
			};

			function sdkResponseHandler(status, response) {
				console.log(" 2- " +JSON.stringify(response));
			    if (status != 200 && status != 201) {
			        alert("verify filled data");
			        $scope.showAlert("Calendario","verify filled data");
			        $ionicLoading.hide();
			    }else{
			    	console.info('token created for card ending in ', response);
					var price=parseFloat($scope.data.precio)*parseInt($scope.data.cantidad);
					console.log(price);			      
					var payment = {
					    token: response.id,
					    price: $scope.data.total,
					    description:$scope.data.title,
					    email:$scope.cardDetails.correo,
					    method:$scope.metodo.method
					}
					console.log(payment);
					AuthService.setPago(payment).then(function(response) {
					    console.log('successfully submitted payment for £', response);
					    for (var i = 0; i < $scope.cantidadparticipante.length; i++){
							console.log($scope.cantidadparticipante[i]);
							AuthService.setParticipantes($scope.cantidadparticipante[i]);
						}
						$ionicLoading.hide();
						$scope.data.aparece4=false;
						$scope.data.aparece5=false;
						$scope.data.aparece6=true;
							
					},function (error) {
					    $ionicLoading.hide();
					    console.log(error);
					    console.log(error.statusText);
					  	$scope.showAlert("Calendario","Ocurrio un error en el servidor"+error);
					});
        /*var form = document.querySelector('#pay');

        var card = document.createElement('input');
        card.setAttribute('name',"token");
        card.setAttribute('type',"hidden");
        card.setAttribute('value',response.id);
        form.appendChild(card);
        doSubmit=true;*/
        //form.submit();
			    }
			};

			$scope.terminar=function(){
				$scope.closeModal();
			}

			$scope.openModal = function() {
			    $scope.modal.show();
			};
			$scope.closeModal = function() {
			    $scope.modal.hide();
			};

		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
