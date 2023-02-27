from django.contrib import admin
from .models import *
from django.urls import path
from django.shortcuts import render
from django import forms
from django.contrib import messages
from django.http import HttpResponseRedirect


class CSVImportForm(forms.Form):
    csv_file = forms.FileField()

class DepartmentsAdmin(admin.ModelAdmin):
    list_display = ("branch", "branch_code")

class RoomsAdmin(admin.ModelAdmin):
    list_display = ("room_no", "room_block", "room_floor", "room_strength", "room_building")
    
class BuildingAdmin(admin.ModelAdmin):
    list_display = ("building_name", )

class YearsAdmin(admin.ModelAdmin):
    list_display = ("year", )

class StudentsAdmin(admin.ModelAdmin):

    list_display = ("name", "registerno", "dept", "year")
    search_fields = ("registerno", "name")
    list_filter = ("dept", "year", "degree")

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

class CseiiAdmin(admin.ModelAdmin):

    
    list_display = ("name", "registerno")
    ordering = ("registerno",)

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('upload-csv/', self.upload_csv)]
        return new_urls + urls

    def upload_csv(self, request):

        if request.method == "POST":
            print(request.FILES)
            csv_file = request.FILES["csv_file"]
            print(csv_file.name)

            if not csv_file.name.endswith('.csv'):
                messages.warning(request, 'This is not a csv file')
                return HttpResponseRedirect(request.path_info)

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\r\n")
            try:
                for x in csv_data:
                    fields = x.split(",")
                    created = Cseii.objects.update_or_create(
                        registerno=fields[0],
                        name=fields[1],
                        gender=fields[2],
                        dept=fields[3],
                        year=fields[4],
                    )
            except IndexError:
                messages.success(request, 'Data Uploaded Successfully')
                return HttpResponseRedirect(request.path_info)
                pass

        form = CSVImportForm()
        data = {"form": form}
        return render(request, 'admin/csv_upload.html', data)

class CseiiiAdmin(admin.ModelAdmin):

    
    list_display = ("name", "registerno")
    ordering = ("registerno",)

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('upload-csv/', self.upload_csv)]
        return new_urls + urls

    def upload_csv(self, request):

        if request.method == "POST":
            print(request.FILES)
            csv_file = request.FILES["csv_file"]
            print(csv_file.name)

            if not csv_file.name.endswith('.csv'):
                messages.warning(request, 'This is not a csv file')
                return HttpResponseRedirect(request.path_info)

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\r\n")
            try:
                for x in csv_data:
                    fields = x.split(",")
                    created = Cseiii.objects.update_or_create(
                        registerno=fields[0],
                        name=fields[1],
                        gender=fields[2],
                        dept=fields[3],
                        year=fields[4],
                    )
            except IndexError:
                messages.success(request, 'Data Uploaded Successfully')
                return HttpResponseRedirect(request.path_info)
                pass

        form = CSVImportForm()
        data = {"form": form}
        return render(request, 'admin/csv_upload.html', data)

class MechiiAdmin(admin.ModelAdmin):

    
    list_display = ("name", "registerno")
    ordering = ("registerno",)

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('upload-csv/', self.upload_csv)]
        return new_urls + urls

    def upload_csv(self, request):

        if request.method == "POST":
            print(request.FILES)
            csv_file = request.FILES["csv_file"]
            print(csv_file.name)

            if not csv_file.name.endswith('.csv'):
                messages.warning(request, 'This is not a csv file')
                return HttpResponseRedirect(request.path_info)

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\r\n")
            try:
                for x in csv_data:
                    fields = x.split(",")
                    created = Mechii.objects.update_or_create(
                        registerno=fields[0],
                        name=fields[1],
                        gender=fields[2],
                        dept=fields[3],
                        year=fields[4],
                    )
                
                
            except IndexError:
                messages.success(request, 'Data Uploaded Successfully')
                return HttpResponseRedirect(request.path_info)

        form = CSVImportForm()
        data = {"form": form}
        return render(request, 'admin/csv_upload.html', data)


class MechiiiAdmin(admin.ModelAdmin):

    list_display = ("name", "registerno")
    ordering = ("registerno",)

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('upload-csv/', self.upload_csv)]
        return new_urls + urls

    def upload_csv(self, request):

        if request.method == "POST":
            print(request.FILES)
            csv_file = request.FILES["csv_file"]
            print(csv_file.name)

            if not csv_file.name.endswith('.csv'):
                messages.warning(request, 'This is not a csv file')
                return HttpResponseRedirect(request.path_info)

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\r\n")
            try:
                for x in csv_data:
                    fields = x.split(",")
                    created = Mechiii.objects.update_or_create(
                        registerno=fields[0],
                        name=fields[1],
                        gender=fields[2],
                        dept=fields[3],
                        year=fields[4],
                    )
                

            except IndexError:
                messages.success(request, 'Data Uploaded Successfully')
                return HttpResponseRedirect(request.path_info)

        form = CSVImportForm()
        data = {"form": form}
        return render(request, 'admin/csv_upload.html', data)


