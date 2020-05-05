from rest_framework import status
from rest_framework.test import APISimpleTestCase, APITestCase, APIClient
from django.contrib.auth import get_user_model
from django.urls import reverse

from . import apis


class AuthenticationSimpleTest(APISimpleTestCase):
    def test_profile_unauthorized(self):
        profile_url = reverse('profile')
        response = self.client.get(profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class AuthenticationTest(APITestCase):
    def setUp(self):
        User = get_user_model()
        self._username = 'admin'
        self._email = "admin@test.com"
        self._password = "asdf1234!@#$"
        self.user = User.objects.create_superuser(
            username=self._username, email=self._email, password=self._password)
        # self.user.is_active = False
        # self.user.save()

    def tearDown(self):
        pass

    def test_unusual(self):
        User = get_user_model()
        email = 'user@test.com'
        password = 'userpass1'
        username = 'user'
        user = User.objects.create_user(
            username=username, email=email, password=password)

        user.is_active = False
        user.save()

        obtain_url = reverse('token_obtain_pair')
        resp = self.client.post(
            obtain_url, {'email': email, 'password': password}, format='json')

        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        user.is_active = True
        user.save()

        resp = self.client.post(
            obtain_url, {'email': email, 'password': password}, format='json')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_obtain_wrong_pass(self):
        obtain_url = reverse('token_obtain_pair')
        resp = self.client.post(
            obtain_url, {'email': self._email, 'password': 'wrong pass'}, format='json')

        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_obtain_username(self):
        obtain_url = reverse('token_obtain_pair')
        resp = self.client.post(
            obtain_url, {'username': self._email, 'password': self._password}, format='json')

        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_all_correct(self):
        obtain_url = reverse('token_obtain_pair')
        resp = self.client.post(
            obtain_url, {'email': self._email, 'password': self._password}, format='json')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in resp.data and 'refresh' in resp.data)
        token = resp.data['access']
        refresh = resp.data['refresh']

        verification_url = reverse('token_verify')
        resp = self.client.post(
            verification_url, {'token': token}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        resp = self.client.post(
            verification_url, {'token': 'abc'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        refresh_url = reverse('token_refresh')
        resp = self.client.post(
            refresh_url, {'refresh': refresh}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        profile_url = reverse('profile')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        resp = self.client.get(profile_url, data={'format': 'json'})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_profile_authorized(self):
        obtain_url = reverse('token_obtain_pair')
        resp = self.client.post(
            obtain_url, {'email': self._email, 'password': self._password}, format='json')

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in resp.data)
        token = resp.data['access']

        profile_url = reverse('profile')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        resp = self.client.get(profile_url, data={'format': 'json'})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
