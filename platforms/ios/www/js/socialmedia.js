




angular.module('ionium').controller(
		'SoundController',
		function($scope, AuthService, $sce, $cordovaSocialSharing, $ionicModal, $stateParams ,$http, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $cordovaNativeAudio) {



			$scope.mostrar=false;
			$scope.mostrar2=false;

 myAudio2.pause();
 myAudio.pause();


$scope.audiotag1=function(){
$scope.mostrar=true;
$scope.mostrar2=false;
$scope.audioUrl = "http://64.56.64.94:8008/;";
$scope.tracks = $sce.trustAsResourceUrl($scope.audioUrl.href);


var myAudio2 = document.getElementById("myAudio2");
var isPlaying2 = true;
if (isPlaying2) {
	 myAudio2.pause();
 } else {
	 myAudio2.play();
 }
}

$scope.audiotag2=function(){
$scope.mostrar=false;
$scope.mostrar2=true;
$scope.audioUrlFormula="http://144.217.228.52:8000/merida1";
var myAudio = document.getElementById("myAudio");
var isPlaying = true;
if (isPlaying) {
	 myAudio.pause();
 } else {
	 myAudio.play();
 }

}
		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
