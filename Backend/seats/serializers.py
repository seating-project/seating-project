from rest_framework import serializers
from .models import Cseii, Mechii, ExamTemplate, Students, RoomData, Exam, Departments


class DepartmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = '__all__'


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

