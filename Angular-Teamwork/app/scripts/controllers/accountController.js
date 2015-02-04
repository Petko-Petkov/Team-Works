"use strict";

app.controller('AccountController', function ($scope, accountData, notifier) {
    $scope.login = function (user, loginForm) {
        accountData.login(function (resp) {
            $scope.loginData = resp;
            notifier.success('Welcome back ' + data.username + '!');
        }, user, loginForm)
    };

    $scope.register = function (user, registerForm) {
        accountData.register(function (resp) {
            $scope.registerData = resp;
        }, user, registerForm)
    };
});