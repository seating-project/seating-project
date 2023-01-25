from rest_framework import serializers
from .models import Cseii, Mechii, ExamTemplate


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