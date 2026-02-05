from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User

from .serializers import RegisterSerializer
from .models import Profile


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class ProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        return Response({
            "full_name": profile.full_name,
            "weekly_goal": profile.weekly_goal,
            "unit_system": profile.unit_system,
            "interests": {
                "sport": profile.sport,
                "food": profile.food,
                "mindset": profile.mindset,
                "growth": profile.growth,
                "challenges": profile.challenges,
            }
        })
