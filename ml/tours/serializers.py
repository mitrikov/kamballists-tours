from .models import Tour
from rest_framework import fields, serializers


class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ("id", "data")
