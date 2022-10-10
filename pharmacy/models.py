from django.db import models

class GoodAPI(models.Model):
    name = models.CharField(primary_key=True, max_length=40, verbose_name = "Название")
    description = models.CharField(max_length=1000, blank=True, null=True, verbose_name = "Описание")
    cost = models.IntegerField(blank=True, null=True, verbose_name = "Стоимость")
    Quantity = models.IntegerField(blank=True, null=True, verbose_name = "Кол-во товара")
    QuantitySales = models.IntegerField(blank=True, null=True, verbose_name="Кол-во продаж товара")

    class Meta:
        managed = False
        db_table = 'goodapi'
# Create your models here.
