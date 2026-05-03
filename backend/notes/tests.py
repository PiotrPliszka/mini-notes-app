from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import path, include, reverse
from .models import Note
from users.models import User


# Create your tests here.
class NoteTests(APITestCase):
    urlpatterns = [path("api/notes/", include("notes.urls"))]

    def setUp(self):
        self.user = User.objects.create_user(
            username="adam",
            email="adam@test.com",
            password="Haslo1234",
        )

        self.other_user = User.objects.create_user(
            username="ewa",
            email="ewa@test.com",
            password="Haslo1234",
        )

    def test_notes_list_requires_auth(self):
        url = reverse("note-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_notes_create_requires_auth(self):
        url = reverse("note-list")
        data = {
            "title": "Learn Python",
            "content": "Today i must learn Python beacuse i have exam",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_notes_list_returns_only_own_notes(self):
        Note.objects.create(
            user=self.user,
            title="My first note",
            content="content 1",
        )

        Note.objects.create(
            user=self.user,
            title="My second note",
            content="content 2",
        )
        Note.objects.create(
            user=self.other_user,
            title="Other user note",
            content="secret",
        )
        self.client.force_authenticate(user=self.user)
        url = reverse("note-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_notes_create_sets_user_to_request_user(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("note-list")
        data = {
            "title": "Learn DRF",
            "content": "Finish serializers and views",
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 1)

        note = Note.objects.first()
        self.assertEqual(note.user, self.user)
        self.assertEqual(note.title, "Learn DRF")
        self.assertEqual(note.content, "Finish serializers and views")

    def test_note_detail_returns_own_note(self):
        self.client.force_authenticate(user=self.user)
        note = Note.objects.create(
            user=self.user,
            title="My first note",
            content="content 1",
        )
        url = reverse("note-details", args=[note.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "My first note")

    def test_note_detail_rejects_other_users_note(self):
        self.client.force_authenticate(user=self.user)
        note = Note.objects.create(
            user=self.other_user,
            title="My first note",
            content="content 1",
        )
        url = reverse("note-details", args=[note.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_note_update_own_note(self):
        self.client.force_authenticate(user=self.user)
        note = Note.objects.create(
            user=self.user,
            title="My first note",
            content="content 1",
        )
        url = reverse("note-details", args=[note.id])
        data = {
            "title": "My Updated Note",
            "content": "update",
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "My Updated Note")

    def test_note_update_rejects_other_users_note(self):
        self.client.force_authenticate(user=self.user)
        note = Note.objects.create(
            user=self.other_user,
            title="My first note",
            content="content 1",
        )
        url = reverse("note-details", args=[note.id])
        data = {
            "title": "My Updated Note",
            "content": "update",
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_note_delete_own_note(self):
        self.client.force_authenticate(user=self.user)
        note = Note.objects.create(
            user=self.user,
            title="My first note",
            content="content 1",
        )
        url = reverse("note-details", args=[note.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Note.objects.filter(id=note.id).exists())

    def test_note_delete_rejects_other_users_note(self):
        self.client.force_authenticate(user=self.user)
        note = Note.objects.create(
            user=self.other_user,
            title="My first note",
            content="content 1",
        )
        url = reverse("note-details", args=[note.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(Note.objects.filter(id=note.id).exists())
