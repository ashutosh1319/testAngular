var apps = angular.module('home_app', ['ngRoute','controller']);

apps.config(function($routeProvider) {
    $routeProvider
	.when("/", {
		templateUrl: "index.html",
        controller :'home_ctrl'
	})
	.when("/about", {
		templateUrl: 'templates/index2.html'
		
	})
	.otherwise({
		templateUrl: 'templates/404.html'
	});
});



var ctrl = angular.module('controller',[])    
ctrl.controller('home_ctrl', ['$scope', '$http','$log',function($scope , $http, $log){
   
    $scope.frmToggle = function(){
        $('.form_cont').slideDown();
        $('.form_cont_update').slideUp();
    }
    
      $http.get('./show.php?n=view')
        .then(function(abc){
           $scope.data = abc.data;
           // $scope.msg = abc;     
        }, function(result) {
            //some error
            console.log(result);
        })
    $scope.showRecords = function(){
          $http.get('./show.php?n=view')
        .then(function(abc){
           $scope.data = abc.data;
           // $scope.msg = abc;     
        }, function(result) {
            //some error
            console.log(result);
        })
        }
    
       
    $scope.saveData = function(formdata){
        //$scope.msg = formdata.Name;
        $http.post('show.php?n=add',{'name':formdata.name,'phone':formdata.phone,'city':formdata.city})
        .then(function(response){
            //console.log(response);
             $scope.showRecords();
            $scope.msg = "Record Added";   
        })
    }
    
    $scope.removeUser = function(uid){
        $http.post("show.php?n=rem",{'id':uid})
           .then(function(){
             $scope.showRecords();
            $scope.msg = "Record deleted!";
        })
        
    }
    
    $scope.editUser = function(uid){
        $http.post("show.php?n=edit",{'id':uid})
            .then(function(res){
            $('.form_cont').slideUp();
            $('.form_cont_update').slideDown();
            
            $scope.frm = res.data[0];
//            $scope.uId =res.data[0].id;
//            $scope.uName =res.data[0].name;
//            $scope.uPhone =res.data[0].phone;
//            $scope.uAddress =res.data[0].city;
        })
    }
 
   $scope.cancel_evnt = function(){
       $('.form_cont_update').slideUp();
       $('.form_cont').slideDown();
   }
   
   $scope.updateData = function(frmdata){
        //$scope.msg = frmdata.name;
       
        $http.post('show.php?n=update',{'uid':frmdata.id,'name':frmdata.name,'phone':frmdata.phone,'city':frmdata.city})
        .then(function(response){
            //console.log(response);
            //$scope.msg = response; 
            $scope.showRecords();
            $scope.msg = "Record Updated!";   
        })
    }
    
    
}]);

