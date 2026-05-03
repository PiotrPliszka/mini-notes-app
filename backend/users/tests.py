from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import path, include, reverse
from .models import User

# Create your tests here.


class UserTests(APITestCase):
    urlpatterns = [
        path("api/auth/", include("users.urls")),
    ]

    def setUp(self):
        self.test_user = User.objects.create_user(
            username="hinek",
            email="hinek_bazowy@gmail.com",
            password="Kowal123",
        )

    def test_create_account(self):
        url = reverse("user-register")
        data = {
            "username": "Edward",
            "first_name": "Konrad",
            "last_name": "Draba",
            "email": "test@gmail.com",
            "password": "Kowal1234",
            "confirm_password": "Kowal1234",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)

    def test_login(self):
        url = reverse("token-obtain-pair")
        data = {
            "username": "hinek",
            "password": "Kowal123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_me(self):
        login_url = reverse("token-obtain-pair")
        login_data = {
            "username": "hinek",
            "password": "Kowal123",
        }
        login_response = self.client.post(login_url, login_data, format="json")
        token = login_response.data["access"]

        url = reverse("user-me")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("username", response.data)
        self.assertEqual(response.data["username"], "hinek")

    def test_refresh(self):
        login_url = reverse("token-obtain-pair")
        login_data = {
            "username": "hinek",
            "password": "Kowal123",
        }
        login_response = self.client.post(login_url, login_data, format="json")
        token = login_response.data["refresh"]
        url = reverse("token-refresh")
        data = {"refresh": token}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
