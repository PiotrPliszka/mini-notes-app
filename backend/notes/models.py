from django.db import models
from django.conf import settings


# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=64)
    content = models.TextField(blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
