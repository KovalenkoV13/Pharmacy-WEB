from rest_framework import serializers
from bmstu_lab.models import *

class GoodSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=40)
    description = serializers.CharField(max_length=1000)
    cost = serializers.IntegerField()
    img = serializers.CharField(max_length=100)

    def create(self, validated_data):
        return Good.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.cost = validated_data.get("cost", instance.cost)
        instance.img = validated_data.get("img", instance.img)
        instance.save()
        return instance



class OrdersSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    sum = serializers.IntegerField()
    addres = serializers.CharField()
    users = serializers.CharField()

    def create(self, validated_data):
        return Orders.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get("id", instance.id)
        instance.sum = validated_data.get("sum", instance.sum)
        instance.addres = validated_data.get("addres", instance.addres)
        instance.users = validated_data.get("users", instance.users)
        instance.save()
        return instance

class UserSerializer(serializers.Serializer):
    login = serializers.CharField(max_length=40)
    password = serializers.CharField(max_length=40)

    def create(self, validated_data):
        return Users.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.login = validated_data.get("login", instance.login)
        instance.password = validated_data.get("password", instance.password)
        instance.save()
        return instance

class OrderGoodSerializer(serializers.Serializer):
    id_order = serializers.IntegerField()
    namegood = serializers.CharField()

    def create(self, validated_data):
        return Ordergood.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id_order = validated_data.get("id_order", instance.id_order)
        instance.namegood = validated_data.get("namegood", instance.namegood)
        instance.save()
        return instance




