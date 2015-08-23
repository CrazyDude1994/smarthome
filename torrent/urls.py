from django.conf.urls import url

from . import api
from .import views

urlpatterns = [
    url(r'^torrents/api/$', api.TorrentsAPIView.as_view()),
    url(r'^torrents/$', views.TorrentsView.as_view())
]
