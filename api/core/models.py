from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    level = models.CharField(max_length=50, default='Débutant')
    rating = models.IntegerField(default=0)

class Problem(models.Model):
    title = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=50, blank=True, null=True)
    json_data = models.JSONField()
    date_created = models.DateTimeField(auto_now_add=True)

class ProblemAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    is_solved = models.BooleanField(default=False)
    attempt_date = models.DateTimeField(auto_now_add=True)

class Game(models.Model):
    sgf_data = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    result = models.CharField(max_length=50, blank=True, null=True)
    date_played = models.DateTimeField(auto_now_add=True)

class GameStatistics(models.Model):
    total_games = models.IntegerField(default=0)
    total_problems_solved = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
