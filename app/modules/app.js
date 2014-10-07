'use strict';

var module = angular.module('MyApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'ngAnimate'
    
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $log) {

      $stateProvider
        .state('public', {
          template: '<ui-view>',
          abstract: true    
      });

      $stateProvider
        .state('public.main', {
         abstract: true, 
        templateUrl: 'modules/main/main.html',
        controller: 'MainCtrl'
      });

      $stateProvider
        .state('public.main.home', {
          url: '/',
          templateUrl: 'modules/main/landingsite.html'
      });

      $stateProvider
        .state('public.main.docs', {
          url: '/docs',
          templateUrl: 'modules/docs/documentation.html'
      });

      // Send browser to landing page "/#/" when URL is "/"
      if(location.pathname === "/" && location.hash === "") {
        location.replace("/#/");
      }

  }]);

/* Configure degug logging */
module.config(function ($logProvider) {
  $logProvider.debugEnabled(true);
});


/* Directive for autofocusing the input field in modals */

module.directive('focusMe', function($timeout) {
    return function(scope, element, attrs) {
        attrs.$observe('focusMe', function(value) {
            if ( value==="true" ) {
                $timeout(function(){
                    element[0].focus();
                },5);
            }
        });
    }
});

/* Configure Google Analytics*/
/*
module.config(function(AngularyticsProvider) {
    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
  }).run(function(Angularytics) {
    Angularytics.init();
  });
*/

/* Configure http provider to avoid IE's agressive caching */
/*module.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);*/


/*
$rootScope.$on("$stateChangeSuccess", function (event, toState, fromState, fromParams) {
      
  $rootScope.loading = false;
      
});
*/

 
