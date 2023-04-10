from django.contrib import admin
from .models import *
from django.urls import path
from django.shortcuts import render
from django import forms
from django.contrib import messages
from django.http import HttpResponseRedirect


class CSVImportForm(forms.Form):
    csv_file = forms.FileField()


class StudentsAdmin(admin.ModelAdmin):

    list_display = ("name", "register_number", "department", "year")
    search_fields = ("register_number", "name")
    list_filter = ("department", "year", "degree")

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('upload-csv/', self.upload_csv)]
        return new_urls + urls

    def upload_csv(self, request):

        if request.method == "POST":
            print(request.FILES)
            csv_file = request.FILES["csv_file"]

            if not csv_file.name.endswith('.csv'):
                messages.warning(request, 'This is not a csv file')
                return HttpResponseRedirect(request.path_info)

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\r\n")
            try:
                for x in csv_data:
                    fields = x.split(",")
                    created = Students.objects.update_or_create(
                        registerno=fields[0],
                        name=fields[1],
                        gender=fields[2],
                        dept=fields[3],
                        year=fields[4],
                        ctype=fields[5],
                    )
            except IndexError:
                messages.success(request, 'Data Uploaded Successfully')
                return HttpResponseRedirect(request.path_info)
                pass

        form = CSVImportForm()
        data = {"form": form}
        return render(request, 'admin/csv_upload.html', data)


class DepartmentsAdmin(admin.ModelAdmin):
    list_display = ("branch", "branch_code")


class RoomsAdmin(admin.ModelAdmin):
    list_display = ("room_number", "room_block", "room_floor",
                    "room_strength", "room_building")
    ordering = ("room_number", )


class BuildingAdmin(admin.ModelAdmin):
    list_display = ("building_name", )


class YearsAdmin(admin.ModelAdmin):
    list_display = ("year", )
    ordering = ("year", )


class LogoAdmin(admin.ModelAdmin):
    list_display = ("image", )


class SubjectsAdmin(admin.ModelAdmin):
    list_display = ("subject_code", "subject_name")
    ordering = ("subject_code", )


admin.site.register(Students, StudentsAdmin)
admin.site.register(Departments, DepartmentsAdmin)
admin.site.register(Buildings, BuildingAdmin)
admin.site.register(Rooms, RoomsAdmin)
admin.site.register(Years, YearsAdmin)
admin.site.register(Templates)
admin.site.register(Degrees)
admin.site.register(Exams)
admin.site.register(RoomData)
admin.site.register(Logos, LogoAdmin)
admin.site.register(Subjects, SubjectsAdmin)
