from django.urls import path, include
from rest_framework import routers

from . import apis


router = routers.DefaultRouter()
urlpatterns = [
    path('dashboard/', apis.DashboardView.as_view(), name='dashboard'),
]

urlpatterns += router.urls
