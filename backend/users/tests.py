from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import path, include, reverse
from .models import User

# Create your tests here.


class UserTests(APITestCase):
    urlpatterns = [
        path("api/auth/", include("users.urls")),
    ]

    def test_create_account(self):
        url = reverse("user-register")
        data = {
            "username": "hinek",
            "first_name": "Piotr",
            "last_name": "Pliszka",
            "email": "test@gmail.com",
            "password": "Kowal123",
            "confirm_password": "Kowal123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

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
        data = {"access": token}
        response = self.client.post(url, data, format="json")
        self.assertIn("username", response.data)
