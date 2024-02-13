from django.db import models

from django.db import models
from django.contrib.auth.models import User
from laboratory.models import Laboratory

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    laboratory = models.ManyToManyField(Laboratory)
    is_lab_admin = models.BooleanField('Админ лабы')
    is_lab_ass = models.BooleanField('Лаборант') 

    def __str__(self):
        return self.user.username
    
    def get_user_laboratories(self):
        return self.laboratory.all()