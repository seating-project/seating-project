# Generated by Django 4.1.5 on 2023-02-23 12:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("seats", "0012_remove_years_degree_alter_years_year"),
    ]

    operations = [
        migrations.AddField(
            model_name="exam",
            name="years",
            field=models.ForeignKey(
                default="1 UG",
                on_delete=django.db.models.deletion.DO_NOTHING,
                to="seats.years",
            ),
        ),
    ]