class ItiiAdmin(admin.ModelAdmin):

    list_display = ("name", "registerno")
    ordering = ("registerno",)

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('upload-csv/', self.upload_csv)]
        return new_urls + urls

    def upload_csv(self, request):

        if request.method == "POST":
            print(request.FILES)
            csv_file = request.FILES["csv_file"]
            print(csv_file.name)

            if not csv_file.name.endswith('.csv'):
                messages.warning(request, 'This is not a csv file')
                return HttpResponseRedirect(request.path_info)

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\r\n")
            try:
                for x in csv_data:
                    fields = x.split(",")
                    created = Itii.objects.update_or_create(
                        registerno=fields[0],
                        name=fields[1],
                        gender=fields[2],
                        dept=fields[3],
                        year=fields[4],
                    )
                

            except IndexError:
                messages.success(request, 'Data Uploaded Successfully')
                return HttpResponseRedirect(request.path_info)

        form = CSVImportForm()
        data = {"form": form}
        return render(request, 'admin/csv_upload.html', data)


class ItiiiAdmin(admin.ModelAdmin):

    list_display = ("name", "registerno")
    ordering = ("registerno",)

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('upload-csv/', self.upload_csv)]
        return new_urls + urls

    def upload_csv(self, request):

        if request.method == "POST":
            print(request.FILES)
            csv_file = request.FILES["csv_file"]
            print(csv_file.name)

            if not csv_file.name.endswith('.csv'):
                messages.warning(request, 'This is not a csv file')
                return HttpResponseRedirect(request.path_info)

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\r\n")
            try:
                for x in csv_data:
                    fields = x.split(",")
                    created = Itiii.objects.update_or_create(
                        registerno=fields[0],
                        name=fields[1],
                        gender=fields[2],
                        dept=fields[3],
                        year=fields[4],
                    )
                

            except IndexError:
                messages.success(request, 'Data Uploaded Successfully')
                return HttpResponseRedirect(request.path_info)

        form = CSVImportForm()
        data = {"form": form}
        return render(request, 'admin/csv_upload.html', data)

class MctiiAdmin(admin.ModelAdmin):

    list_display = ("name", "registerno")
    ordering = ("registerno",)

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('upload-csv/', self.upload_csv)]
        return new_urls + urls

    def upload_csv(self, request):

        if request.method == "POST":
            print(request.FILES)
            csv_file = request.FILES["csv_file"]
            print(csv_file.name)

            if not csv_file.name.endswith('.csv'):
                messages.warning(request, 'This is not a csv file')
                return HttpResponseRedirect(request.path_info)

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\r\n")
            try:
                for x in csv_data:
                    fields = x.split(",")
                    created = Mctii.objects.update_or_create(
                        registerno=fields[0],
                        name=fields[1],
                        gender=fields[2],
                        dept=fields[3],
                        year=fields[4],
                    )
                

            except IndexError:
                messages.success(request, 'Data Uploaded Successfully')
                return HttpResponseRedirect(request.path_info)

        form = CSVImportForm()
        data = {"form": form}
        return render(request, 'admin/csv_upload.html', data)


class CiviliiAdmin(admin.ModelAdmin):

    list_display = ("name", "registerno")
    ordering = ("registerno",)

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('upload-csv/', self.upload_csv)]
        return new_urls + urls

    def upload_csv(self, request):

        if request.method == "POST":
            print(request.FILES)
            csv_file = request.FILES["csv_file"]
            print(csv_file.name)

            if not csv_file.name.endswith('.csv'):
                messages.warning(request, 'This is not a csv file')
                return HttpResponseRedirect(request.path_info)

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\r\n")
            try:
                for x in csv_data:
                    fields = x.split(",")
                    created = Civilii.objects.update_or_create(
                        registerno=fields[0],
                        name=fields[1],
                        gender=fields[2],
                        dept=fields[3],
                        year=fields[4],
                    )
                

            except IndexError:
                messages.success(request, 'Data Uploaded Successfully')
                return HttpResponseRedirect(request.path_info)

        form = CSVImportForm()
        data = {"form": form}
        return render(request, 'admin/csv_upload.html', data)





admin.site.register(ExamTemplate)
admin.site.register(Cseii, CseiiAdmin)
admin.site.register(Cseiii, CseiiiAdmin)
admin.site.register(Mechii, MechiiAdmin)
admin.site.register(Mechiii, MechiiiAdmin)
admin.site.register(Itii, ItiiAdmin)
admin.site.register(Itiii, ItiiiAdmin)
admin.site.register(Mctii, MctiiAdmin)
admin.site.register(Civilii, CiviliiAdmin)
admin.site.register(RoomData)
admin.site.register(Students, StudentsAdmin)
admin.site.register(NeededDocuments)
admin.site.register(Exam)
admin.site.register(Departments)
admin.site.register(Rooms, RoomsAdmin)
admin.site.register(Buildings, BuildingAdmin)
admin.site.register(Years, YearsAdmin)

# admin.site.site_header = "Seat Allocation System"
# admin.site.site_title = "Seat Allocation System"
# admin.site.index_title = "Welcome to Seat Allocation System"

# Register your models here.
