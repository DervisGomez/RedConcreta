angular.module('ionium').controller(
		'promocionController',
		function($scope, AuthService, $cordovaNetwork, $cordovaSocialSharing, $http, $interval, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $firebaseObject) {

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

				var ref = firebase.database().ref();
				$scope.data = $firebaseObject(ref.child('promociones'));

			}






			var ref = firebase.database().ref();
			$scope.data = $firebaseObject(ref.child('promociones'));


 $scope.loadData();

 ionic.material.ink.displayEffect();

 $scope.verpromocion = function(ids){

	 $state.go('app.verpromocion',{id:ids});
 }

		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
