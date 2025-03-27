from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .permissions import IsSuperUser, IsStaffUser
from rest_framework.decorators import action
from core.models import UserProfile, Problem, ProblemAttempt, Game, GameStatistics
from rest_framework.response import Response
from api.serializers import (
    UserSerializer, UserProfileSerializer, ProblemSerializer, 
    ProblemAttemptSerializer, GameSerializer, GameStatisticsSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsSuperUser | IsStaffUser]
        elif self.action in ['create', 'destroy']:
            permission_classes = [IsSuperUser]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            permission_classes = [IsStaffUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsSuperUser]
        elif self.action in ['create', 'destroy']:
            permission_classes = [IsSuperUser]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            permission_classes = [IsStaffUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        serializer = self.get_serializer(user_profile)
        return Response(serializer.data)

class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsSuperUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class ProblemAttemptViewSet(viewsets.ModelViewSet):
    queryset = ProblemAttempt.objects.all()
    serializer_class = ProblemAttemptSerializer
    
    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsSuperUser]
        elif self.action in ['create', 'retrieve']:
            permission_classes = [IsAuthenticated]
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def update(self, request, *args, **kwargs):
        problem_attempt = self.get_object()

        if problem_attempt.user != request.user:
            raise PermissionDenied("Vous n'êtes pas autorisé à modifier cette tentative.")
        
        serializer = self.get_serializer(problem_attempt, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        problem_attempts = ProblemAttempt.objects.filter(user=request.user)
        serializer = self.get_serializer(problem_attempts, many=True)
        return Response(serializer.data)

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        elif self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsSuperUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class GameStatisticsViewSet(viewsets.ModelViewSet):
    queryset = GameStatistics.objects.all()
    serializer_class = GameStatisticsSerializer
    
    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsSuperUser]
        elif self.action == 'retrieve':
            permission_classes = [IsStaffUser]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsSuperUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
