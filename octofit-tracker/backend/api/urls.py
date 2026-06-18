from django.urls import path
from .views import UsersView, ActivitiesView

urlpatterns = [
    path('users/', UsersView.as_view()),
    path('activities/', ActivitiesView.as_view()),
]
