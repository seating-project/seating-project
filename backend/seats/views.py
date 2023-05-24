from django.shortcuts import render
from rest_framework import generics, status
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .services import Allotments

from django.views import View
from django.http import HttpResponse
from django.conf import settings
from django.views.static import serve

class TemplatesList(generics.ListAPIView):
    queryset = Templates.objects.all()
    serializer_class = TemplatesSerializer



class CreateTemplates(APIView):
    serializer_class = TemplatesSerializer

    def post(self, request, format=None):
        serializer = TemplatesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Template could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
class DepartmentList(generics.ListAPIView):
    queryset = Departments.objects.all()
    serializer_class = DepartmentsSerializer

class RoomsList(generics.ListAPIView):
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer

class RoomData(generics.ListAPIView):
    queryset = RoomData.objects.all()
    serializer_class = RoomDataSerializer

class YearsList(generics.ListAPIView):
    queryset = Years.objects.all()
    serializer_class = YearsSerializer

class BuildingsList(generics.ListAPIView):
    queryset = Buildings.objects.all()
    serializer_class = BuildingsSerializer

class DegreesList(generics.ListAPIView):
    queryset = Degrees.objects.all()
    serializer_class = DegreesSerializer

class StudentsList(generics.ListAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializer

class CreateExams(APIView):
    serializer_class = ExamsSerializer

    def post(self, request, format=None):
        serializer = ExamsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            Allotments(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Exam could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


class ExamsList(generics.ListAPIView):
    queryset = Exams.objects.all()
    serializer_class = ExamsSerializer

class LogoList(generics.ListAPIView):
    queryset = Logos.objects.all()
    serializer_class = LogoSerializer

class GetImageView(View):
    def get(self, request, image_path, *args, **kwargs):
        image_full_path = f"{settings.MEDIA_ROOT}/{image_path}"
        return serve(request, image_full_path, document_root=settings.MEDIA_ROOT)
    
class DeleteExams(APIView):
    serializer_class = ExamsSerializer
    
    def delete(self, request, format=None):
        serializer = ExamsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.delete()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({
            'status': 'Bad request',
            'message': 'Exam could not be deleted with received data.'
        }, status=status.HTTP_400_BAD_REQUEST
        )
    
class DeleteTemplates(APIView):
    
    serializer_class = TemplatesSerializer

    def delete(self, request, format=None):
        serializer = TemplatesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.delete()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({
            'status': 'Bad request',
            'message': 'Template could not be deleted with received data.'
        }, status=status.HTTP_400_BAD_REQUEST
        )