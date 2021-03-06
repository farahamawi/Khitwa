angular.module('Khitwa.services', [])

.factory('Events', function ($http) {
	var getEvents = function () {
		return $http({
			method: 'GET',
			url: '/api/events'
		})
		.then(function (res) {
			return res.data;
		});
  }
  var createEvent = function (event) {
      return $http({
        method: 'POST',
        url: '/api/createEvent',
        data: event
      })
    }
//need fixing: how to get an event based on their id
  var getEvent = function(eventId){
    return $http({
      method: 'GET',
      url: '/api/event/'+eventId
    })
    .then(function(resp){
      return resp.data;
    });
  }

  var getUser = function(userID){
    return $http({
      method : 'GET',
      url : '/api/user/'+userID
    })
    .then(function(res){
      return res.data;
    })
  } 

  var getAllUsers = function(){
      return $http({
        method : 'GET',
        url : '/api/users'
      })
      .then(function(res){
        return res.data;
      })
    } 



  var joinEvent = function (userID, EventId) {
    return $http({
      method : 'POST',
      url : '/api/applyEvent',
      data : { userId : userID, eventId : EventId }
    })
    .then(function(res){
      return res.data;
    })
  }

  // var getEventss = function(){
  //   return ({
  //     method:'GET',
  //     url:'/api/getEvents'

  //   })
  //   .then(function(res){
  //     return res.data;
  //   })
  // }

	return {
		getEvents: getEvents,
    createEvent: createEvent,
    getEvent: getEvent, 
    getUser : getUser,
    joinEvent : joinEvent,
    getAllUsers:getAllUsers,
    getEvents:getEvents
	};
})

.factory('Socket', function (socketFactory){
  return socketFactory();
})

.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.Khitwa'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.Khitwa');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.Khitwa');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
