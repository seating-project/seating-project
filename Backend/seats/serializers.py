from rest_framework import serializers
from .models import Cseii, Mechii


class CseiiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cseii
        fields = '__all__'


class MechiiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mechii
        fields = '__all__'
