from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, UserSerializer

# Create your views here.


class UserCreateView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class UserMeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
