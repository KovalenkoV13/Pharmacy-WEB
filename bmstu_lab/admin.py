from django.contrib import admin
from .models import *


admin.site.register(Good)
admin.site.register(Orders)
admin.site.register(Ordergood)
admin.site.register(Users)

# Register your models here.
