from rest_framework import serializers
from django.contrib.auth.models import User
from core.models import UserProfile, Problem, ProblemAttempt, Game, GameStatistics

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'level', 'rating']

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['id', 'title', 'difficulty', 'json_data', 'date_created']

class ProblemAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemAttempt
        fields = ['id', 'user', 'problem', 'is_solved', 'attempt_date']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'sgf_data', 'user', 'result', 'date_played']

class GameStatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameStatistics
        fields = ['id', 'total_games', 'total_problems_solved', 'last_updated']
