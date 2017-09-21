angular.module('ionium').controller(
		'calendarioController',
		function($scope, AuthService, $http, $ionicPopup, $ionicPlatform, $interval, $cordovaNetwork, $rootScope, $localStorage, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $firebaseObject) {







							var ref = firebase.database().ref();
							$scope.calendario = $firebaseObject(ref.child('eventos'));


$scope.agendar = function(title,notes,startDate,endDate){
	var success = function(message) { alert("Success: " + JSON.stringify(message)); };
 var error = function(message) { alert("Error: " + message); };
	window.plugins.calendar.createEventInteractively(title,notes,startDate,endDate,success,error);

}








		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
