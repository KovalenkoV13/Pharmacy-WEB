from django.db import models
from django.contrib.auth.models import PermissionsMixin


class Category(models.Model):
    id_cat = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=1000000, blank=True, null=True)
    prim = models.CharField(max_length=100000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'category'

class Good(models.Model):
    name = models.CharField(primary_key=True, max_length=500)
    brand = models.CharField(max_length=1000, blank=True, null=True)
    cost = models.FloatField(blank=True, null=True)
    img = models.CharField(max_length=100, blank=True, null=True)
    time_create = models.DateField(blank=True, null=True)
    time_update = models.DateField(blank=True, null=True)
    id_cat = models.ForeignKey(Category, models.DO_NOTHING, db_column='id_cat', blank=True, null=True)
    vest = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'good'


class Ordergood(models.Model):
    id = models.AutoField(primary_key=True)
    id_order = models.IntegerField(blank=True, null=True)
    namegood = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ordergood'


class Orders(models.Model):
    id = models.AutoField(primary_key=True)
    sum = models.IntegerField(blank=True, null=True)
    addres = models.CharField(max_length=100, blank=True, null=True)
    users = models.IntegerField(blank=True, null=True)
    time_create = models.DateField(blank=True, null=True)
    time_update = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orders'



class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    cost = models.FloatField(blank=True, null=True)
    img = models.CharField(max_length=255, blank=True, null=True)
    user_profile_userprofile = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cart'




