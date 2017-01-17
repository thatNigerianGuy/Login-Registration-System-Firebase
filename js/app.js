    /**
 * Created by monoandcompany on 1/12/17.
 */
//declare application

var myApp = angular.module('myApp' , ['ngRoute', 'firebase']);

//Prevent people from going to views that require authentication first
myApp.run(['$rootScope', '$location', function($rootScope, $location) {

    $rootScope.$on('$routeChangeError', function(event, next, previous, error){

        if (error== 'AUTH_REQUIRED') {

            $rootScope.message= 'Sorry you need to login first to access this page';
            $location.path('/login');
        }//Authenticatoin Required
    }); //Route changed error
}]); //run

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider.
        when('/login', {

            templateUrl:    'views/login.html',
            controller:     'RegistrationController'
            //Promises; when a button or link has "/login " link , the template it will direct too
            //will be views/login.html and the controller that attaches to that template will be
            //RegistrationConroller
        }).
        when('/register', {

            templateUrl:    'views/registration.html',
            controller:     'RegistrationController'

}).
        when('/success', {
            templateUrl:    'views/Success.html',
            controller:     'SuccessController',
            resolve:         {

                currentAuth: function(Authentication) {

                    return Authentication.requireAuth();
                }//currentAuth -- Set the resolve method to make sure there is a current user before
                //allowing someone to go to this page
            }//resolve
    }).

        otherwise({

            redirectTo:      '/login'
    });
        //Ohterwise is used when the user types any sub-url on the page it will automatically go back
        //to /login

}]);