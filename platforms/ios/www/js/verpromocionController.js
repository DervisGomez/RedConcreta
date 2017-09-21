angular.module('ionium').controller(
		'verpromocionController',
		function($scope, AuthService, $ionicPlatform, $cordovaSocialSharing,  $http, $interval, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $stateParams, $cordovaLaunchNavigator, $cordovaGeolocation, $firebaseObject) {


// onError Callback receives a PositionError object
//



$scope.launchNavigator = function(direcc) {

 var prueba = navigator.geolocation.getCurrentPosition(onSuccess, onError);

 function onSuccess (position) {
//alert(position);
};

// onError Callback receives a PositionError object
//
function onError(error) {
alert(error);
}
	 var destination = direcc;
 var start = prueba;
	 launchnavigator.navigate(destination, start).then(function() {
	 alert("Navigator launched");
	 }, function (err) {
		 alert(err);
	 });
 };

					// Active INK Effect
				    ionic.material.ink.displayEffect();

			$ionicLoading.show({
				content: 'Loading',
				template: 'Obteniendo promocion, espere...',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
			$timeout(function () {
			$ionicLoading.hide();
			var data = {id:$stateParams.id};
			var ref = firebase.database().ref();
			$scope.data2 = $firebaseObject(ref.child('promociones/'+$stateParams.id));
			}, 2000);

			$scope.refreshTasks = function() {
				$scope.loadData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}, 1250);
			};

			$scope.loadData = function() {
				var data = {id:$stateParams.id};


				var ref = firebase.database().ref();
				$scope.data2 = $firebaseObject(ref.child('promociones/'+$stateParams.id));
			}


			var ref = firebase.database().ref();
			$scope.data2 = $firebaseObject(ref.child('promociones/'+$stateParams.id));
console.log($scope.data2.estado);
			var data = {id:$stateParams.id};
		/*	AuthService.getPromocion(data).then(function(res) {
			  // res holds your data
			  $scope.data2 = res;

				var empresa = {id:$scope.data2.idempresa};
				 console.log($scope.data2)
				 AuthService.verEmpresa(empresa).then(function(res) {
					 // res holds your data
					 $scope.data3 = res;
				 });
			});*/
 $scope.loadData();

 $scope.shareAnywhere = function(mensaje, empresa, imagen, sitioweb) {
 				$cordovaSocialSharing.share(mensaje, empresa, "http://sistemex.com/apps/redconcreta/redConcreta/public/img/promociones/"+imagen, sitioweb);
 		}


		$scope.verempresa = function(ids){

			$state.go('app.verempresa',{id:ids}, {reload:'app.verempresa'});
		}


		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
