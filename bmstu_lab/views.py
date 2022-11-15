from django.forms import model_to_dict
from django.shortcuts import render
from django.views.generic.list import ListView
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from bmstu_lab.serializers import *
from bmstu_lab.models import *
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

class GoodView(APIView):
    def get(self, request):
        good = Good.objects.all().values()
        return Response({"good": list(good)})

    def post(self, request):
        post_new = Good.objects.create(
            name=request.data["name"],
            description=request.data["description"],
            cost=request.data["cost"],
            img=request.data["img"],
            id_cat=request.data["id_cat"],
            deystvesh=request.data["deystvesh"]
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

class OrderView(APIView):
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

class UserView(APIView):
    def get(self, request):
        user = Users.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response({"users": serializer.data})

    def post(self, request):
        post_new = Users.objects.create(
            login=request.data["login"],
            password=request.data["password"])
        return Response({'user': model_to_dict(post_new)})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})

        try:
            instance = Users.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})

        serializer = UserSerializer(instance=instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"put": serializer.data})

    def delete(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method DELETE not allowed"})
        try:
            instance = Users.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})
        instance.delete()
        return Response({"del": "delete post " + str(pk)})

class OGView(APIView):
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

class GoodViewSet(viewsets.ModelViewSet):
    queryset = Good.objects.all()
    serializer_class = GoodSerializer

class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer


