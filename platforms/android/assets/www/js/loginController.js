angular.module('ionium').controller(
		'LoginController',
		function($scope, AuthService, SOCIAL, $ionicSideMenuDelegate, $ionicModal, $rootScope, $localStorage, $ionicLoading, $state, $ionicPopup, $http, $ionicHistory, $ionicModal, $timeout, $cordovaOauth) {

$ionicSideMenuDelegate.canDragContent(false);
			$scope.showAlert = function() {
				var alertPopup = $ionicPopup.alert({
					title : 'Verificar',
					template : 'Credenciales incorrectas'
				});

			};
			$scope.showAlertBienvenido = function() {
				var alertPopup = $ionicPopup.alert({
					title : 'Bienvenido',
					template : 'Bienvenido a la RED'
				});

			};

			$ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });



			$scope.FBlogin = function(){

				$cordovaOauth.facebook(window.global.Facebook_APP_ID, ["email", "public_profile", "user_hometown", "user_posts", "user_friends", "user_about_me"]).then(function(result) {
						displayData(result.access_token);



				}, function(error) {
						alert("Error: " + error);
				});
			}

			$scope.dataRegister = {
						username: $scope.username,
						name: $scope.name,
						lastname: $scope.lastname,
						password2:$scope.password,
						activated: true
				};

				$scope.register = function () {

						AuthService.register($scope.dataRegister);
						$scope.showAlertBienvenido();
						$state.go('app.login', null, {reload:true});
						$scope.modal.remove();

				};



			function displayData(access_token){
					$http.get("https://graph.facebook.com/v2.6/me", {params: {access_token: access_token, fields: "cover,email,name,about,gender,birthday,picture,taggable_friends,feed", format: "json" }}).then(function(result) {
							result.data.access_token = access_token;
							result.data.picture = 'https://graph.facebook.com/'+result.data.id+'/picture?type=large';
						window.localStorage.setItem("ionium-fb", JSON.stringify(result.data));
						$localStorage.currentUser = {
								mail: JSON.stringify(result.data.email),
								token: null,
								rol: "Admin"
						};

						$scope.data2= {
							email:JSON.stringify(result.data.email),
							nombre:JSON.stringify(result.data.name),

					};


							AuthService.registerFacebook($scope.data2);
								//alert(JSON.stringify(result.data.email));
								$ionicHistory.nextViewOptions({
		disableBack: true
		});
						$state.go("app.home", null, {reload:true});
					}, function(error) {
							alert("Error: " + error);
					});
			}



					$scope.loginWithSocialtwitter = function() {

      $cordovaOauth.twitter(SOCIAL.TWITTER.KEY, SOCIAL.TWITTER.SECRET, {redirect_uri: "http://10.0.2.2/callback"}).then(function(result){



					displayData3(result);

      },  function(error){
          alert('error');
      });
  }

	function displayData3(result){
window.localStorage.setItem("twitterKey", JSON.stringify(result));
		$state.go("app.home", null, {reload:true});
	}



			$scope.GPlogin = function(){
				$cordovaOauth.google(window.global.Google_OAUTH_ID, ["email"]).then(function(result) {
						displayData2(result);


				}, function(error) {
						alert(error);
				});
			};

			function displayData2(result){
							window.localStorage.setItem("ionium-gp", JSON.stringify(result));
							$ionicHistory.nextViewOptions({
 disableBack: true
});
						$state.go("app.home", null, {reload:true});

			}



			$scope.showAlert2 = function() {
				var alertPopup = $ionicPopup.alert({
					title : 'Red Concreta - Verificar',
					template : 'Correo electrónico y/o contraseña son requeridos'
				});

			};

			$scope.data = {
				email : $scope.email,
				password : $scope.password
			};

			$scope.login = function() {

				if($scope.data.email != null  && $scope.data.password != null){

					AuthService.login($scope.data).then(
							function(response) {

								$ionicLoading.show({
									content: 'Loading',
									animation: 'fade-in',
									showBackdrop: true,
									maxWidth: 200,
									showDelay: 0
								});

								$timeout(function () {

							$scope.result = angular.fromJson(response.data);

							if($scope.result.Status == "Error"){
								$ionicLoading.hide();
								$scope.showAlert();
							} else{

								 $localStorage.currentUser = {
										 mail: $scope.result.user['email'],
										 token: $scope.result.persist_code,
										 rol: $scope.result.rol
								 };



								 console.log($localStorage.currentUser);

								 $localStorage.currentRol = $scope.result.rol;
								  $scope.modal.remove();

								 //$http.defaults.headers.common.Authorization = 'Bearer ' + $scope.result.persist_code;

								 /*$localStorage.currentUser = $scope.result.user['email'];
								$localStorage.token = $scope.result.persist_code;
								$localStorage.rol = $scope.result.rol; */
								$ionicLoading.hide();
								$ionicHistory.nextViewOptions({
	 disableBack: true
 });
								$state.go('app.home', null, {reload:true});

							}

						}, 2000);






								/*window.localStorage.setItem('email',
										$scope.result.user['email']);

								window.localStorage.setItem('persist_code',
										$scope.result.persist_code);*/

							});
				}else{
					$scope.showAlert2();
				}






			};




		});/**
			 * Created by SICEI_Ale on 21/01/2017.
			 */
