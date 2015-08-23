from django.views.generic import TemplateView


class TorrentsView(TemplateView):
    template_name = "index.html"