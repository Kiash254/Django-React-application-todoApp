from django.db import models

# Create your models here.
# models.py

from django.db import models

class Blog(models.Model):
    image = models.ImageField(upload_to='blog_images/')
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title