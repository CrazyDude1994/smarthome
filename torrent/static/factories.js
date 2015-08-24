var services = angular.module('torrentFactories', []);

services.factory('torrentFactory', ['$http', function ($http) {
    var factory = {};

    factory.getTorrents = function () {
        return $http.get('/torrents/api/?format=json');
    };

    return factory;
}]);