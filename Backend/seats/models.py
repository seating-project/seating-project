# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import json


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = "auth_group"


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True, null=False)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey("AuthPermission", models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "auth_group_permissions"
        unique_together = (("group", "permission"),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey("DjangoContentType", models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = "auth_permission"
        unique_together = (("content_type", "codename"),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "auth_user"


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "auth_user_groups"
        unique_together = (("user", "group"),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "auth_user_user_permissions"
        unique_together = (("user", "permission"),)


class Civilii(models.Model):
    sno = models.IntegerField(db_column="SNo", blank=True, null=True)  # Field name made lowercase.
    registerno = models.BigIntegerField(
        primary_key=True, db_column="RegisterNo", blank=True, null=False
    )  # Field name made lowercase.
    name = models.TextField(db_column="Name", blank=True, null=True)  # Field name made lowercase.
    gender = models.TextField(db_column="Gender", blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "civilii"


class Cseii(models.Model):
    sno = models.IntegerField(db_column="SNo", blank=True, null=True)  # Field name made lowercase.
    registerno = models.BigIntegerField(
        primary_key=True, db_column="RegisterNo", blank=True, null=False
    )  # Field name made lowercase.
    name = models.TextField(db_column="Name", blank=True, null=True)  # Field name made lowercase.
    gender = models.TextField(db_column="Gender", blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "cseii"


class Cseiii(models.Model):
    sno = models.IntegerField(db_column="SNo", blank=True, null=True)  # Field name made lowercase.
    registerno = models.BigIntegerField(
        primary_key=True, db_column="RegisterNo", blank=True, null=False
    )  # Field name made lowercase.
    name = models.TextField(db_column="Name", blank=True, null=True)  # Field name made lowercase.
    gender = models.TextField(db_column="Gender", blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "cseiii"


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey("DjangoContentType", models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "django_admin_log"


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = "django_content_type"
        unique_together = (("app_label", "model"),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "django_migrations"


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "django_session"


class Itii(models.Model):
    sno = models.IntegerField(db_column="SNo", blank=True, null=True)  # Field name made lowercase.
    registerno = models.BigIntegerField(
        primary_key=True, db_column="RegisterNo", blank=True, null=False
    )  # Field name made lowercase.
    name = models.TextField(db_column="Name", blank=True, null=True)  # Field name made lowercase.
    gender = models.TextField(db_column="Gender", blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "itii"


class Itiii(models.Model):
    sno = models.IntegerField(db_column="SNo", blank=True, null=True)  # Field name made lowercase.
    registerno = models.BigIntegerField(
        primary_key=True, db_column="RegisterNo", blank=True, null=False
    )  # Field name made lowercase.
    name = models.TextField(db_column="Name", blank=True, null=True)  # Field name made lowercase.
    gender = models.TextField(db_column="Gender", blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "itiii"


class Mctii(models.Model):
    sno = models.IntegerField(db_column="SNo", blank=True, null=True)  # Field name made lowercase.
    registerno = models.BigIntegerField(
        primary_key=True, db_column="RegisterNo", blank=True, null=False
    )  # Field name made lowercase.
    name = models.TextField(db_column="Name", blank=True, null=True)  # Field name made lowercase.
    gender = models.TextField(db_column="Gender", blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "mctii"


class Mechii(models.Model):
    sno = models.IntegerField(db_column="SNo", blank=True, null=True)  # Field name made lowercase.
    registerno = models.BigIntegerField(
        primary_key=True, db_column="RegisterNo", blank=True, null=False
    )  # Field name made lowercase.
    name = models.TextField(db_column="Name", blank=True, null=True)  # Field name made lowercase.
    gender = models.TextField(db_column="Gender", blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "mechii"


class Mechiii(models.Model):
    sno = models.IntegerField(db_column="SNo", blank=True, null=True)  # Field name made lowercase.
    registerno = models.BigIntegerField(
        primary_key=True, db_column="RegisterNo", blank=True, null=False
    )  # Field name made lowercase.
    name = models.TextField(db_column="Name", blank=True, null=True)  # Field name made lowercase.
    gender = models.TextField(db_column="Gender", blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "mechiii"


class Timetable(models.Model):
    date = models.TextField(primary_key=True, db_column="DATE", blank=True, null=False)  # Field name made lowercase.
    civil = models.TextField(db_column="CIVIL", blank=True, null=True)  # Field name made lowercase.
    cse = models.TextField(db_column="CSE", blank=True, null=True)  # Field name made lowercase.
    eee = models.TextField(db_column="EEE", blank=True, null=True)  # Field name made lowercase.
    ece = models.TextField(db_column="ECE", blank=True, null=True)  # Field name made lowercase.
    mech = models.TextField(db_column="MECH", blank=True, null=True)  # Field name made lowercase.
    mct = models.TextField(db_column="MCT", blank=True, null=True)  # Field name made lowercase.
    bme = models.TextField(db_column="BME", blank=True, null=True)  # Field name made lowercase.
    it = models.TextField(db_column="IT", blank=True, null=True)  # Field name made lowercase.
    aids = models.TextField(db_column="AIDS", blank=True, null=True)  # Field name made lowercase.
    csbs = models.TextField(db_column="CSBS", blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "timetable"

class ExamTemplate(models.Model):
    rows = models.IntegerField(db_column="Rows", blank=True, null=False)  # Field name made lowercase.
    columns = models.IntegerField(db_column="Columns", blank=True, null=False)  # Field name made lowercase.
    room_strength = models.IntegerField(db_column="Room_Strength", blank=True, null=False)  # Field name made lowercase.
    count_in_bench = models.IntegerField(db_column="Count_in_Bench", blank=True, null=False)  # Field name made lowercase.
    rooms = models.CharField(max_length=200)

    def set_rooms(self, x):
        self.rooms = json.dumps(x)

    def get_rooms(self):
        return json.loads(self.rooms)