from django.urls import URLPattern, path
from api import views

urlpatterns = [
    path('item/all', views.getItems, name='items'),
    path('item/add', views.addItems, name='addItem'),
    path('item/update', views.updateItems, name='updateItem'),
    path('item/delete', views.deleteItems, name='deleteItem'),
]