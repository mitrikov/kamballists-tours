from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Tour
from .serializers import TourSerializer
from .recommendations import get_recommendations_for_user
from collections import namedtuple
import json



nt = namedtuple("object", ["model", "serializers"])
pattern = {
    "tours": nt(Tour, TourSerializer)
}





data = {
    "global": {
        "name": "satyam kumar",
        "age": 21,
        "Place": "Patna",
        "Blood group": "O+"
    }
}


@api_view(['GET'])
def list_view(request):

    if request.method == "GET":
        return Response(json.dumps(data))

@api_view(['GET'])
def get_recommended_events(request, oid):
    if request.method == "GET":
        recommended_items = get_recommendations_for_user(oid)
        return Response(json.dumps(recommended_items))
