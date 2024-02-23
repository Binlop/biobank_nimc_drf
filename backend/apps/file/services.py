from django.db import transaction
from .models import File

class FileService():

    @transaction.atomic
    def save_file(self, data: dict):
        file = File.objects.create(**data)
        file.save()
        return file