'use strict';

app.controller('PersonalAdsController',
    function personalAdsController($scope, $http, $location, personalAds, mainData, notifier) {
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.numPages = 0;
        $scope.adData = {};

        mainData.getAllCategories(function (resp) {
            $scope.categories = resp;
        });

        mainData.getAllTowns(function (resp) {
            $scope.towns = resp;
        });

        $scope.getMyAds = personalAds.getAllAds(function (resp) {
            $scope.personalAdsData = resp;

            if (resp.ads.length === 0) {
                $scope.currentPage = 0;
            }

            $scope.numPages = resp.numPages;
        }, status ? status : '', $scope.currentPage, $scope.pageSize);

        $scope.adData = {townId: null, categoryId: null};

        $scope.fileSelected = function (fileInputField) {
            delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.checkAdId = function (status) {
            switch (status) {
                case 'Published':
                case 'WaitingApproval':
                    return true;
                default:
                    return false;
            }
        };

        $scope.checkIfAdInactive = function (status) {
            if (status == 'Inactive') {
                return true;
            }
        };

        $scope.reloadAds = function (isFilter, adStatus) {
            if (isFilter) {
                $scope.currentPage = 1;
            }

            personalAds.getAllAds(function (resp) {
                $scope.personalAdsData = resp;

                if (resp.ads.length === 0) {
                    $scope.currentPage = 0;
                }

                $scope.numPages = resp.numPages;
            }, adStatus, $scope.currentPage, $scope.pageSize);
        };

        $scope.deactivateAd = function (id) {
            personalAds.deactivateAd(id)
                .$promise
                .then(function (data) {
                    $location.path('/myAds');
                });
        };

        $scope.getSingleAd = function (id) {
            personalAds.getSingleAd(function (resp) {
                $location.path('/user/ads/edit/' + resp.id);
            }, id);
        };

        $scope.deleteAd = function (id) {
            $location.path('user/ads/delete/' + id);
        };

        $scope.publishAgain = function (id) {
            personalAds.publishAgain(id)
        };

        $scope.publishNewAd = function (adData) {
            personalAds.postNewAd(adData);
        };

        $scope.goToPage = function (mod) {
            if ($scope.currentPage + mod > 0 && $scope.currentPage + mod <= $scope.numPages) {
                $scope.currentPage += mod;
                $scope.reloadAdds(false);
            }
        };

        $scope.borderPages = function (page) {
            if (page > 0 && page <= $scope.numPages) {
                $scope.currentPage = page;
                $scope.reloadAdds(false);
            }
        };

        $scope.reloadAdds = function (isFilter) {
            if (isFilter) {
                $scope.currentPage = 1;
            }

            $scope.getMyAds = personalAds.getAllAds(function (resp) {
                $scope.personalAdsData = resp;

                if (resp.ads.length === 0) {
                    $scope.currentPage = 0;
                }

                $scope.numPages = resp.numPages;
            }, status ? status : '', $scope.currentPage, $scope.pageSize);
        };
    }
);