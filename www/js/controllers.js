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
})

.controller('searchController', function($state, $stateParams, $http, $scope, InstagramApiUrl){  
  var search = this;     
  search.hashtag = $stateParams.tag;
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
    search.users[i].images = [];
     $http.get(InstagramApiUrl+'v1/users/'+id+'/media/recent/?access_token=1681565150.c33af70.4e231fd8340646dd86bd4013984d2a4e&client_id=c33af70a11d3499e87e099a216478829')
      .then(function(data){                       
        userdata = data.data.data;                        
        for (var j = 0; j < userdata.length; j++) {          
          search.users[i].images.push(userdata[j].images);                    
        }
      })       
  }
  $scope.searchHashtags = function(){        
    $stateParams.tag = "";    
    $http.get(InstagramApiUrl+'v1/tags/'+search.hashtag+'/media/recent/?access_token=1681565150.c33af70.4e231fd8340646dd86bd4013984d2a4e&client_id=c33af70a11d3499e87e099a216478829')
      .success(function(data, status){  
          search.hashtags = data.data;
      })
      .error(function(data, status){                                                    
          console.log("Error: " + data);
      });
  }     
  $scope.cleanResults = function(){    
    $stateParams.tag = "";
    search.hashtag = "";
    search.hashtags = undefined;
    $state.go($state.current, {tag: $stateParams.tag});
  }
  $scope.setTab = function(newValue){
    $scope.tab = newValue;                       
  };
    
  $scope.isSet = function(tabName){         
      return $scope.tab === tabName;
  };
})