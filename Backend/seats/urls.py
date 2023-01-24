from django.urls import path

from .views import CseiiList, MechiiList

app_name = "seats"

urlpatterns = [
    path("cseii/", CseiiList.as_view(), name="seats_home"),
    path("mechii/", MechiiList.as_view(), name="seats_home"),
]