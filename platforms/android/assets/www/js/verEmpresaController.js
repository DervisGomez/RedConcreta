angular.module('ionium').directive('tooltip', function () {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (attrs.title) {
                var $element = $(element);
                $element.attr("title", attrs.title)
                $element.tooltipster({
                    animation: attrs.animation,
                    trigger: "click",
                    position: "right",
                    positionTracker: true,
                    maxWidth: 500,
                    contentAsHTML: true
                });
            }
        }
    };
}).controller(
		'verEmpresaController',
		function($scope, AuthService, $rootScope, $localStorage, $cordovaSocialSharing, $stateParams ,$http, $ionicPopup, $state, $timeout, $ionicLoading, $ionicSlideBoxDelegate,$ionicHistory, $ionicSideMenuDelegate, $ionicModal, $window, $ionicScrollDelegate, $cordovaLaunchNavigator, $cordovaGeolocation, $interval, $ionicPlatform) {



    $scope.onReadySwiper = function (swiper) {
 swiper.initObservers();

    };

			$scope.items = [];
			var foto = {id:$stateParams.id};
			AuthService.verEmpresaFotos(foto).then(function(res) {
				// res holds your data
				$scope.data5 = res;

				var photos = res;
					for(var i = 0;i<photos.length;i++){
						$scope.items[i] = {
							src: photos[i].src,
							sub: "",

						}
					}
			});





      // Active INK Effect
        ionic.material.ink.displayEffect();

			var data = {id:$stateParams.id};
			AuthService.verEmpresa(data).then(function(res) {
				// res holds your data
				$scope.data2 = res;

			});

      AuthService.getPromocionEmpresa(data).then(function(res) {
				// res holds your data
				$scope.data9 = res;
			});

			AuthService.verEmpresa2(data).then(function(res) {
				// res holds your data
				$scope.data3 = res;
			});


      $scope.refreshTasks = function() {
        $scope.loadData();
        $timeout(function() {
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.refreshComplete');
        }, 1250);
      };

      $scope.loadData = function() {
				var data = {id:$stateParams.id};
        AuthService.verEmpresa(data).then(function(res) {
  				// res holds your data
  				$scope.data2 = res;

  			});



			}

 var autoRefresh = $interval(function () {
   AuthService.verEmpresa(data).then(function(res) {
     // res holds your data
     $scope.data2 = res;
     delete $localStorage.califtotal;
     $localStorage.califtotal = {
         califtotal:$scope.data2.califtotal
     };
   });

   $ionicPlatform.on('pause', function() {
     console.log('pause');
   //$state.reload();

   $scope.stopRefresh();
   });

   $scope.stopRefresh = function() {
$interval.cancel(autoRefresh);
};

if($localStorage.califtotal.califtotal != undefined || $localStorage.califtotal.califtotal != null){
  $scope.ratingsObject = {
    iconOn: 'ion-ios-star',    //Optional
    iconOff: 'ion-ios-star-outline',   //Optional
    iconOnColor: '#FF672B',  //Optional
    iconOffColor:  '#FF672B',    //Optional
    rating:  $localStorage.califtotal.califtotal, //Optional
    minRating:1,    //Optional
    readOnly: true, //Optional
    callback: function(rating, index) {    //Mandatory
     $scope.ratingsCallback(rating, index);
    }
  };

}else{
  $scope.ratingsObject = {
    iconOn: 'ion-ios-star',    //Optional
    iconOff: 'ion-ios-star-outline',   //Optional
    iconOnColor: '#FF672B',  //Optional
    iconOffColor:  '#FF672B',    //Optional
    rating:  5, //Optional
    minRating:1,    //Optional
    readOnly: true, //Optional
    callback: function(rating, index) {    //Mandatory
     $scope.ratingsCallback(rating, index);
    }
  };

}


   //$scope.$apply();

 }, 7000);


 $scope.shareAnywhere = function(mensaje, empresa, imagen, sitioweb) {
 				$cordovaSocialSharing.share(mensaje, empresa, "http://webpro.com.mx/asite/redConcreta/public/img/promociones/"+imagen, sitioweb);
 		}



          $scope.launchNavigator = function(direcc) {
            var prueba = navigator.geolocation.getCurrentPosition(onSuccess, onError);

            var onSuccess = function(position) {

      };

      // onError Callback receives a PositionError object
      //
      function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
      }
              var destination = direcc;
            var start = prueba;
              $cordovaLaunchNavigator.navigate(destination, start).then(function() {
                console.log("Navigator launched");
              }, function (err) {
                console.error(err);
              });
            };


      $scope.zoomMin = 1;

        $scope.screenHeight =  $window.innerHeight;

        $scope.showImages = function(index) {
            $scope.activeSlide = index;
            $scope.showModal('templates/features/zoom.html');
        };

        $scope.showModal = function(templateUrl) {
            $ionicModal.fromTemplateUrl(templateUrl, {
              scope: $scope
            }).then(function(modal) {
              $scope.modal = modal;
              $scope.modal.show();
            });
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.modal.remove();
        };

        $scope.updateSlideStatus = function(slide) {
            var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;

            if (zoomFactor == $scope.zoomMin)
              $ionicSlideBoxDelegate.enableSlide(true);
            else
              $ionicSlideBoxDelegate.enableSlide(false);
            $ionicSlideBoxDelegate.update();
        };


			$scope.verempresafoto = function(ids){

				$state.go('app.fotos',{id:ids});
			}

			$scope.verface = function(ids){


				$state.go('app.fbfeeds',{id:ids});
			}


      $scope.verpromocion = function(ids){

     	 $state.go('app.verpromocion',{id:ids});
      }

      $scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional
        iconOff: 'ion-ios-star-outline',   //Optional
        iconOnColor: '#FF672B',  //Optional
        iconOffColor:  '#FF672B',    //Optional
        rating:  5, //Optional
        minRating:1,    //Optional
        readOnly: true, //Optional
        callback: function(rating, index) {    //Mandatory
          $scope.ratingsCallback(rating, index);
        }
      };

      $scope.ratingsCallback = function(rating, index) {
        console.log('Selected rating is : ', rating, ' and the index is : ', index);
        $scope.califacion=  {
          calif:rating,
          email:$localStorage.currentUser.mail,
          idempresa:$stateParams.id
        };
        AuthService.registrarCalificacion($scope.califacion);
      };



		});
