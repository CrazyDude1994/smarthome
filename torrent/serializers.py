from rest_framework import serializers
from utorrent import client as uclient


HOST = "localhost"
PORT = "8085"
LOGIN = "admin"
PASSWORD = "80505071491"


class TorrentURL(object):
    def __init__(self, url):
        self.url = url


class TorrentSerializer(serializers.Serializer):
    url = serializers.CharField(max_length=255)

    def create(self, validated_data):
        client = uclient.UTorrentClient("http://{0}:{1}/gui/".format(HOST, PORT), LOGIN, PASSWORD)
        result = TorrentURL(**validated_data)
        client.addurl(result.url)
        return result