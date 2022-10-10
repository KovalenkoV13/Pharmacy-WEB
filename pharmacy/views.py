from django.shortcuts import render
from rest_framework import viewsets, generics
from pharmacy.serializers import GoodSerializer
from pharmacy.models import GoodAPI


class GoodViewSet(viewsets.ModelViewSet):
    queryset = GoodAPI.objects.all().order_by('Quantity')
    serializer_class = GoodSerializer

# Create your views here.
