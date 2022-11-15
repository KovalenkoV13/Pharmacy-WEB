"""djangoProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from bmstu_lab import views
from django.urls import include, path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'good', views.GoodViewSet)
router.register(r'orders', views.OrdersViewSet)
router.register(r'users', views.UsersViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.GetMain, name="Catalog"),
    path('catalog/', views.GetCatalog, name="Catalog"),
    path('api/good/', views.GoodView.as_view()),
    path('api/good/<str:pk>/', views.GoodView.as_view()),
    path('api/orders/', views.OrderView.as_view()),
    path('api/users/', views.UserView.as_view()),
    path('api/og/', views.OGView.as_view()),
]
