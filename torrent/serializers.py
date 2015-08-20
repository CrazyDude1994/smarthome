from rest_framework import serializers
from utorrent import client as uclient


class TorrentURL(object):
    def __init__(self, url):
        self.url = url


class TorrentSerializer(serializers.Serializer):
    url = serializers.CharField(max_length=255)

    def create(self, validated_data):
        client = uclient.UTorrentClient("http://localhost:8085/gui/", "admin", "80505071491")
        result = TorrentURL(**validated_data)
        client.addurl(result.url)
        return result

    class Meta:
        fields = ('url',)
