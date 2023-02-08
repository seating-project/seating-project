# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Civilii(models.Model):
    registerno = models.BigIntegerField(
        primary_key=True, blank=True, null=False)
    name = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = 'Civil II'
        verbose_name_plural = 'Civil II'

    def __str__(self):
        return self.name


class Cseii(models.Model):

    registerno = models.BigIntegerField(
        primary_key=True, blank=True, null=False)
    name = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = 'CSE II'
        verbose_name_plural = 'CSE II'

    def __str__(self):
        return self.name


class Cseiii(models.Model):

    registerno = models.BigIntegerField(
        primary_key=True, blank=True, null=False)
    name = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = 'CSE III'
        verbose_name_plural = 'CSE III'

    def __str__(self):
        return self.name


class Itii(models.Model):

    registerno = models.BigIntegerField(
        primary_key=True, blank=True, null=False)
    name = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = 'IT II'
        verbose_name_plural = 'IT II'

    def __str__(self):
        return self.name


class Itiii(models.Model):

    registerno = models.BigIntegerField(
        primary_key=True, blank=True, null=False)
    name = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = 'IT III'
        verbose_name_plural = 'IT III'

    def __str__(self):
        return self.name


class Mctii(models.Model):

    registerno = models.BigIntegerField(
        primary_key=True, blank=True, null=False)
    name = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = 'MCT II'
        verbose_name_plural = 'MCT II'

    def __str__(self):
        return self.name


class Mechii(models.Model):

    registerno = models.BigIntegerField(
        primary_key=True, blank=True, null=False)
    name = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        verbose_name = 'MECH II'
        verbose_name_plural = 'MECH II'

    def __str__(self):
        return self.name


class Mechiii(models.Model):

    registerno = models.BigIntegerField(
        primary_key=True, blank=True, null=False)
    name = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = 'MECH III'
        verbose_name_plural = 'MECH III'

    def __str__(self):
        return self.name


class NeededDocuments(models.Model):
    needed_documents_id = models.BigAutoField(primary_key=True)
    need_room_allotments = models.BooleanField()
    need_notice_board_copies = models.BooleanField()
    need_master_hall_plan = models.BooleanField()
    need_attendance_sheets = models.BooleanField()
    need_proforma_3 = models.BooleanField()
    need_proforma_4 = models.BooleanField()
    need_proforma_5 = models.BooleanField()

    class Meta:
        verbose_name = 'Needed Documents'
        verbose_name_plural = 'Needed Documents'


class ExamTemplate(models.Model):
    id = models.CharField(primary_key=True, max_length=200, null=False)
    template_name = models.CharField(max_length=200)
    # template_exam_name = models.CharField(max_length=200, default='exam')
    num_rows = models.IntegerField(default=5)
    num_columns = models.IntegerField(default=6)
    room_strength = models.IntegerField(default=60)
    ##count_in_bench = models                                                                                           .IntegerField(default=2)
    rooms = models.JSONField()
    single_seater = models.BooleanField(default=False)
    boys_girls_separation = models.BooleanField(default=False)
    #needed_documents = models.ForeignKey(NeededDocuments, models.CASCADE)

    class Meta:
        verbose_name = 'Exam Template'
        verbose_name_plural = 'Exam Templates'

    def __str__(self):
        return self.template_name


class RoomData(models.Model):
    id = models.BigAutoField(primary_key=True, null=False)
    rooms = models.JSONField(blank=True, null=True)
    ranges = models.JSONField(blank=True, null=True)

    class Meta:
        verbose_name = 'Room Data'
        verbose_name_plural = 'Room Data'

    def __str__(self):
        return self.id


class Students(models.Model):

    registerno = models.CharField(max_length=20, primary_key=True, blank=True, null=False)
    name = models.TextField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    ctype = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        verbose_name='Student'
        verbose_name_plural='Students'

    def __str__(self):
        return self.name


class Timetable(models.Model):

    name = models.TextField(blank=True, null=True)
    date=models.DateField(blank=True, null=False, primary_key=True)
    civil=models.TextField(blank=True, null=True)
    cse=models.TextField(blank=True, null=True)
    eee=models.TextField(blank=True, null=True)
    ece=models.TextField(blank=True, null=True)
    mech=models.TextField(blank=True, null=True)
    mct=models.TextField(blank=True, null=True)
    bme=models.TextField(blank=True, null=True)
    it=models.TextField( blank=True, null=True)
    aids=models.TextField(blank=True, null=True)
    csbs=models.TextField(blank=True, null=True)

    class Meta:
        verbose_name='Time Table'
        verbose_name_plural='Time Tables'

    def __str__(self):
        return (self.date + " " + self.name)

class Exam(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=200)
    fromdate = models.DateField()
    todate = models.DateField()
    template = models.ForeignKey(ExamTemplate, models.CASCADE) 
    depts = models.JSONField()

    class Meta:
        verbose_name = 'Exam'
        verbose_name_plural = 'Exams'

    def __str__(self):
        return self.exam_name


# class RoomRanges(models.Model):
#     id = models.BigAutoField(primary_key=True, null=False)
#     room_range = models.JSONField(blank=True, null=True)

#     class Meta:
#         verbose_name = 'Room Ranges'
#         verbose_name_plural = 'Room Ranges'

#     def __str__(self):
#         return self.id