from django.urls import path
from .views import ChatView

urlpatterns = [
    path('', ChatView.as_view(), name='chat'),
]

websocket_urlpatterns = [
    #path('chat/', ChatConsumer.as_asgi()),
]