from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^torrents/$', views.TorrentsView.as_view()),
]
