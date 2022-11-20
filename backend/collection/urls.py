from django.urls import path
from collection import views
urlpatterns = [
    path('<str:username>/collection/', views.get_sets_in_collection),
    path('<str:username>/collection/<str:setnum>', views.get_a_set),
    path('<str:username>/wishlist/', views.get_sets_in_wishlist),
    path('<str:username>/wishlist/<str:setnum>', views.get_a_set_in_wishlist),
]
