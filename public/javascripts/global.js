var app = angular.module('userlistApp', []);
app.controller('userlistCtrl', function($scope, $http) {

$scope.userList = function() {
	$http.get('users/userlist')
	.success(function(response) {$scope.userarr=response;
	                            });
        };
$scope.removeRow = function(id, pid) {
	$http.delete('users/deleteuser/'+pid)
	.success(function(response) {if (response.msg==='') {
		                        $scope.userarr.splice(id,1);
				    } else {
					alert(response.msg);
				    }});
        };

$scope.addRow = function() {
	$http.post('users/adduser', $scope.user)
	.success(function(response) {if (response.msg==='') {
		                        $scope.userList();
					$scope.user='';
	                                $scope.btnLbl="Add User";
				    } else {
					alert(JSON.stringify(response.msg));
				    }});
        };
$scope.modRow = function(id) {
	$scope.user=(JSON.parse(JSON.stringify($scope.userarr[id])));
	$scope.btnLbl="Edit User";
        };

$scope.userList();
$scope.btnLbl="Add User";
});

