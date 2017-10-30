angular.module('ionium').controller(
		'agendarController',
		function($scope, AuthService, $http, $ionicPopup, $ionicPlatform, $interval, $cordovaNetwork, $rootScope, $localStorage, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $firebaseObject) {
			
			var ref = firebase.database().ref();
			$scope.calendario = $firebaseObject(ref.child('eventos'));
			console.log($scope.calendario);
			$scope.participantes="5";

			$scope.agendar = function(title,notes,startDate,endDate,ind){
				console.log(ind)
				var success = function(message) { alert("Success: " + JSON.stringify(message)); };
			 	var error = function(message) { alert("Error: " + message); };
				window.plugins.calendar.createEventInteractively(title,notes,startDate,endDate,success,error);
			}

		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
