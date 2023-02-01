from django.urls import path

from .views import CseiiList, MechiiList, ExamTemplateList, CreateExamTemplateView, RoomDataList, StudentsList, ExamList

app_name = "seats"

urlpatterns = [
    path("cseii/", CseiiList.as_view(), name="seats_home"),
    path("mechii/", MechiiList.as_view(), name="seats_home"),
    path("examtemplate/", ExamTemplateList.as_view(), name="seats_home"),
    path("createexamtemplate/", CreateExamTemplateView.as_view(), name="seats_home"),
    path("roomdata/",  RoomDataList.as_view(), name="seats_home"),
    path("students/",  StudentsList.as_view(), name="seats_home"),
    path("exam/", ExamList.as_view(), name="seats_home"),

]