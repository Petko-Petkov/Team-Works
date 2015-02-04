'use strict';

app.controller('EditProfileController', function ($scope, accountData, mainData) {
    $scope.editProfile = function (user, editForm) {
        accountData.updateProfile(user, editForm);
    };

    $scope.changePassword = function (pass, passForm) {
        accountData.changePassword(pass, passForm);
    };

    accountData.getAccountData(function (resp) {
        $scope.user = resp;
    });

    mainData.getAllTowns(function (resp) {
        $scope.towns = resp;
    })
});