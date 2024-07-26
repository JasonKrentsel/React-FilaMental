from rest_framework import serializers


class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=2000)
    file_paths = serializers.JSONField(default=dict)