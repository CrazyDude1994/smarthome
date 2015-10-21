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
            $scope.getTorrents();
        }, 1000);
    };

    $scope.getTorrents = function () {
        torrentFactory.getTorrents().then(function (response) {
            $scope.torrents = response.data;
            $scope.error = null;
        }, function () {
            $scope.error = "Error!";
        });
    };

    $scope.startTorrent = function (torrentHash) {
        torrentFactory.startTorrent(torrentHash).then(function (response) {
        }, function () {
            alert("Не удалось запустить торрент");
        });
    };

    $scope.stopTorrent = function (torrentHash) {
        torrentFactory.stopTorrent(torrentHash).then(function (response) {

        }, function () {
            alert("Не удалось остановить торрент");
        });
    }

    $scope.removeTorrent = function (torrentHash) {
        if (confirm("Вы действительно хотите удалить торрент?")) {
            torrentFactory.removeTorrent(torrentHash).then(function (response) {

            }, function () {
                alert("Не удалось удалить торрент");
            });
        }
    };

    $scope.addTorrent = function () {
        torrentUrl = prompt("Введите URL торрента");
        if (torrentUrl) {
            torrentFactory.addTorrent(torrentUrl).then(function (response) {

            }, function () {
                alert("Не удалость добавить торрент");
            });
        }
    };

    $scope.getTorrents();
    $scope.startUpdater();
}]);