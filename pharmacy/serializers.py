from pharmacy.models import GoodAPI
from rest_framework import serializers

class GoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodAPI
        fields = ["pk", "name", "description", "cost", "Quantity", "QuantitySales"]