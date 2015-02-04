'use strict';

app.controller('PageController',
    function PageController($scope, mainData, accountData) {
        $scope.maxSize = 5;
        $scope.currentPage = 1;
        $scope.numPages = 0;
        $scope.category = {};
        $scope.town = {};
        $scope.ready = false;

        mainData.getAllAds(function (resp) {
            $scope.data = resp;
            if (resp.ads.length === 0) {
                $scope.currentPage = 0;
            }

            $scope.ready = true;
            $scope.numPages = resp.numPages;
        }, $scope.category.id ? $scope.category.id : '', $scope.town.id ? $scope.town.id : '', $scope.currentPage, $scope.maxSize);

        mainData.getAllTowns(function (resp) {
            $scope.towns = resp;
        });

        mainData.getAllCategories(function (resp) {
            $scope.categories = resp;
        });

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

            mainData.getAllAds(function (resp) {
                $scope.data = resp;
                if (resp.ads.length === 0) {
                    $scope.currentPage = 0;
                }

                $scope.ready = true;
                $scope.numPages = resp.numPages;
            }, $scope.category.id ? $scope.category.id : '', $scope.town.id ? $scope.town.id : '', $scope.currentPage, $scope.maxSize);
        };

        $scope.numPages = function () {
            return $scope.allAddsData.numPages;
        };
    }
);