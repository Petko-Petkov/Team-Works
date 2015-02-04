'use strict';

app.controller('LogoutController', function LogoutController($scope, $location, accountData) {
    $scope.logout = function () {
        accountData.logout();
        $location.path('/home')
    }
});