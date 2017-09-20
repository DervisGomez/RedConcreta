angular.module('ionium').controller(
		'promocionController',
		function($scope, AuthService, $cordovaNetwork, $cordovaSocialSharing, $http, $interval, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory) {

			if(window.Connection)
	   {
	                if (!$cordovaNetwork.isOnline()) {
	                    $ionicPopup.confirm({
	                        title: "Internet is not working",
	                        content: "Esta sección solo funciona con internet."
	                    }).then(function (res)
	                    {
	                            if (res) {
	                                //navigator.app.exitApp();
																	$state.go('app.red');
	                            }
	                    });
	                }
	            }
$ionicHistory.clearCache();
ionic.material.ink.displayEffect();

			$scope.refreshTasks = function() {
				$scope.loadData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}, 1250);
			};

			$scope.loadData = function() {

				AuthService.allPromociones().then(function(res) {
				  // res holds your data
				  $scope.data = res;
				});

			}

			$interval(function () {


				AuthService.allPromociones().then(function(res) {
					// res holds your data
					$scope.data = res;
				});

			}, 7000);


			AuthService.allPromociones().then(function(res) {
			  // res holds your data
			  $scope.data = res;
			});
 $scope.loadData();

 ionic.material.ink.displayEffect();

 $scope.verpromocion = function(ids){

	 $state.go('app.verpromocion',{id:ids});
 }

		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
