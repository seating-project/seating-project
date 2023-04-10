from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Years(models.Model):
    year = models.IntegerField(primary_key=True, blank=False)

    class Meta:
        verbose_name = 'Year'
        verbose_name_plural = 'Years'

    def __str__(self):
        return str(self.year)


class Degrees(models.Model):
    degree = models.CharField(max_length=10, primary_key=True, blank=False)
    degree_full_name = models.CharField(max_length=80, blank=False)
    degree_duration = models.IntegerField(blank=False)

    class Meta:
        verbose_name = 'Degree'
        verbose_name_plural = 'Degrees'

    def __str__(self):
        return self.degree_full_name


class Departments(models.Model):

    class CNPOptions(models.TextChoices):
        C = "C", "Circuit"
        N = "N", "Non-Circuit"
        P = "P", "PhD"

    branch = models.CharField(max_length=80, blank=False)
    branch_short_name = models.CharField(max_length=10, blank=False, primary_key=True)
    branch_code = models.CharField(max_length=10, blank=False)
    degree = models.ForeignKey(Degrees, on_delete=models.DO_NOTHING, default="UG")
    ctype = models.CharField(max_length=1, blank=False, choices=CNPOptions.choices, default="C")
    class Meta:
        verbose_name = 'Department'
        verbose_name_plural = 'Departments'

    def __str__(self):
        return self.branch


class Students(models.Model):

    class GenderOptions(models.TextChoices):
        MALE = "M", "Male"
        FEMALE = "F", "Female"

    class CNPOptions(models.TextChoices):
        C = "C", "Circuit"
        N = "N", "Non-Circuit"
        P = "P", "PhD"

    register_number = models.CharField(
        max_length=20, primary_key=True, blank=False)
    name = models.CharField(max_length=50, blank=False)
    gender = models.CharField(
        max_length=1, choices=GenderOptions.choices, blank=False)
    department = models.ForeignKey(Departments, on_delete=models.DO_NOTHING)
    year = models.ForeignKey(Years, on_delete=models.DO_NOTHING)
    ctype = models.CharField(max_length=1, blank=False, choices=CNPOptions.choices)
    degree = models.ForeignKey(Degrees, on_delete=models.DO_NOTHING)
    phone_number = PhoneNumberField(blank=True)

    class Meta:
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    class PhDStudentManager(models.Manager):
        def query_set(self):
            return super().get_queryset().filter(ctype='P')

    def __str__(self):
        return self.register_number


class Buildings(models.Model):
    building_name = models.CharField(
        max_length=50, primary_key=True, blank=False)
    building_blocks = models.JSONField()

    class Meta:
        verbose_name = 'Building'
        verbose_name_plural = 'Buildings'

    def __str__(self):
        return self.building_name


class Rooms(models.Model):
    room_number = models.CharField(
        max_length=10, primary_key=True, blank=False)
    room_floor = models.IntegerField(blank=False)
    room_strength = models.IntegerField(blank=False, default=60)
    room_building = models.ForeignKey(Buildings, on_delete=models.DO_NOTHING)
    room_block = models.CharField(max_length=10, blank=True)

    class Meta:
        verbose_name = 'Room'
        verbose_name_plural = 'Rooms'

    def __str__(self):
        return self.room_number


class Subjects(models.Model):
    subject_name = models.CharField(max_length=50, blank=False)
    subject_code = models.CharField(
        max_length=10, primary_key=True, blank=False)
    subject_in_departments = models.ManyToManyField(Departments)

    class Meta:
        verbose_name = 'Subject'
        verbose_name_plural = 'Subjects'

    def __str__(self):
        return self.subject_name


class Logos(models.Model):
    image = models.ImageField(upload_to='logos/', blank=False)

    class Meta:
        verbose_name = 'Logo'
        verbose_name_plural = 'Logos'

    def __str__(self):
        return self.image.name


class Templates(models.Model):
    template_name = models.CharField(
        max_length=50, primary_key=True, blank=False)
    number_of_rows = models.IntegerField(blank=False)
    number_of_columns = models.IntegerField(blank=False)
    room_strength = models.IntegerField(blank=False)
    rooms = models.ManyToManyField(Rooms)
    is_single_seater = models.BooleanField()
    is_boys_girls_separation = models.BooleanField()
    buildings = models.ManyToManyField(Buildings)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_alternate_dept_seated = models.BooleanField()
    logo = models.ForeignKey(Logos, on_delete=models.DO_NOTHING)

    class Meta:
        verbose_name = 'Template'
        verbose_name_plural = 'Templates'

    def __str__(self):
        return self.template_name


class Exams(models.Model):

    class SecondColumnOptions(models.TextChoices):
        SEAT_NUMBER = 'Seat Number', 'Seat Number'
        SET_CODE = 'Set Code', 'Set Code'
        PRESENT_ABSENT = 'Present/Absent', 'Present/Absent'

    exam_name = models.CharField(max_length=50, primary_key=True, blank=False)
    from_date = models.DateField()
    to_date = models.DateField()
    exam_template = models.ForeignKey(Templates, on_delete=models.DO_NOTHING)
    years = models.ManyToManyField(Years)
    departments = models.JSONField()
    time_table = models.JSONField()
    is_phd = models.BooleanField()
    phd_students = models.ManyToManyField(Students, limit_choices_to={'ctype': 'P'}, blank=True)
    phd_room = models.ForeignKey(Rooms, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='phd_room')
    is_me = models.BooleanField()
    me_room = models.ForeignKey(Rooms, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='me_room')
    is_years_together = models.BooleanField()
    is_departments_together = models.BooleanField()
    is_send_whatsapp_message = models.BooleanField()
    time_to_send_whatsapp_message = models.TimeField(blank=True, null=True)
    sets_for_which_subjects = models.ManyToManyField(Subjects, blank=True )
    no_of_sets = models.IntegerField(blank=True, null=True)
    second_column_options = models.CharField(max_length=20, choices=SecondColumnOptions.choices, default=SecondColumnOptions.SEAT_NUMBER)

    class Meta:
        verbose_name = 'Exam'
        verbose_name_plural = 'Exams'

    def __str__(self):
        return self.exam_name


class RoomData(models.Model):
    id = models.AutoField(primary_key=True)
    exam = models.ForeignKey(Exams, on_delete=models.CASCADE)
    rooms = models.JSONField()
    ranges = models.JSONField()

    class Meta:
        verbose_name = 'Room Data'
        verbose_name_plural = 'Room Data'


class ScheduledMessages(models.Model):
    id = models.AutoField(primary_key=True)
    exam = models.ForeignKey(Exams, on_delete=models.DO_NOTHING)
    message = models.TextField()
    time = models.TimeField()
    to = PhoneNumberField()

    class Meta:
        verbose_name = 'Scheduled Message'
        verbose_name_plural = 'Scheduled Messages'

    def __str__(self):
        return self.message
