from rest_framework import generics
from .models import Note
from .serializers import NoteSerializer


# Create your views here.
class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(user=user)
