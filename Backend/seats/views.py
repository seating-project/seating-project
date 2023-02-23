from django.shortcuts import render
from rest_framework import generics, status
from .models import Cseii, Mechii, ExamTemplate, Students, RoomData, Exam, Departments
from .serializers import CseiiSerializer, MechiiSerializer, ExamTemplateSerializer, CreateExamTemplateSerializer, RoomDataSerializer, StudentsSerializer, ExamSerializer, CreateExamSerializer, DepartmentsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from asgiref.sync import async_to_sync, sync_to_async
from django.shortcuts import get_object_or_404
import asyncio
from asyncio import run_coroutine_threadsafe
from django.db.models.functions.math import Random
import random
from .services import Allotments

DEPT = {
    '104': "CSE",
    '114': "MECH",
    '115': "MCT",
    '205': "IT",
    '103': "CIVIL",
    '105': "EEE",
    '106': "ECE",
    '243': "AIDS",
    '121': "BME",
    '244': "CSBS",
}

class CseiiList(generics.ListAPIView):
    queryset = Cseii.objects.all()
    serializer_class = CseiiSerializer


class MechiiList(generics.ListAPIView):
    queryset = Mechii.objects.all()
    serializer_class = MechiiSerializer


class ExamTemplateList(generics.ListAPIView):
    queryset = ExamTemplate.objects.all()
    serializer_class=ExamTemplateSerializer

class CreateExamTemplateView(APIView):
    serializer_class=CreateExamTemplateSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'ExamTemplate could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

class DeptList(generics.ListAPIView):
    queryset = Departments.objects.all()
    serializer_class = DepartmentsSerializer


class RoomDataList(generics.ListAPIView):
    serializer_class = RoomDataSerializer
    queryset = RoomData.objects.all()
    
class StudentsList(generics.ListAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializer

class ExamList(generics.ListAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class CreateExamView(APIView):
    serializer_class=CreateExamSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            Allotments(serializer.validated_data)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Exam could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


