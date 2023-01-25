from django.shortcuts import render
from rest_framework import generics, status

from .models import Cseii, Mechii, ExamTemplate
from .serializers import CseiiSerializer, MechiiSerializer, ExamTemplateSerializer, CreateExamTemplateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class CseiiList(generics.ListAPIView):
    queryset = Cseii.objects.all()
    serializer_class = CseiiSerializer


class MechiiList(generics.ListAPIView):
    queryset = Mechii.objects.all()
    serializer_class = MechiiSerializer


class ExamTemplateList(generics.ListAPIView):
    queryset = ExamTemplate.objects.all(()
    serializer_class=ExamTemplateSerializer

class CreateRoomView(APIView):
    serializer_class=CreateExamTemplateSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            rows=serializer.data.rows
            columns=serializer.data.columns
            room_strength=serializer.data.room_strength
            count_in_bench=serializer.data.count_in_bench
            rooms=serializer.data.rooms
            queryset = 
