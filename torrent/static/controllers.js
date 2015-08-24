var controllers = angular.module('torrentControllers', ['torrentFactories']);

controllers.controller('TorrentsController', ['$scope', 'torrentFactory', function ($scope, torrentFactory) {



    $scope.getCustomers = function () {
        torrentFactory.getTorrents().success(function (data) {
            $scope.torrents = data;
        }).error(function () {

        });
    };
    $scope.getCustomers();
}]);