from rest_framework import serializers
from .models import Directory, File

class DirectorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Directory
    fields = ['full_path', 'name', 'files', 'subdirectories']

class DirectoryCreateSerializer(serializers.ModelSerializer):
    name = serializers.RegexField(
        regex=r'^[a-zA-Z0-9_-]+$',
        error_messages={
            'invalid': 'Directory name can only contain letters, numbers, underscores, and hyphens.'
        }
    )

    class Meta:
        model = Directory
        fields = ['name']

    def validate_name(self, value):
        if ' ' in value:
            raise serializers.ValidationError("Directory name cannot contain spaces.")
        return value

class FileSerializer(serializers.ModelSerializer):
  def create(self, validated_data):
    directory_pk = self.context['directory_pk']
    directory = Directory.objects.get(pk=directory_pk)
    validated_data['directory'] = directory
    return super().create(validated_data)

  class Meta:
    model = File
    fields = ['file']