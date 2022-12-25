from django.contrib import admin
from .models import *


admin.site.register(Good)
admin.site.register(Orders)
admin.site.register(Ordergood)

# Register your models here.
