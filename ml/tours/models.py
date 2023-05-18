from django.db import models


class Tour(models.Model):
    id = models.IntegerField(primary_key=True)
    data = models.CharField(max_length=60)

    def __str__(self):
        return self.name