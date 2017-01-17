/**
 * Created by monoandcompany on 1/13/17.
 */
myApp.factory('Authentication',
['$rootScope','$location', '$firebaseObject','$firebaseAuth',
function($rootScope, $location, $firebaseObject, $firebaseAuth) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    //User Logged in or out detection
    auth.$onAuthStateChanged(function(authUser) {

        if(authUser) {
            var userRef = ref.child('users').child(authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
        } else {
            $rootScope.currentUser ='';
        }
    })

    return {

        login: function(user) {

          auth.$signInWithEmailAndPassword(
              user.email,
              user.password
          ).then (function(user){

              $location.path('/success');
          }).catch(function(error){
              $rootScope.message = error.message;
          })
        }, //login

        logout: function() {

            return auth.$signOut();

        },//logout

        requireAuth: function() {

            return auth.$requireSignIn();
        },//require authentication

        register: function(user) {
            auth.$createUserWithEmailAndPassword(
                user.email,
                user.password
            ).then(function(regUser) {
                var regRef = ref.child('users')
                    .child(regUser.uid).set({

                        date:       firebase.database.ServerValue.TIMESTAMP,
                        regUser:    regUser.uid,
                        firstname:  user.firstname,
                        lastname:   user.lastname,
                        email:      user.email
                    });
                    //Here we tell what information we want to store in memory from the databse
                    //to use with the current user
                $rootScope.message = "Hi " + user.firstname + ". Thanks for registering!!!";
            }).catch (function(error) {

                $rootScope.message = error.message;
            });

        }//register
    };//return

}]);//factory