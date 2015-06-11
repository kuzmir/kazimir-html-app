// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var KazimirApp = angular.module('kazimir', ['ionic', 'streets.controllers', 'uiGmapgoogle-maps', 'restangular', 'pascalprecht.translate']);

// configure routes / states
KazimirApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('menu', {
    url: '/menu',
    views: {
      'container-view': {
        templateUrl: 'templates/menu.html'
      }
    }
  })

  .state('list-view', {
    url: '/list-view',
    views: {
      'container-view': {
        templateUrl: 'templates/list-view.html',
        controller: 'StreetsController'
      }
    }
  })

  .state('map-view', {
    url: '/map-view',
    views: {
      'container-view': {
        templateUrl: 'templates/map-view.html',
        controller: 'MapController'
      }
    }
  })

  .state('single-old', {
    url: '/streets/:id',
    views: {
      'container-view': {
        templateUrl: 'templates/single-old.html',
        controller: 'StreetsController'
      }
    }
  })

  .state('single-new', {
    url: '/streets/:id',
    views: {
      'container-view': {
        templateUrl: 'templates/single-new.html',
        controller: 'StreetsController'
      }
    }
  })

  $urlRouterProvider.otherwise('/menu');
});

// Setup Google Maps integration
KazimirApp.config(function(uiGmapGoogleMapApiProvider){
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDYz04VOan5pJY5HhQeWiVap0a7UjUba4A',
    libraries: 'geometry',
    v: '3.17'
  })
});

// Setup Restangular to connect to API resources
KazimirApp.config(function(RestangularProvider){
  // For production API should point to main server ->
  // RestangularProvider.setBaseUrl('http://kazimirapp.pl')
  // See: http://blog.ionic.io/handling-cors-issues-in-ionic/

  // For development we'll run through proxy /api -> http://kazimirapp.pl because of CORS
  RestangularProvider.setBaseUrl('/api')

  // always request JSON format
  RestangularProvider.setRequestSuffix('.json');
})

KazimirApp.config(function($translateProvider) {
    $translateProvider.translations('pl', {
        hello_message: "hadzia",
        goodbye_message: "ciao kakao"
    });
    $translateProvider.translations('en', {
        hello_message: "Hola",
        goodbye_message: "Adios"
    });
    $translateProvider.preferredLanguage("pl");
    $translateProvider.fallbackLanguage("en");
});
// Initialize the app
KazimirApp.run(function($ionicPlatform, $translate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if(typeof navigator.globalization !== "undefined") {
      navigator.globalization.getpreferredLanguage(function(language){
        $translate.use((language.value).split("-")[0]).then(function(data) {
            console.log("SUCCESS -> " + data);
        }, function(error) {
            console.log("ERROR -> " + error);
        });
      }, null);
    }
  });
})
