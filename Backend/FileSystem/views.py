from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from .serializers import DirectorySerializer, FileSerializer, DirectoryCreateSerializer
from .models import Directory, File


def say_hello(request):
    return HttpResponse("Hello, World!")

def create_base_directory(request):
    Directory.objects.all().delete()
    File.objects.all().delete()
    
    root, created = Directory.objects.get_or_create(name='root')
    subdir_test, created = Directory.objects.get_or_create(name='subdir', parent=root)

    return HttpResponse("Base directory created")



class DirectoryViewSet(ModelViewSet):
    serializer_class = DirectorySerializer

    def get_queryset(self):
        return Directory.objects.filter(pk=self.kwargs['directory_pk'])

class DirectoryCreateViewSet(ModelViewSet):
    serializer_class = DirectoryCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        parent_directory = Directory.objects.get(pk=self.kwargs['directory_pk'])
        new_directory = Directory.objects.create(
            name=serializer.validated_data['name'],
            parent=parent_directory
        )
        
        new_directory.save()  # This will trigger the save method to set full_path
        
        serializer = DirectorySerializer(new_directory)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return Directory.objects.get(pk=self.kwargs['directory_pk']).subdirectories.all()

class FileViewSet(ModelViewSet):
    serializer_class = FileSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['directory_pk'] = self.kwargs['directory_pk']
        return context
    
    def create(self, request, *args, **kwargs):
        directory_pk = self.kwargs['directory_pk']
        file_name = request.data.get('file').name
        directory = Directory.objects.get(pk=directory_pk)

        # Check if a file with the same name already exists in the directory
        if File.objects.filter(directory=directory, name=file_name).exists():
            return Response(
                {"error": f"A file with the name '{file_name}' already exists in this directory."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        return File.objects.filter(directory=self.kwargs['directory_pk'])