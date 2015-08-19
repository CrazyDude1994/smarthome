from django.db import models


class Torrent(models.Model):
    title = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    file_size = models.IntegerField()