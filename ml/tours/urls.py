"""tours URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import list_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tours/', list_view)
]


# from . import views
#
# urlpatterns = [
#     path("articles/2003/", views.special_case_2003),
#     path("articles/<int:year>/", views.year_archive),
#     path("articles/<int:year>/<int:month>/", views.month_archive),
#     path("articles/<int:year>/<int:month>/<slug:slug>/", views.article_detail),
# ]