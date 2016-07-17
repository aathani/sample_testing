var app = angular.module('impLCsApp', []);
app.controller('impLCsCtrl', function($scope, $http) {

$scope.impLCs = function() {
	$http.get('users/impLC')
	.success(function(response) {alert(JSON.stringify(response)); $scope.impLCarr=response});
        };
$scope.removeRow = function(id, pid) {
	$http.delete('users/impLC/'+pid)
	.success(function(response) {if (response.msg==='') {
		                        $scope.impLCarr.splice(id,1);
				    } else {
					alert(response.msg);
				    }});
        };

$scope.addRow = function() {
	alert($scope.impLC.customer);
	$http.post('users/impLC', $scope.impLC)
	.success(function(response) {if (response.msg==='') {
		                        $scope.impLCs();
					$scope.impLC='';
	                                $scope.btnLbl="Add LC";
				    } else {
					alert(JSON.stringify(response.msg));
				    }});
        };
$scope.modRow = function(id) {
	$scope.impLC=(JSON.parse(JSON.stringify($scope.impLCarr[id])));
	$scope.btnLbl="Edit LC";
        };

$scope.impLCs();
$scope.btnLbl="Addd LC";

});

