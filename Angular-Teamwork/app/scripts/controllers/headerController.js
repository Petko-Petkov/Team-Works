'user strict';

app.controller('HeaderController', function HeaderController($scope) {
    $scope.username = sessionStorage.username ? sessionStorage.username : "";
    $scope.showLoginLinks = sessionStorage.accessToken ? false : true;
    $scope.header = {url: 'templates/header.html'};
    /*
    if (sessionStorage.length) {
        if (sessionStorage.accessToken.length) {
            $scope.showLoginLinks = false;
            $scope.showLoggedInLinks = false;
            *//*$scope.username = sessionStorage['username'];*//*
        }
    } else {
        $scope.showLoginLinks = true;
        $scope.showLoggedInLinks = true;
    }*/
});