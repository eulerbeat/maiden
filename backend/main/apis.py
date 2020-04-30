from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.views import APIView
from rest_framework.response import Response


class DashboardView(APIView):
    def get(self, request):
        return Response({
            "route": "/dashboard",
            "method": "get"
        })
