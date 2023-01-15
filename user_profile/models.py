from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.CharField(max_length=40, default='')
    ismanager = models.BooleanField(blank=True, null=True)

    def __str__(self):
        return self.first_name


