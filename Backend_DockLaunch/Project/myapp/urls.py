from django.urls import path
from .views import DeployView, StopView

urlpatterns = [
    path('deploy/', DeployView.as_view(), name='deploy'),
    path('stop/', StopView.as_view(), name='stop'),
]