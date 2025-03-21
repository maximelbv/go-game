from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from api.views import UserViewSet, UserProfileViewSet, ProblemViewSet, ProblemAttemptViewSet, GameViewSet, GameStatisticsViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'user-profiles', UserProfileViewSet)
router.register(r'problems', ProblemViewSet)
router.register(r'problem-attempts', ProblemAttemptViewSet)
router.register(r'games', GameViewSet)
router.register(r'game-statistics', GameStatisticsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
