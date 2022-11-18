
from django.urls import path
from . import views 

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('auth/', views.g_auth_endpoint, name='auth'),
    path('channels/', views.channels, name='channels'),
    path('lists/', views.lists, name='lists'),
    path('groups/', views.groups, name='groups'),
    path('channels_db/', views.channels_db, name='channels_db'),
]