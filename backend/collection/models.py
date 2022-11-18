from django.db import models
from authentication.models import User
# Create your models here.


class Collection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    set_num = models.CharField(max_length=100)
    set_name = models.CharField(max_length=100)
    release_year = models.IntegerField()
    theme = models.CharField(max_length=100)
    num_parts = models.IntegerField()
    set_img_url = models.CharField(max_length=100)
    purchase_date = models.DateField()
    build_completion_date = models.DateField(blank=True, default=None)
