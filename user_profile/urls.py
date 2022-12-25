from django.urls import path
from .views import GetUserProfileView, UpdateUserProfileView

urlpatterns =[
    path('user', GetUserProfileView.as_view()),
    path('update_user', UpdateUserProfileView.as_view()),
]