from django.db import models

class Directory(models.Model):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subdirectories')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    full_path = models.CharField(max_length=255, primary_key=True)

    def save(self, *args, **kwargs):
        if self.parent:
            self.full_path = self.parent.full_path + "-" + self.name
        else:
            self.full_path = self.name
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Directories"

class File(models.Model):
    full_path = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    directory = models.ForeignKey(Directory, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to='files/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        self.name = self.file.name
        self.full_path = self.directory.full_path + "-" + self.name.replace(' ', '_')
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Test(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)