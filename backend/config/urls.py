from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({"status": "OK", "api": "/api/accounts/"})

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
]
