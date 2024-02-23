from rest_framework import serializers
from .models import File

# class FileSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     file = serializers.FileField()
#     original_file_name = serializers.CharField()

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'