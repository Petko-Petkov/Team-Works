'use strict';

var app = angular.module('addsSite', ['ngRoute'])
    .value('toastr', toastr)
    .constant('pageUrl', 'http://softuni-ads.azurewebsites.net/api/')
    .config(function ($routeProvider){
        $routeProvider.when('/register', {
            templateUrl: 'templates/account/register.html',
            controller: 'AccountController'
        });
        $routeProvider.when('/login', {
            templateUrl: 'templates/account/login.html',
            controller: 'AccountController'
        });
        $routeProvider.when('/user/profile', {
            templateUrl: 'templates/account/editProfile.html',
            controller: 'EditProfileController'
        });
        $routeProvider.when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'PageController'
        });
        $routeProvider.when('/user/ads', {
            templateUrl: 'templates/personalAds/myAds.html',
            controller: 'PersonalAdsController'
        });
        $routeProvider.when('/user/ads/publish', {
            templateUrl: 'templates/personalAds/publishAd.html',
            controller: 'PersonalAdsController'
        });
        $routeProvider.when('/user/ads/edit/:param', {
            templateUrl: 'templates/personalAds/editAd.html',
            controller: 'EditAdController'
        });
        $routeProvider.when('/user/ads/delete/:param', {
            templateUrl: 'templates/personalAds/deleteAd.html',
            controller: 'DeleteAdController'
        });
        $routeProvider.when('/logout', {
            templateUrl: 'templates/account/logout.html',
            controller: 'LogoutController'
        })
        $routeProvider.otherwise({redirectTo: '/home'});
    });
