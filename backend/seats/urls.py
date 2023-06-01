from django.urls import path
from .views import *

app_name = "seats"

urlpatterns = [
    path("templates/", TemplatesList.as_view(), name="seats_home"),
    path("exams/", ExamsList.as_view(), name="seats_home"),
    path("students/", StudentsList.as_view(), name="seats_home"),
    path("roomdata/", RoomData.as_view(), name="seats_home"),
    path("rooms/", RoomsList.as_view(), name="seats_home"),
    path("years/", YearsList.as_view(), name="seats_home"),
    path("departments/", DepartmentList.as_view(), name="seats_home"),
    path("buildings/", BuildingsList.as_view(), name="seats_home"),
    path("degrees/", DegreesList.as_view(), name="seats_home"),
    path("createtemplates/", CreateTemplates.as_view(), name="seats_home"),
    path("createexams/", CreateExams.as_view(), name="seats_home"),
    path("deleteexams/<str:exam_name>", DeleteExams.as_view(), name="seats_home"),
    path('get-image/<path:image_path>',
         GetImageView.as_view(), name='get_image'),
    path('logos/', LogoList.as_view(), name='logos'),
]
