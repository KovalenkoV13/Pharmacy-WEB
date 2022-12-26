from django.forms import model_to_dict
from django.shortcuts import render
import django_filters.rest_framework
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.list import ListView
from django.http import  JsonResponse
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



class GoodView(ListView):
    model = Good
    template_name = "order.html"
    context_object_name = 'good'

def GetCatalog(request):
    good = Good.objects.all()
    return render(request, 'order.html', {"good": good})

def GetMain(request):
    return render(request, 'categories.html')





#API


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(request.user and request.user.is_staff)




class CategoryView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ["id_cat"]
    permission_classes = (IsAdminOrReadOnly,)

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
    permission_classes = (permissions.AllowAny,)




    @swagger_auto_schema(
        operation_summary="Список всех товаров",
        operation_description="Возвращает все товары",
    )
    def get_queryset(self):
        good = Good.objects.all()
        return good

    def post(self, request):
        post_new = Good.objects.create(
            name=request.data["name"],
            brand=request.data["brand"],
            cost=request.data["cost"],
            img=request.data["img"],
            id_cat=request.data["id_cat"],
            vest=request.data["vest"],
        )
        return Response({'good': model_to_dict(post_new)})

    def put(self, request, *args, **kwargs):
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

    def delete(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method DELETE not allowed"})
        try:
            instance = Good.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})
        instance.delete()
        return Response({"del": "delete post " + str(pk)})

class OrderView(generics.ListAPIView):

    @swagger_auto_schema(
        operation_summary="Список всех заказов",
        operation_description="Возвращает список всех заказов",
    )
    def get(self, request):
        order = Orders.objects.all()
        serializer = OrdersSerializer(order, many=True)
        return Response({"orders": serializer.data})

    def post(self, request):
        post_new = Orders.objects.create(
            sum=request.data["sum"],
            addres=request.data["addres"],
            users=request.data["users"])
        return Response({'order': model_to_dict(post_new)})

    def put(self, request, *args, **kwargs):
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

    def delete(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method DELETE not allowed"})
        try:
            instance = Orders.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})
        instance.delete()
        return Response({"del": "delete post " + str(pk)})

class UserFilter(FilterSet):
    class Meta:
        model = Cart
        fields = ['user_profile_userprofile']

class CartView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['user_profile_userprofile']
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        cart = Cart.objects.all()
        return cart

    def post(self, request):
        post_new = Cart.objects.create(
            name=request.data["name"],
            cost=request.data["cost"],
            img=request.data["img"],
            user_profile_userprofile=request.data["user_profile_userprofile"]),
        return Response({'success': 'good in cart'})

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
    def get(self, request):
        og = Ordergood.objects.all()
        serializer = OrderGoodSerializer(og, many=True)
        return Response({"OG": serializer.data})

    def post(self, request):
        post_new = Ordergood.objects.create(
            id_order=request.data["id_order"],
            namegood=request.data["namegood"])
        return Response({'OG': model_to_dict(post_new)})

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
        return JsonResponse(serializer.data,  json_dumps_params={'ensure_ascii': False})

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = GoodSerializer(good, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400,  json_dumps_params={'ensure_ascii': False})

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
        return JsonResponse(serializer.data,  json_dumps_params={'ensure_ascii': False})

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CartSerializer(cart, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400,  json_dumps_params={'ensure_ascii': False})

    elif request.method == 'DELETE':
        cart.delete()
        return HttpResponse(status=204)
class GoodViewSet(viewsets.ModelViewSet):
    queryset = Good.objects.all()
    serializer_class = GoodSerializer

class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer



