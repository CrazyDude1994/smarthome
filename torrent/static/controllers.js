var controllers = angular.module('torrentControllers', ['torrentFactories']);

controllers.controller('TorrentsController', ['$scope', '$interval', 'torrentFactory', function ($scope, $interval, torrentFactory) {

    var updateTimer;
    $scope.sortType = '2';
    $scope.sortReverse = false;

    $scope.bytesToSize = function (bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        if (i == 0) return bytes + ' ' + sizes[i];
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };

    $scope.startUpdater = function () {
        updateTimer = $interval(function () {
            $scope.getCustomers();
        }, 1000);
    };

    $scope.getCustomers = function () {
        torrentFactory.getTorrents().success(function (data) {
            $scope.torrents = data;
        }).error(function () {

        });
    };

    $scope.getCustomers();
    $scope.startUpdater();
}]);