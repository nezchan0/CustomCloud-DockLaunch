from django.db import models

# Create your models here.

class Deployment(models.Model):
    repo_url = models.URLField()
    container_id = models.CharField(max_length=100)
    ngrok_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Deployment of {self.repo_url} ({self.container_id})"
