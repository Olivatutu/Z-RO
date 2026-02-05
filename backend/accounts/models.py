from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    UNIT_CHOICES = (
        ('metric', 'Metric'),
        ('imperial', 'Imperial'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    weekly_goal = models.IntegerField(default=3)
    unit_system = models.CharField(max_length=10, choices=UNIT_CHOICES, default='metric')

    # Intereses
    sport = models.BooleanField(default=False)
    food = models.BooleanField(default=False)
    mindset = models.BooleanField(default=False)
    growth = models.BooleanField(default=False)
    challenges = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name
