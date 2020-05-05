from rest_framework import status
from rest_framework.test import APISimpleTestCase, APITestCase
from django.contrib.auth import get_user_model

from . import apis


class DashboardViewSimpleTest(APISimpleTestCase):
    def test_dashboard_unauthorized(self):
        response = self.client.get('/api/main/dashboard/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class DashboardViewTest(APITestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create(
            username='admin', email="admin@test.com", password="asdf1234!@#$")

    def tearDown(self):
        pass

    def test_dashboard_authorized(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get('/api/main/dashboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
