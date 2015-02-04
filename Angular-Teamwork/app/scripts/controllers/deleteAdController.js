'use strict';

app.controller('DeleteAdController',
    function deleteAdController($scope, $routeParams, mainData, personalAds) {
        $scope.param = $routeParams.param;

        mainData.getAllCategories(function (resp) {
            $scope.categories = resp;
        });

        mainData.getAllTowns(function (resp) {
            $scope.towns = resp;
        });

        personalAds.getSingleAd(function (resp) {
            $scope.data = resp;

            var imgPreview = document.getElementById('imagePreview');
            imgPreview.src = $scope.data.imageDataUrl;
            $scope.data.ChangeImage = false;
        }, $scope.param);

        $scope.deleteAd = function (id) {
            personalAds.deleteAd(id);
        }
});