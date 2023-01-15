import json

from django.forms import model_to_dict
from django.shortcuts import render
import django_filters.rest_framework
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.list import ListView
from django.http import JsonResponse, HttpRequest
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import JSONParser
from rest_framework import viewsets, permissions
from bmstu_lab.serializers import *
from bmstu_lab.models import *
from rest_framework import generics
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters
from django_filters import FilterSet, rest_framework
from django_filters import NumberFilter
from django.http import HttpResponse
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required, permission_required

from django.conf import settings
import redis

from user_profile.models import UserProfile

session_storage = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)


class GoodView(ListView):
    model = Good
    template_name = "order.html"
    context_object_name = 'good'


def GetCatalog(request):
    good = Good.objects.all()
    return render(request, 'order.html', {"good": good})


def GetMain(request):
    return render(request, 'categories.html')


# API


class CategoryView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ["id_cat"]
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(
        operation_summary="Список категорий",
        operation_description="Возвращает категории"
    )
    def get(self, request):
        cat = Category.objects.all().values()
        return Response(list(cat))

    def post(self, request):
        post_new = Category.objects.create(
            id_cat=request.data["id_cat"],
            name=request.data["name"],
            description=request.data["description"],
            img=request.data["img"],
            prim=request.data["prim"],
        )
        return Response({'cat': model_to_dict(post_new)})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})

        try:
            instance = Category.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})

        serializer = CategorySerializer(instance=instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"put": serializer.data})

    def delete(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method DELETE not allowed"})
        try:
            instance = Category.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})
        instance.delete()
        return Response({"del": "delete post " + str(pk)})


class GoodFilter(FilterSet):
    min_price = NumberFilter(field_name='cost', lookup_expr='gte')
    max_price = NumberFilter(field_name='cost', lookup_expr='lte')

    class Meta:
        model = Good
        fields = [
            'name',
            'min_price',
            'max_price'
        ]


