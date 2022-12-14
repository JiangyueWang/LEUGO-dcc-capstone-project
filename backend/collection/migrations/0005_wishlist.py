# Generated by Django 4.0.4 on 2022-11-20 10:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('collection', '0004_alter_collection_build_completion_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('set_num', models.CharField(max_length=100)),
                ('set_name', models.CharField(max_length=100)),
                ('release_year', models.IntegerField()),
                ('theme', models.CharField(max_length=100)),
                ('set_img_url', models.CharField(max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
