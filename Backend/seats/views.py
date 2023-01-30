from django.shortcuts import render
from rest_framework import generics, status

from .models import Cseii, Mechii, ExamTemplate, Students, RoomData
from .serializers import CseiiSerializer, MechiiSerializer, ExamTemplateSerializer, CreateExamTemplateSerializer, RoomDataSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from asgiref.sync import async_to_sync, sync_to_async
from django.shortcuts import get_object_or_404
import asyncio
from asyncio import run_coroutine_threadsafe



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

# class RoomDataList(generics.ListAPIView):
#     serializer_class = RoomDataSerializer
    
#     def get(self, request, format=None):
#         loop = asyncio.new_event_loop()
#         asyncio.set_event_loop(loop)
#         future = run_coroutine_threadsafe(self.async_get(request, format), loop)
#         queryset = future.result()
#         return Response(queryset)

#     async def async_get(self, request, format=None):
#         curr_template = get_object_or_404(ExamTemplate, id=1)
#         RoomData.objects.all().delete()

#         room = ['F1', 'F2', 'F3']
#         ckt_array = Students.objects.filter(ctype='C').values_list('registerno', 'dept')
#         ckt_array = list(ckt_array)
#         nckt_array = Students.objects.filter(ctype='N').values_list('registerno', 'dept')
#         nckt_array = list(nckt_array)

#         room_dict = {}
#         curr_room = []
#         c = 0
#         f = 0
#         for i in room:
#             for j in range(curr_template.room_strength):
#                 if c >= len(ckt_array) and c >= len(nckt_array):
#                     f = 1
#                     break
#                 try:
#                     if ckt_array[c] and nckt_array[c]:
#                         curr_room.append([ckt_array[c], nckt_array[c]])
#                     elif ckt_array[c]:
#                         curr_room.append([ckt_array[c], 0])
#                     elif nckt_array[c]:
#                         curr_room.append([0, nckt_array[c]])
#                     else:
#                         break
#                     c += 1
#                 except IndexError:
#                     try:
#                         if nckt_array[c]:
#                             curr_room.append([0, nckt_array[c]])
#                     except:
#                         if ckt_array[c]:
#                             curr_room.append([ckt_array[c], 0])
#                     c += 1
#             room_dict[i] = curr_room
#             curr_room = []
#             if f == 1:
#                 break

#         try:
#             i = room[(room.index(i) + 1)]
#             room = room[(room.index(i)):]
#         except:
#             pass
#         model = RoomData(rooms=room_dict)
#         model.save()
#         queryset = RoomData.objects.all().values()
#         return queryset


class RoomDataList(generics.ListAPIView):
    
    curr_template = ExamTemplate.objects.filter(id=1)[0]
    print(curr_template.rooms)
    RoomData.objects.all().delete()

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
    
    try:
        i = room[(room.index(i)+1)]
        room = room[(room.index(i)):]
    except:
        pass
    model = RoomData(rooms=room_dict)
    model.save()
    queryset = RoomData.objects.all()







