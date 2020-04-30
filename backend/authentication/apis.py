from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models
from . import serializers


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class ProfileView(APIView):
    def get(self, request):
        return Response({
            "is_staff": self.request.user.is_staff,
            "first_name": self.request.user.first_name,
            "last_name": self.request.user.last_name,
            "email": self.request.user.email,
            "username": self.request.user.username,
        })
