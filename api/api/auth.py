from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.db import transaction
from core.models import UserProfile
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from rest_framework.throttling import AnonRateThrottle

class RegisterThrottle(AnonRateThrottle):
    rate = '5/hour'

@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([RegisterThrottle])
def register_user(request):
    try:
        data = request.data
        
        if not data.get('username') or not data.get('password') or not data.get('email'):
            return Response(
                {"error": "Les champs username, password et email sont requis"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if User.objects.filter(username=data['username']).exists():
            return Response(
                {"error": "Ce nom d'utilisateur est déjà utilisé"}, 
                status=status.HTTP_409_CONFLICT
            )
            
        if User.objects.filter(email=data['email']).exists():
            return Response(
                {"error": "Cette adresse email est déjà utilisée"}, 
                status=status.HTTP_409_CONFLICT
            )
        
        try:
            validate_password(data['password'])
        except ValidationError as e:
            return Response(
                {"error": list(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        with transaction.atomic():
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                first_name=data.get('first_name', ''),
                last_name=data.get('last_name', ''),
                is_staff=data.get('is_staff', False),
                is_superuser=data.get('is_superuser', False)
            )
            
            UserProfile.objects.create(
                user=user,
                level=data.get('level', 'Débutant'),
                rating=data.get('rating', 0)
            )
            
            token, _ = Token.objects.get_or_create(user=user)
        
        return Response({
            "message": "Utilisateur créé avec succès",
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "token": token.key
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
