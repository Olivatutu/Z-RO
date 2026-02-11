from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'full_name',
            'weekly_goal',
            'unit_system',
            'sport',
            'food',
            'mindset',
            'growth',
            'challenges',
        )
