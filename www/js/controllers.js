angular.module('starter.controllers', [])
.constant('InstagramApiUrl', '')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('searchController', function($http, $scope, InstagramApiUrl){
  var search = this; 
  search.images = [];   
  //access_token=3209101072.e25468f.192b2d5101b6417a8d86de56a8ae9e64
  //https://api.instagram.com/v1/users/search?q=natgeo&access_token=1681565150.c33af70.4e231fd8340646dd86bd4013984d2a4e&client_id=c33af70a11d3499e87e099a216478829&count=1
  $scope.searchUsers = function(){     
    $http.get(InstagramApiUrl+'v1/users/search?q='+search.user+'&access_token=1681565150.c33af70.4e231fd8340646dd86bd4013984d2a4e&client_id=c33af70a11d3499e87e099a216478829&count=10')
      .success(function(data, status){  
          search.users = data.data;                                              
      })
      .error(function(data, status){                                                    
          console.log("Error: " + data);
      });      
  }
  $scope.getRecentPosts = function(i, id){ 
    console.log(id);
    search.users[i].images = [];
     $http.get(InstagramApiUrl+'v1/users/'+id+'/media/recent/?access_token=1681565150.c33af70.4e231fd8340646dd86bd4013984d2a4e&client_id=c33af70a11d3499e87e099a216478829&scope=public_content')
      .then(function(data){                       
        userdata = data.data.data;                
        console.log(userdata.length);  
        for (var j = 0; j < userdata.length; j++) {
          console.log(j);
          search.users[i].images.push(userdata[j].images);
          console.log(search.users[i].images);           
        }
      })       
  }
  $scope.searchHashtags = function(){      
    $http.get(InstagramApiUrl+'v1/tags/'+search.hashtag+'/media/recent/?access_token=1681565150.c33af70.4e231fd8340646dd86bd4013984d2a4e&client_id=c33af70a11d3499e87e099a216478829')
      .success(function(data, status){  
          search.hashtags = data.data;
          console.log(data.data);                                                           
      })
      .error(function(data, status){                                                    
          console.log("Error: " + data);
      });
  }    

  $scope.setTab = function(newValue){
    $scope.tab = newValue;                       
  };
    
  $scope.isSet = function(tabName){         
      return $scope.tab === tabName;
  };
})