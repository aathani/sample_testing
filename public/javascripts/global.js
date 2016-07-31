var app = angular.module('impLCsApp', []);
app.controller('impLCsCtrl', function($scope, $http) {

$scope.impLCs = function() {
	$http.get('users/impLC')
	.success(function(response) {$scope.impLCarr=response});
        };
$scope.removeRow = function(id, pid) {
	$http.delete('users/impLC/'+pid)
	.success(function(response) {$scope.impLCarr.splice(id,1);
				    } 
        )};

$scope.addRow = function() {
	$http.post('users/impLC', $scope.impLC)
	.success(function(response) {
		                        $scope.impLCs();
								$scope.impLC='';
	                            $scope.btnLbl="Add LC";
	                           } 
        )};

$scope.modRow = function(id) {
	$scope.impLC=(JSON.parse(JSON.stringify($scope.impLCarr[id])));
	$scope.btnLbl="Edit LC";
        };

$scope.impLCs();
$scope.btnLbl="Add LC";

});

