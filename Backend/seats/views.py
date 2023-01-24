from django.shortcuts import render
from rest_framework import generics

from .models import Cseii, Mechii
from .serializers import CseiiSerializer, MechiiSerializer

class CseiiList(generics.ListAPIView):
    queryset = Cseii.objects.all()
    serializer_class = CseiiSerializer

class MechiiList(generics.ListAPIView):
    queryset = Mechii.objects.all()
    serializer_class = MechiiSerializer
