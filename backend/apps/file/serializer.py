from rest_framework import serializers
from .models import File

class FileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    file = serializers.FileField(required=False)
    original_file_name = serializers.CharField(required=False)

    def create(self, validated_data):
        print('работает create файл')
        file_data = validated_data.pop('scan_directions')
        file = File.objects.create(**file_data)
        return file
    
    def update(self, instance: File, validated_data: dict):
        print('работает update файл')
        instance.file = validated_data['scan_directions'][0]
        instance.original_file_name = validated_data['scan_directions'][0].name  # или что-то подобное для извлечения имени файла
        instance.save()
        return instance
