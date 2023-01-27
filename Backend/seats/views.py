from django.shortcuts import render
from rest_framework import generics, status

from .models import Cseii, Mechii, ExamTemplate, Students, RoomData
from .serializers import CseiiSerializer, MechiiSerializer, ExamTemplateSerializer, CreateExamTemplateSerializer, RoomDataSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import QueryDict


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

class RoomDataList(generics.ListAPIView):
    
    curr_template = ExamTemplate.objects.filter(id=1)[0]
    print(curr_template.rooms)

    room = ['F1', 'F2', 'F3']
    serializer_class = RoomDataSerializer
    ckt_array = Students.objects.filter(ctype='C').values_list('registerno', 'dept')
    ckt_array = list(ckt_array)
    nckt_array = Students.objects.filter(ctype='N').values_list('registerno', 'dept')
    nckt_array = list(nckt_array)

    room_dict = {}
    curr_room = []
    c = 0
    f = 0
    for i in room:
        for j in range(curr_template.room_strength):
            if c>=len(ckt_array) and c>=len(nckt_array):
                f = 1
                break
            try:
                if ckt_array[c] and nckt_array[c]:
                    curr_room.append([ckt_array[c], nckt_array[c]])
                elif ckt_array[c]:
                    curr_room.append([ckt_array[c], 0])
                elif nckt_array[c]:
                    curr_room.append([0, nckt_array[c]])
                else:
                    break
                c+=1
            except IndexError:
                try:
                    if nckt_array[c]:
                        curr_room.append([0, nckt_array[c]])
                except:
                    if ckt_array[c]:
                        curr_room.append([ckt_array[c], 0])
                c+=1
        print(curr_room)
        room_dict[i] = curr_room
        curr_room = []
        if f == 1:
            break
    
    model = RoomData(rooms=room_dict)
    model.save()
    queryset = RoomData.objects.all()

    





