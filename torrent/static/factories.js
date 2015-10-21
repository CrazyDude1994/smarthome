var services = angular.module('torrentFactories', []);

services.factory('torrentFactory', ['$http', function ($http) {
    var factory = {};

    factory.getTorrents = function () {
        return $http.get('/torrents/api/?format=json');
    };

    factory.startTorrent = function(torrentHash) {
        return $http.post('/torrents/api/?format=json', {"action" : "start", "hash" : torrentHash
        });
    };

    factory.stopTorrent = function(torrentHash) {
        return $http.post('/torrents/api/?format=json', {"action" : "stop", "hash" : torrentHash
        });
    };

    factory.removeTorrent = function(torrentHash) {
        return $http.post('/torrents/api/?format=json', {"action" : "remove", "hash" : torrentHash
        });
    };

    factory.addTorrent = function(torrentHash) {
        return $http.post('/torrents/api/?format=json', {"action" : "add", "url" : torrentHash
        });
    };

    return factory;
}]);