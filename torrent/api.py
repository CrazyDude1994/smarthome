from rest_framework import status

from rest_framework.generics import GenericAPIView
from utorrent import client as uclient
from rest_framework.response import Response

from torrent.serializers import TorrentSerializer


TORRENT_URL = "http://localhost:8085/gui/"
LOGIN = "admin"
PASS = "80505071491"


class TorrentsAPIView(GenericAPIView):
    serializer_class = TorrentSerializer

    def get(self, request):
        try:
            client = uclient.UTorrentClient(TORRENT_URL, LOGIN, PASS)
        except Exception as e:
            return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)
        torrents = client.list()
        return Response(torrents[1]["torrents"])

    def post(self, request):
        try:
            client = uclient.UTorrentClient(TORRENT_URL, LOGIN, PASS)
        except Exception as e:
            return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)
        if (request.data["action"]) == "start":
            client.start(request.data["hash"])
        elif (request.data["action"]) == "stop":
            client.stop(request.data["hash"])
        elif (request.data["action"] == "remove"):
            client.remove(request.data["hash"])
        elif (request.data["action"] == "add"):
            client.addurl(request.data["url"])
        else:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return Response(status=status.HTTP_200_OK)
