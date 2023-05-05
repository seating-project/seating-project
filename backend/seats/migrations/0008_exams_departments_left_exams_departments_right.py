# Generated by Django 4.1.5 on 2023-04-12 07:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("seats", "0007_rename_from_data_exams_from_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="exams",
            name="departments_left",
            field=models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name="exams",
            name="departments_right",
            field=models.JSONField(default=dict),
        ),
    ]