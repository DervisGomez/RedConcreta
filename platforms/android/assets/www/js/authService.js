angular.module('ionium')
		.factory('AuthService', function($http, $cacheFactory, $templateCache, BASE_URL, $localStorage, $state, $q) {
					$cacheFactory.get('$http').removeAll();
					return {
						register : function(data) {
							$http({
								method : "POST",
								url : BASE_URL.url
										+ 'asite/redConcretaServices/public/api/register',
								data : data,
								headers : {
									'Content-Type' : 'application/json'
								}
							});
						},
						registerFacebook: function(data) {
							$http({
								method : "POST",
								url : BASE_URL.url
										+ 'asite/redConcretaServices/public/api/registerRedsocial',
								data : data,
								headers : {
									'Content-Type' : 'application/json'
								}
							});
						},

						registrarCalificacion: function(data) {
							$http({
								method : "POST",
								url : BASE_URL.url
										+ 'asite/redConcretaServices/public/api/registrarCalificacion',
								data : data,
								headers : {
									'Content-Type' : 'application/json'
								}
							});
						},

						login : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'asite/redConcretaServices/public/api/login',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json',


								}
							});
						},

						logout : function() {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'asite/redConcretaServices/public/api/logout'
							});
						},


						recovery : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'asite/redConcretaServices/public/api/recovery',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json'
								}
							});
						},

						pushNotification: function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'asite/redConcretaServices/public/api/pushNotification',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json'
								}
							});
						},

						confirmkey : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'asite/redConcretaServices/public/api/confirmkey',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json'
								}
							});
						},
						restore : function(data) {
							return $http({
								method : "POST",
								url : BASE_URL.url
										+ 'asite/redConcretaServices/public/api/restore',
								data : data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json'
								}
							});
						},

						allGiros : function() {

							return $http.get(
									BASE_URL.url
											+ 'asite/redConcretaServices/public/api/giro').then(
									function(response) {
										$templateCache.removeAll();
										return response.data
									});
						},

						allEmpresas : function() {

							return $http.get(
									BASE_URL.url
											+ 'asite/redConcretaServices/public/api/empresas').then(
									function(response) {
										$templateCache.removeAll();
										return response.data
									});
						},

						getEmpresa : function(data) {
						return	$http({
								method : "GET",
								url : BASE_URL.url
										+ 'asite/redConcretaServices/public/api/getempresas',
								 params :  data,
								headers : {
									'Content-Type' : 'application/json',
									'accept' : 'application/json'
								}
							}).then(
					function(response) {
						$templateCache.removeAll();
						return response.data
					});
				},
				verEmpresa: function(data) {
				return	$http({
						method : "GET",
						url : BASE_URL.url
								+ 'asite/redConcretaServices/public/api/verempresa',
						 params :  data,
						headers : {
							'Content-Type' : 'application/json',
							'accept' : 'application/json'
						}
					}).then(
			function(response) {
				$templateCache.removeAll();
				return response.data
			});
		},verEmpresaFotos: function(data) {
		return	$http({
				method : "GET",
				url : BASE_URL.url
						+ 'asite/redConcretaServices/public/api/verempresafoto',
				 params :  data,
				headers : {
					'Content-Type' : 'application/json',
					'accept' : 'application/json'
				}
			}).then(
	function(response) {
		$templateCache.removeAll();
		return response.data
	});
},verEmpresaFotos2: function(data) {
return	$http({
		method : "GET",
		url : BASE_URL.url
				+ 'asite/redConcretaServices/public/api/verempresafoto2',
		 params :  data,
		headers : {
			'Content-Type' : 'application/json',
			'accept' : 'application/json'
		}
	}).then(
function(response) {
$templateCache.removeAll();
return response.data
});
},

getPromocionEmpresa: function(data) {
return	$http({
		method : "GET",
		url : BASE_URL.url
				+ 'asite/redConcretaServices/public/api/getpromocionempresa',
		 params :  data,
		headers : {
			'Content-Type' : 'application/json',
			'accept' : 'application/json'
		}
	}).then(
function(response) {
$templateCache.removeAll();
return response.data
});
},
		verEmpresa2: function(data) {
		return	$http({
				method : "GET",
				url : BASE_URL.url
						+ 'asite/redConcretaServices/public/api/verempresa2',
				 params :  data,
				headers : {
					'Content-Type' : 'application/json',
					'accept' : 'application/json'
				}
			}).then(
	function(response) {
		$templateCache.removeAll();
		return response.data
	});
},
				getPromocion : function(data) {
				return	$http({
						method : "GET",
						url : BASE_URL.url
								+ 'asite/redConcretaServices/public/api/getpromocion',
						 params :  data,
						headers : {
							'Content-Type' : 'application/json',
							'accept' : 'application/json'
						}
					}).then(
			function(response) {
				$templateCache.removeAll();
				return response.data
			});
		},

						allPromociones : function() {

							return $http.get(
									BASE_URL.url
											+ 'asite/redConcretaServices/public/api/promociones').then(
									function(response) {
										$templateCache.removeAll();
										return response.data
									});
						},

						isAuthenticate : function() {
							console.log($localStorage.currentUser);
							if ($localStorage.currentUser) {
								$state.go('app.home');
							}
						},

						onlyLoggedIn : function () {

						    if ($localStorage.currentUser)
						    	return true;
						     else
						        return false;

						}

					}
				});

/**
 * Created by SICEI_Ale on 21/01/2017.
 */
