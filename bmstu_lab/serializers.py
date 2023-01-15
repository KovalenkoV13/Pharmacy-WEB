import json

from rest_framework import serializers
from bmstu_lab.models import *


class CategorySerializer(serializers.Serializer):
    id_cat = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    prim = serializers.CharField()

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id_cat = validated_data.get("id_cat", instance.id_cat)
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.prim = validated_data.get("prim", instance.prim)
        instance.save()
        return instance


class CartSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    cost = serializers.FloatField()
    img = serializers.CharField()
    user_profile_userprofile = serializers.CharField()


    def create(self, validated_data):
        return Cart.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get("id", instance.id)
        instance.name = validated_data.get("name", instance.name)
        instance.cost = validated_data.get("cost", instance.cost)
        instance.img = validated_data.get("img", instance.img)
        instance.user_profile_userprofile = validated_data.get("user_profile_userprofile", instance.user_profile_userprofile)
        instance.save()
        return instance

class GoodSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=500)
    brand = serializers.CharField(max_length=1000)
    cost = serializers.FloatField()
    img = serializers.CharField(max_length=100)
    # id_cat_id = serializers.IntegerField()
    # vest = models.CharField(max_length=100)

    def create(self, validated_data):
        return Good.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.brand = validated_data.get("brand", instance.brand)
        instance.cost = validated_data.get("cost", instance.cost)
        instance.img = validated_data.get("img", instance.img)
        instance.save()
        return instance



class OrdersSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    sum = serializers.IntegerField()
    adress = serializers.CharField()
    users = serializers.CharField()
    time_create = serializers.DateField(input_formats=["%d.%m.%Y"], format="%d.%m.%Y")
    time_update = serializers.DateField(input_formats=["%d.%m.%Y"], format="%d.%m.%Y")
    goods = serializers.ListField()
    status = serializers.CharField()

    def create(self, validated_data):
        order = Orders.objects.create(**validated_data)
        return order

    def update(self, instance, validated_data):
        instance.sum = validated_data.get("sum", instance.sum)
        instance.adress = validated_data.get("adress", instance.adress)
        instance.users = validated_data.get("users", instance.users)
        instance.time_create = validated_data.get("time_create", instance.time_create)
        instance.time_update = validated_data.get("time_update", instance.time_update)
        instance.goods = validated_data.get("goods", instance.goods)
        instance.status = validated_data.get("status", instance.status)
        instance.save()
        return instance

class OrderGoodSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    id_order = serializers.IntegerField()
    namegood = serializers.CharField()

    def create(self, validated_data):
        return Ordergood.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get("id", instance.id)
        instance.id_order = validated_data.get("id_order", instance.id_order)
        instance.namegood = validated_data.get("namegood", instance.namegood)
        instance.save()
        return instance




