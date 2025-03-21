from rest_framework import viewsets
from django.contrib.auth.models import User
from core.models import UserProfile, Problem, ProblemAttempt, Game, GameStatistics
from api.serializers import UserSerializer, UserProfileSerializer, ProblemSerializer, ProblemAttemptSerializer, GameSerializer, GameStatisticsSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer

class ProblemAttemptViewSet(viewsets.ModelViewSet):
    queryset = ProblemAttempt.objects.all()
    serializer_class = ProblemAttemptSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GameStatisticsViewSet(viewsets.ModelViewSet):
    queryset = GameStatistics.objects.all()
    serializer_class = GameStatisticsSerializer
