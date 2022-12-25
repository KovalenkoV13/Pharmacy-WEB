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
    id_order = models.OneToOneField('Orders', models.DO_NOTHING, db_column='id_order', primary_key=True)
    namegood = models.ForeignKey(Good, models.DO_NOTHING, db_column='namegood')

    class Meta:
        managed = False
        db_table = 'ordergood'
        unique_together = (('id_order', 'namegood'),)


class Orders(models.Model):
    sum = models.IntegerField(blank=True, null=True)
    addres = models.CharField(max_length=100, blank=True, null=True)
    users = models.IntegerField(blank=True, null=True)
    time_create = models.DateField(blank=True, null=True)
    time_update = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orders'



class Cart(models.Model):
    name = models.CharField(primary_key=True, max_length=100)
    cost = models.BigIntegerField(blank=True, null=True)
    img = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cart'



