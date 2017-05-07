var tabControl = angular.module('tabControl', ['ui.router']);

var tabController = tabControl.controller('tabController', function($scope, $location, $rootScope){
	$scope.tab = 0;
	
	$scope.update
	
	$scope.load = function(){
		$location.path('/0');
	}
	
	$scope.loadCurrentView = function(){
		$location.path('/' + $scope.tab);
	}
	
	$scope.forceTab = function(newTab){
		$scope.tab = newTab;
		$scope.loadCurrentView();
	}
	
	$scope.increaseTab = function(){
		if ($scope.tab < 5)
			++$scope.tab;
		
		$scope.loadCurrentView();
	}
	
	$scope.decreaseTab = function(){
		if ($scope.tab > 0)
			--$scope.tab;
		
		$scope.loadCurrentView();
	}
	
	$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){ 
			$scope.loadCurrentView();
		
			updateViews(results);
		});
});

//Routes used
tabControl.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/0');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('0', {
            url: '/0',
            templateUrl: 'view0.html'
        })
        
        .state('1', {
            url: '/1',
            templateUrl: 'view1.html'
			//controller: 'registerForm'
        })
		
		.state('2', {
            url: '/2',
            templateUrl: 'view2.html'
			//controller: 'registerForm'
        })
		.state('3', {
            url: '/3',
            templateUrl: 'view3.html'
			//controller: 'registerForm'
        })
		.state('4', {
            url: '/4',
            templateUrl: 'view4.html'
			//controller: 'registerForm'
        })
		.state('5', {
            url: '/5',
            templateUrl: 'view5.html'
			//controller: 'registerForm'
        })
});