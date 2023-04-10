from rest_framework import serializers
from .models import *


class YearsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Years
        fields = '__all__'


class BuildingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buildings
        fields = '__all__'


class RoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = '__all__'


class DepartmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = '__all__'


class DegreesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degrees
        fields = '__all__'


class SubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = '__all__'


class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'


class LogosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logos
        fields = '__all__'


class TemplatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Templates
        fields = '__all__'


class ExamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exams
        fields = '__all__'

class RoomDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomData
        fields = '__all__'

class LogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logos
        fields = '__all__'