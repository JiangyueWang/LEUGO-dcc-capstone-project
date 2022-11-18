from django.urls import path
from collection import views
urlpatterns = [
    path('<str:username>/collection', views.get_sets_in_collection),

]
