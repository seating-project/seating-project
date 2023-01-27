# Generated by Django 4.1.5 on 2023-01-27 03:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("seats", "0002_examtemplate"),
    ]

    operations = [
        migrations.CreateModel(
            name="Students",
            fields=[
                (
                    "registerno",
                    models.BigIntegerField(
                        blank=True,
                        db_column="RegisterNo",
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.TextField(blank=True, db_column="Name", null=True)),
                ("gender", models.TextField(blank=True, db_column="Gender", null=True)),
                ("dept", models.CharField(blank=True, max_length=10, null=True)),
                ("year", models.IntegerField(blank=True, null=True)),
            ],
            options={
                "db_table": "students",
                "managed": False,
            },
        ),
    ]
