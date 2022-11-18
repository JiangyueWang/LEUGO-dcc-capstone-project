from django.urls import path
from collection import views
urlpatterns = [
    path('', views.get_sets_in_collection),

]
