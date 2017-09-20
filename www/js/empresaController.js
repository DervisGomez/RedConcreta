angular.module('ionium').controller(
		'empresaController',
		function($scope, AuthService, $ionicPlatform, $cordovaSocialSharing, $cordovaNetwork, $stateParams ,$http, $ionicPopup, $state, $timeout, $interval, $ionicLoading, $rootScope, $localStorage, $ionicSlideBoxDelegate,$ionicHistory) {



			var data = {id:$stateParams.id};
			AuthService.getEmpresa(data).then(function(res) {
			  // res holds your data
			  $scope.data = res;

				$localStorage.empresa = {
						empresas:res
				};
			});


			if(window.Connection)
		 {
									if (!$cordovaNetwork.isOnline()) {
											$ionicPopup.confirm({
													title: "Internet is not working",
													content: "Usted no tiene internet. No todas las funciones vana  estar disponibles."
											}).then(function (res)
											{
															if (res) {
																	$scope.data = $localStorage.empresa.empresas;
															}
											});
									}
							}


						var autoRefresh =	$interval(function () {


								AuthService.getEmpresa(data).then(function(res) {
								  // res holds your data
								  $scope.data = res;

									$localStorage.empresa = {
											empresas:res
									};
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


			$scope.refreshTasks = function() {
				$scope.loadData();
				$timeout(function() {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}, 1250);
			};

			$scope.loadData = function() {
				var data = {id:$stateParams.id};
				AuthService.getEmpresa(data).then(function(res) {
				  // res holds your data
				  $scope.data = res;
				});



			}

			$scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional
        iconOff: 'ion-ios-star-outline',   //Optional
        iconOnColor: '#FF672B',  //Optional
        iconOffColor:  '#FF672B',    //Optional
        rating:  2, //Optional
        minRating:1,    //Optional
        readOnly: true, //Optional
        callback: function(rating, index) {    //Mandatory
          $scope.ratingsCallback(rating, index);
        }
      };

      $scope.ratingsCallback = function(rating, index) {
        console.log('Selected rating is : ', rating, ' and the index is : ', index);
				$scope.califacion={
					califacion:rating,
					email:$localStorage.currentUser.mail
				}
				AuthService.registrarCalificacion($scope.califacion);
      };

			$scope.verempresa = function(ids){

				$state.go('app.verempresa',{id:ids}, {reload:'app.verempresa'});
			}


		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
