
(function(){
	var app = angular.module('myApp', []);
	app.controller('hashtagController', function($http) {
    	var hashtag = this;
	    hashtag.data = [];
	    $http.get('https://api.instagram.com/v1/users/self/?access_token=3209101072.e25468f.192b2d5101b6417a8d86de56a8ae9e64').success(function(data){
	        hashtag.data = data;
	    });
	});

	app.controller('TabController', function($scope){
    	$scope.tab = 1;

        $scope.setTab = function(newValue){
            $scope.tab = newValue;
        };
        $scope.isSet = function(tabName){
            return $scope.tab === tabName;
        };
    });

})();