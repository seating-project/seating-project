from django.shortcuts import render
from rest_framework import generics, status
from .models import Cseii, Mechii, ExamTemplate, Students, RoomData, Exam
from .serializers import CseiiSerializer, MechiiSerializer, ExamTemplateSerializer, CreateExamTemplateSerializer, RoomDataSerializer, StudentsSerializer, ExamSerializer, CreateExamSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from asgiref.sync import async_to_sync, sync_to_async
from django.shortcuts import get_object_or_404
import asyncio
from asyncio import run_coroutine_threadsafe
from django.db.models.functions.math import Random
import random

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


class RoomDataList(generics.ListAPIView):
    pass
    # curr_template = ExamTemplate.objects.filter(id=1)[0]
    # RoomData.objects.all().delete()

    # room = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16']
    room = curr_template.rooms["rooms"]
    # def rotateArray(a,d):
    #     temp = []
    #     n=len(a)
    #     for i in range(d,n):
    #         temp.append(a[i])
    #     i = 0
    #     for i in range (0,d):
    #         temp.append(a[i])
    #     a=temp.copy()
    #     return a
    # ro = rotateArray(room, random.randint(0,5))
    # room = ro
    serializer_class = RoomDataSerializer
    all_depts = Students.objects.filter(year=1).values_list('dept')
    all_depts = list(all_depts)
    all_students = Students.objects.filter(year=1).values_list('registerno', 'dept')
    all_students = list(all_students)
    # ckt_array = Students.objects.filter(ctype='C').order_by(Random(), 'dept').values_list('registerno', 'dept','year')
    ckt_array = Students.objects.filter(ctype='C', year=1).values_list('registerno', 'dept','year').exclude(dept='it')
    it_stuff = Students.objects.filter(dept='it', year=1).values_list('registerno', 'dept','year')
    ckt_array = list(ckt_array) 
    nckt_array = Students.objects.filter(ctype='N', year=1).values_list('registerno', 'dept', 'year')
    # nckt_array = Students.objects.filter(ctype='N').order_by(Random(), 'dept').values_list('registerno', 'dept', 'year')
    nckt_array = list(nckt_array) + list(it_stuff)

    # if "Model" in curr_template .template_exam_name:
    #     if abs(len(ckt_array)-len(nckt_array)) > 64:
    #         if len(ckt_array)>len(nckt_array):
                

                

        


    ranges_dict = {}
    room_dict = {}
    curr_room = []
    c = 0
    f = 0
    depts = []
    for i in room:

    #     if curr_template.single_seater == True:

            for j in range(curr_template.room_strength):
                if c>=len(ckt_array) and c>=len(nckt_array):
                    f = 1
                    break
                try:
                    if ckt_array[c] and nckt_array[c]:
                        curr_room.append([ckt_array[c],0])

                        # curr_room.append([nckt_array[c],0])
                    elif ckt_array[c]:
                        # if "Model" in curr_template.template_exam_name:

                        curr_room.append([ckt_array[c],0])
                    elif nckt_array[c]:
                        curr_room.append([nckt_array[c],0])
                    else:
                        break
                    c+=1
                except IndexError:
                    try:
                        if nckt_array[c]:
                            curr_room.append([nckt_array[c],0])
                    except:
                        if ckt_array[c]:
                            curr_room.append([ckt_array[c],0])
                    c+=1
        else:
            strength = curr_template.room_strength//2
            for j in range(strength):
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
    
            
    #     room_dict[i] = curr_room
    #     curr_room = []
    #     if f == 1:
    #         break
    #     print()
    #     print("ROOM DICT", room_dict)
    #     for i in room_dict:
    #         print(i)
    #         for j in room_dict[i]:
    #             print(j)
    # for i in room_dict:
    #     ranges_dict[i] = {}

    #     if curr_template.single_seater == True:
    #         for j in room_dict[i]:
    #             if j[0] == 0:
    #                 continue
    #             if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]:
    #                 ranges_dict[i][j[0][1] + " " + str(j[0][2])] = []
    #             ranges_dict[i][j[0][1] + " " + str(j[0][2])].append(j[0])
    #     else:
    #         for j in room_dict[i]:
    #             if j[0] == 0:
    #                 continue
    #             if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]:
    #                 ranges_dict[i][j[0][1] + " " + str(j[0][2])] = []
    #             ranges_dict[i][j[0][1] + " " + str(j[0][2])].append(j[0])
        
    #         for j in room_dict[i]:
    #             if j[1] == 0:
    #                 continue
    #             if (j[1][1] + " " + str(j[1][2])) not in ranges_dict[i]:
    #                 ranges_dict[i][j[1][1] + " " + str(j[1][2])] = []
    #             ranges_dict[i][j[1][1] + " " + str(j[1][2])].append(j[1])
    # # print(ranges_dict)  
    # print()

            

    # try:
    #     i = room[(room.index(i)+1)]
    #     room = room[(room.index(i)):]
    # except:
    #     pass
    # model = RoomData(rooms=room_dict, ranges=ranges_dict)
    # model.save()
    # queryset = RoomData.objects.all()
    
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Exam could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)
