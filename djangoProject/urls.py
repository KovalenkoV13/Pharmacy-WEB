from django.contrib import admin
from bmstu_lab import views
from django.urls import include, path, re_path
from rest_framework import routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

router = routers.DefaultRouter()
router.register(r'good', views.GoodViewSet)
router.register(r'orders', views.OrdersViewSet)
router.register(r'users', views.UsersViewSet)


schema_view = get_schema_view(
   openapi.Info(
      title="Pharmacy API",
      default_version='v1',
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('admin/', admin.site.urls),

    path('', views.GetMain, name="Catalog"),
    path('catalog/', views.GetCatalog, name="Catalog"),



    path('api/auth/', include('rest_framework.urls')),



    path('api/good/', views.GoodView.as_view()),
    path('api/cart/', views.CartView.as_view()),
    path('api/cart/<str:pk>/', views.CartView.as_view()),
    path('api/good/<str:pk>/', views.GoodViewOne),
    path('api/orders/', views.OrderView.as_view()),
    path('api/users/', views.UserView.as_view()),
    path('api/category/', views.CategoryView.as_view()),
    path('api/og/', views.OGView.as_view()),
]
