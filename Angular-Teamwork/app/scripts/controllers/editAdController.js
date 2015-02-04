'use strict';

app.controller('EditAdController',
    function editAdController($scope, $routeParams, personalAds, mainData, notifier) {
        $scope.param = $routeParams.param;
        $scope.editedAd = {};

        personalAds.getSingleAd(function (resp) {
            $scope.data = resp;

            var imgPreview = document.getElementById('imagePreview');
            imgPreview.src = $scope.data.imageDataUrl;
            $scope.data.ChangeImage = false;
        }, $scope.param);

        mainData.getAllCategories(function (resp) {
            $scope.categories = resp;
        });

        mainData.getAllTowns(function (resp) {
            $scope.towns = resp;
        });

        $scope.edit = function (id, adData) {
            personalAds.editAd(id, adData);
        };

        $scope.changePic = function (files) {
            if ($scope.data.imageDataUrl) {
                delete $scope.data.imageDataUrl;
            }

            var file = files[0];
            var imgPreview = document.getElementById('imagePreview');

            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.data.imageDataUrl = reader.result;

                    notifier.success("Advertisement image changed. Click the change button to save the changes");
                    imgPreview.src = $scope.data.imageDataUrl;
                };
                reader.readAsDataURL(file);
            } else {
                notifier.error("Bad image file.");
                notifier.warning("If you want to keep original image please set 'Change image' state to 'NO' before submit, else set it to 'YES'");
                imgPreview.src = 'img/No_image_available.svg';
            }
        };

        $scope.setChangePic = function () {
            $scope.data.changeImage = !$scope.data.changeImage;

            if ($scope.data.changeImage) {
                notifier.success("Advertisement image state set to ON.");
            } else {
                notifier.success("Advertisement image state set to OFF.");
            }
        };

        $scope.deletePic = function () {
            if ($scope.data.imageDataUrl) {
                delete $scope.data.imageDataUrl;
            }

            notifier.success("Advertisement image deleted.");

            var imgPreview = document.getElementById('imagePreview');
            imgPreview.src = 'img/No_image_available.svg';
        };
});