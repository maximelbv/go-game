from rest_framework import viewsets
from django.contrib.auth.models import User
from core.models import UserProfile, Problem, ProblemAttempt, Game, GameStatistics
from api.serializers import UserSerializer, UserProfileSerializer, ProblemSerializer, ProblemAttemptSerializer, GameSerializer, GameStatisticsSerializer
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticated]

class ProblemAttemptViewSet(viewsets.ModelViewSet):
    queryset = ProblemAttempt.objects.all()
    serializer_class = ProblemAttemptSerializer
    permission_classes = [IsAuthenticated]

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]

class GameStatisticsViewSet(viewsets.ModelViewSet):
    queryset = GameStatistics.objects.all()
    serializer_class = GameStatisticsSerializer
    permission_classes = [IsAuthenticated]
