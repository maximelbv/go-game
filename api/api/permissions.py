from rest_framework import permissions

class IsSuperUser(permissions.BasePermission):
    """
    Permission personnalisée pour n'autoriser que les superutilisateurs.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser


class IsStaffUser(permissions.BasePermission):
    """
    Permission personnalisée pour n'autoriser que les utilisateurs staff (admin ou autres membres privilégiés).
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff
