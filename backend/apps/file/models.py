from django.db import models


class File(models.Model):
    file = models.FileField(upload_to='upload/')
    original_file_name = models.TextField()