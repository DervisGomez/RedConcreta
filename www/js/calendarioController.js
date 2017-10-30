angular.module('ionium').controller(
		'calendarioController',
		function($scope, AuthService, $ionicModal, $http, $ionicPopup, $ionicPlatform, $interval, $cordovaNetwork, $rootScope, $localStorage, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $firebaseObject) {
			
			var ref = firebase.database().ref();
			$scope.calendario = $firebaseObject(ref.child('eventos'));
			console.log($scope.calendario);
			$scope.participantes="5";

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
				id: 0
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

			$scope.agendar = function(title,notes,startDate,endDate,ind){
				console.log(ind.id)
				$scope.data.id=ind.id;
				$scope.data.max=parseInt(ind.cupo);
				$scope.data.cantidad=parseInt(ind.cupo);
				$scope.data.aparecer=false;
				var success = function(message) { alert("Success: " + JSON.stringify(message)); };
			 	var error = function(message) { alert("Error: " + message); };
			 	$scope.openModal();
				//window.plugins.calendar.createEventInteractively(title,notes,startDate,endDate,success,error);
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
						$scope.showAlert("Calendario","	Hay campos vacios");
						return;
					}	
				}
				$scope.guardarParticipantes();
			};

			$scope.guardarParticipantes = function(){
				for (var i = 0; i < $scope.data.cantidad; i++){
					console.log($scope.cantidadparticipante[i]);
					AuthService.setParticipantes($scope.cantidadparticipante[i]);
				}
			};

		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
