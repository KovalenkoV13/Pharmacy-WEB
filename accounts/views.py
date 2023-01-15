from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib import auth
from rest_framework.response import Response
from user_profile.models import UserProfile
from .serializers import UserSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

from django.http import HttpResponse, JsonResponse
from django.conf import settings
import redis
import uuid

session_storage = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = self.request.data

        username = data['username']
        email = data['email']
        password = data['password']
        re_password = data['re_password']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else:
                    if len(password) < 6:
                        return Response({'error': 'Password must be at least 6 characters'})
                    else:
                        user = User.objects.create_user(username=username, password=password)

                        user.save()

                        user = User.objects.get(id=user.id)

                        user_profile = UserProfile.objects.create(user=user, email=email, ismanager=False)

                        return Response({'success': 'User created successfully'})
            else:
                return Response({'error': 'Passwords do not match'})
        except:
            return Response({'error': 'Something went wrong when registering account'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return Response({'success': 'CSRF cookie set'})


@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = authenticate(username=username, password=password)
            user_profile = UserProfile.objects.get(user=user)

            if user is not None:
                random_key = str(uuid.uuid4())
                session_storage.set(random_key, username)
                if user_profile.ismanager == False:
                    response = JsonResponse({'success': 'User authenticated', 'isManager': False})
                else:
                    response = JsonResponse({'success': 'User authenticated', 'isManager': True})
                response.set_cookie("session_id", random_key)

                return response
            else:
                return Response({'error': 'Error Authenticating'})
        except:
            return Response({'error': 'Something went wrong when logging in'})


class LogoutView(APIView):
    def post(self, request):
        try:
            auth.logout(request)
            return Response({'success': 'Loggout'})
        except:
            return Response({'error': 'Something went wrong when logging out'})


class DeleteAccountView(APIView):
    def delete(self, request):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response({'success': 'User deleted successfully'})
        except:
            return Response({'error': 'Something went wrong when trying to delete user'})


class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        users = User.objects.all()
        users = UserSerializer(users, many=True)
        return Response(users.data)
