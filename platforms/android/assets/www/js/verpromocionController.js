angular.module('ionium').controller(
		'verpromocionController',
		function($scope, AuthService, $ionicPlatform, $cordovaSocialSharing,  $http, $interval, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $stateParams, $cordovaLaunchNavigator, $cordovaGeolocation) {
			$scope.shareAnywhere = function() {
			        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");
			    }

					var onSuccess = function(position) {

};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

var prueba = navigator.geolocation.getCurrentPosition(onSuccess, onError);

					$scope.launchNavigator = function(direcc) {
					    var destination = direcc;
						var start = prueba;
					    $cordovaLaunchNavigator.navigate(destination, start).then(function() {
					      console.log("Navigator launched");
					    }, function (err) {
					      console.error(err);
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
			AuthService.getPromocion(data).then(function(res) {
			  // res holds your data
			  $scope.data2 = res;
			});
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
				AuthService.getPromocion(data).then(function(res) {
				  // res holds your data
				  $scope.data2 = res;
				});

			}


		var autoRefresh =	$interval(function () {


					var data = {id:$stateParams.id};
					AuthService.getPromocion(data).then(function(res) {
					  // res holds your data
					  $scope.data2 = res;
					});

			}, 7000);

			$ionicPlatform.on('pause', function() {
				console.log('pause');
			//$state.reload();

			$scope.stopRefresh();
			});

			$scope.stopRefresh = function() {
	 $interval.cancel(autoRefresh);
	 };

			var data = {id:$stateParams.id};
			AuthService.getPromocion(data).then(function(res) {
			  // res holds your data
			  $scope.data2 = res;

				var empresa = {id:$scope.data2.idempresa};
				 console.log($scope.data2)
				 AuthService.verEmpresa(empresa).then(function(res) {
					 // res holds your data
					 $scope.data3 = res;
				 });
			});
 $scope.loadData();

 $scope.shareAnywhere = function(mensaje, empresa, imagen, sitioweb) {
 				$cordovaSocialSharing.share(mensaje, empresa, "http://webpro.com.mx/asite/redConcreta/public/img/promociones/"+imagen, sitioweb);
 		}


		$scope.verempresa = function(ids){

			$state.go('app.verempresa',{id:ids}, {reload:'app.verempresa'});
		}


		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