class GoodView(generics.ListCreateAPIView):
    queryset = Good.objects.all()
    serializer_class = GoodSerializer
    filter_backends = (rest_framework.DjangoFilterBackend, filters.SearchFilter)
    filterset_class = GoodFilter
    search_fields = ["name"]

    @swagger_auto_schema(
        operation_summary="Список всех товаров",
        operation_description="Возвращает все товары",
    )
    def get_queryset(self):
        good = Good.objects.all()
        return good

    def post(self, request):
        try:
            ssid = self.request.COOKIES["session_id"]
            user = str(session_storage.get(ssid).decode('utf-8'))
            user_profile = UserProfile.objects.get(user__username=user)
            if user is not None and user_profile.ismanager == True:
                post_new = Good.objects.create(
                    name=request.data["name"],
                    brand=request.data["brand"],
                    cost=request.data["cost"],
                    img=request.data["img"]
                )
                return Response({'good': model_to_dict(post_new)})
        except:
            return Response({'error': 'user is not authenticated and is not manager'})

    def put(self, request, *args, **kwargs):
        try:
            ssid = self.request.COOKIES["session_id"]
            user = str(session_storage.get(ssid).decode('utf-8'))
            user_profile = UserProfile.objects.get(user__username=user)
            if user is not None and user_profile.ismanager == True:
                pk = kwargs.get("pk", None)
                if not pk:
                    return Response({"error": "Method PUT not allowed"})

                try:
                    instance = Good.objects.get(pk=pk)
                except:
                    return Response({"error": "Object does not exists"})

                serializer = GoodSerializer(instance=instance, data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response({"put": serializer.data})
        except:
            return Response({'error': 'user is not authenticated and is not manager'})

    def delete(self, request, **kwargs):
        try:
            ssid = self.request.COOKIES["session_id"]
            user = str(session_storage.get(ssid).decode('utf-8'))
            if user is not None:
                pk = kwargs.get("pk", None)
                if not pk:
                    return Response({"error": "Method DELETE not allowed"})
                try:
                    instance = Good.objects.get(pk=pk)
                except:
                    return Response({"error": "Object does not exists"})
                instance.delete()
                return Response({"del": "delete post " + str(pk)})
        except:
            return Response({'error': 'user is not authenticated and is not manager'})


class OrderView(generics.ListAPIView):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer

    # filter_backends = [filters.SearchFilter]
    # search_fields = ['users']

    @swagger_auto_schema(
        operation_summary="Список всех заказов",
        operation_description="Возвращает список всех заказов",
    )
    def get_queryset(self):
        try:
            ssid = self.request.COOKIES["session_id"]
            user = str(session_storage.get(ssid).decode('utf-8'))
            user_profile = UserProfile.objects.get(user__username=user)
            if user is not None and user_profile.ismanager == False:
                order = Orders.objects.filter(users__exact=user)
                return order
            if user is not None and user_profile.ismanager == True:
                return Orders.objects.all()
        except:
            return []

    def post(self, request):
        try:
            ssid = request.COOKIES["session_id"]
            user = str(session_storage.get(ssid).decode('utf-8'))
            if user is not None:
                post_new = Orders.objects.create(
                    sum=request.data["sum"],
                    adress=request.data["adress"],
                    users=request.data["users"],
                    goods=request.data["goods"],
                    time_create=request.data["time_create"],
                    time_update=request.data["time_update"],
                    status=request.data["status"])
                return Response({'order': model_to_dict(post_new)})

        except:
            return Response({'error': 'user is not authenticated or something went wrong'})

    def put(self, request, *args, **kwargs):
        try:
            ssid = self.request.COOKIES["session_id"]
            user = str(session_storage.get(ssid).decode('utf-8'))
            user_profile = UserProfile.objects.get(user__username=user)
            if user is not None and user_profile.ismanager == True:
                pk = kwargs.get("pk", None)
                if not pk:
                    return Response({"error": "Method PUT not allowed"})

                try:
                    instance = Orders.objects.get(pk=pk)
                except:
                    return Response({"error": "Object does not exists"})

                serializer = OrdersSerializer(instance=instance, data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response({"put": serializer.data})
        except:
            return Response({'error': 'user is not authenticated and is not manager'})


    def delete(self, request, **kwargs):
        try:
            ssid = self.request.COOKIES["session_id"]
            user = str(session_storage.get(ssid).decode('utf-8'))
            if user is not None:
                pk = kwargs.get("pk", None)
                if not pk:
                    return Response({"error": "Method DELETE not allowed"})
                try:
                    instance = Orders.objects.get(pk=pk)
                except:
                    return Response({"error": "Object does not exists"})
                instance.delete()
                return Response({"del": "delete post " + str(pk)})
        except:
            return Response({'error': 'user is not authenticated'})


class CartView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_queryset(self):
        try:
            ssid = self.request.COOKIES["session_id"]
            user = str(session_storage.get(ssid).decode('utf-8'))
            if user is not None:
                cart = Cart.objects.filter(user_profile_userprofile__exact=user)
                return cart
        except:
            return []

    def post(self, request):
        try:
            ssid = self.request.COOKIES["session_id"]
            user = str(session_storage.get(ssid).decode('utf-8'))
            if user is not None:
                post_new = Cart.objects.create(
                    name=request.data["name"],
                    cost=request.data["cost"],
                    img=request.data["img"],
                    user_profile_userprofile=request.data["user_profile_userprofile"]),
                return Response({'success': 'good in cart'})
        except:
            return Response({'error': 'user is not authenticated'})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})

        try:
            instance = Cart.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})

        serializer = CartSerializer(instance=instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"put": serializer.data})

    def delete(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method DELETE not allowed"})
        try:
            instance = Cart.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})
        instance.delete()
        return Response({"del": "delete post " + str(pk)})


class OGView(generics.ListAPIView):
    queryset = Ordergood.objects.all()
    serializer_class = OrderGoodSerializer

    def get_queryset(self):
        OG = Ordergood.objects.all()
        return OG

    def post(self, request):
        Ordergood.objects.create(
            id_order=request.data["id_order"],
            namegood=request.data["namegood"])
        return Response({'success': 'success'})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})

        try:
            instance = Ordergood.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})

        serializer = OrderGoodSerializer(instance=instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"put": serializer.data})

    def delete(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method DELETE not allowed"})
        try:
            instance = Ordergood.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})
        instance.delete()
        return Response({"del": "delete post " + str(pk)})


def GoodViewOne(request, pk):
    try:
        good = Good.objects.get(pk=pk)
    except Good.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = GoodSerializer(good)
        return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False})

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = GoodSerializer(good, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400, json_dumps_params={'ensure_ascii': False})

    elif request.method == 'DELETE':
        good.delete()
        return HttpResponse(status=204)


def CartViewOne(request, pk):
    try:
        cart = Cart.objects.get(pk=pk)
    except Cart.DoesNotExist:
        return HttpResponse(status=404)

    serializer_class = CartSerializer

    if request.method == 'GET':
        serializer = CartSerializer(cart)
        return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False})

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CartSerializer(cart, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400, json_dumps_params={'ensure_ascii': False})

    elif request.method == 'DELETE':
        cart.delete()
        return HttpResponse(status=204)


class GoodViewSet(viewsets.ModelViewSet):
    queryset = Good.objects.all()
    serializer_class = GoodSerializer


class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer
