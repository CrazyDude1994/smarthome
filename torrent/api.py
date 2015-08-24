from urllib2 import URLError
from rest_framework import status
from rest_framework.generics import GenericAPIView
from utorrent import client as uclient
from rest_framework.response import Response

from torrent.serializers import TorrentSerializer


class TorrentsAPIView(GenericAPIView):

    serializer_class = TorrentSerializer

    def get(self, request):
        try:
            client = uclient.UTorrentClient("http://localhost:8085/gui/", "admin", "80505071491")
        except Exception as e:
            return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)
        torrents = client.list()
        return Response(torrents[1]["torrents"])

    def post(self, request):
        serializer = TorrentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
