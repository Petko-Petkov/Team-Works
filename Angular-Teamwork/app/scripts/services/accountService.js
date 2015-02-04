"use strict";

app.factory('accountData',
    function ($http, $location, $window, pageUrl, notifier) {

        function login(success, user, loginForm) {
            if (loginForm.$valid) {
                $http({
                    method: 'POST',
                    url: pageUrl + 'user/login',
                    data: user
                })
                    .success(function (data, status, headers, config) {
                        sessionStorage.setItem('accessToken', JSON.stringify(data.access_token));
                        sessionStorage.setItem('tokenType',JSON.stringify(data.token_type));
                        sessionStorage.setItem('username', JSON.stringify(data.username));
                        $location.path('/home');
                        notifier.success('Welcome back ' + data.username + '! Redirecting ...');

                        setTimeout(function () {
                            $window.location.reload();
                            success(data);
                        }, 1500);


                    })
                    .error(function (data, status, headers, config) {
                        notifier.error('Incorrect username or password');
                    })
            } else {
                notifier.error('Invalid username or password');
            }
        }

        function register(success, user, registrationForm) {
            if (registrationForm.$valid) {
                $http({
                    method: 'POST',
                    url: pageUrl + 'user/register',
                    data: user
                })
                    .success(function (data, status, headers, config) {
                        notifier.success('Successfully registered ');
                        success(data);
                    })
                    .error(function (data, status, headers, config) {
                        notifier.error(data.message);
                    })
            } else {
                notifier.error('Please fill all required fields with valida data.')
            }
        };

        function changePassword(passObj, changePassForm) {
            if(changePassForm.$valid) {
                $http({
                    method: 'PUT',
                    url: pageUrl + 'user/ChangePassword',
                    data: passObj,
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
                    }
                })
                    .success(function (data, status, headers, config) {
                        notifier.success('Password successfully changed.');
                        $location.path('/home');
                    })
                    .error(function (data, status, headers, config) {
                        notifier.error(data.message);
                    })
            }
        }

        function updateProfile(user, editForm) {
            if(editForm.$valid) {
                $http({
                    method: 'PUT',
                    url: pageUrl + 'user/profile',
                    data: user,
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
                    }
                })
                    .success(function (data, status, headers, config) {
                        notifier.success('Profile successfully updated.');
                        $location.path('/home');
                    })
                    .error(function (data, status, headers, config) {
                        notifier.error('Please fill all required fields with valida data.');
                    })
            }
        }

        function getAccountData(success) {
            $http({
                method: 'GET',
                url: pageUrl + 'user/Profile',
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
                }
            })
                .success(function (data, status, headers, config) {
                    success(data);
                })
                .error(function (data, status, headers, config) {
                    notifier.error('Something unexpected happened. Check if you entered correct data.');
                })
        }

        function logout (){
            notifier.success('Goodbye ' + sessionStorage['username']);
            sessionStorage.clear();
            setTimeout(function () {
                $window.location.reload();
            }, 1500);

        }

        return {
            login: login,
            register: register,
            changePassword: changePassword,
            updateProfile: updateProfile,
            getAccountData: getAccountData,
            logout: logout
        }
});