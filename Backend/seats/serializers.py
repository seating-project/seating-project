from rest_framework import serializers
from .models import *


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buildings
        fields = '__all__'


class YearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Years
        fields = '__all__'


class DepartmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    room_building_name = serializers.ReadOnlyField(
        source='room_building.building_name')

    class Meta:
        model = Rooms
        fields = ("room_no", "room_floor", "room_building_name", "room_strength", "room_block" )


class CseiiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cseii
        fields = '__all__'


class MechiiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mechii
        fields = '__all__'


class ExamTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamTemplate
        fields = '__all__'


class CreateExamTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamTemplate
        fields = '__all__'


class RoomDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomData
        fields = '__all__'


class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'


class CreateExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'
