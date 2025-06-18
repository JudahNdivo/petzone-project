from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'pages/home.html')
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.db.models import Q
import json

# REST Framework imports
from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import serializers

from .models import Pet, Application, UserProfile
from .serializers import (
    PetSerializer, PetListSerializer, ApplicationSerializer, 
    ApplicationStatusUpdateSerializer, UserProfileSerializer
)

# Traditional Django Views (for admin/development)
def home(request):
    """Landing page"""
    return render(request, 'pages/home.html')

def register(request):
    """User registration"""
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')
            return redirect('profile_setup')
    else:
        form = UserCreationForm()
    return render(request, 'pages/register.html', {'form': form})

@login_required
def profile_setup(request):
    """Set up user profile as owner or seeker"""
    from .forms import UserProfileForm
    if request.method == 'POST':
        form = UserProfileForm(request.POST)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()
            if profile.user_type == 'owner':
                return redirect('owner_dashboard')
            else:
                return redirect('seeker_dashboard')
    else:
        form = UserProfileForm()
    return render(request, 'pages/profile_setup.html', {'form': form})

# API Views for React Frontend

# Pet API Views
class PetListCreateView(generics.ListCreateAPIView):
    """
    GET: List all available pets
    POST: Create a new pet (owners only)
    """
    serializer_class = PetListSerializer
    permission_classes = [AllowAny]  # Allow unauthenticated users to view pets
    
    def get_queryset(self):
        queryset = Pet.objects.filter(status='available')
        
        # Filter by pet type
        pet_type = self.request.query_params.get('pet_type', None)
        if pet_type:
            queryset = queryset.filter(pet_type=pet_type)
        
        # Search by name or breed
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(breed__icontains=search)
            )
        
        return queryset.order_by('-created_at')
    
    def perform_create(self, serializer):
        # Only authenticated users can create pets
        if not self.request.user.is_authenticated:
            raise permissions.PermissionDenied("Authentication required")
        serializer.save(owner=self.request.user)

class PetDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Get pet details
    PUT/PATCH: Update pet (owner only)
    DELETE: Delete pet (owner only)
    """
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [AllowAny]  # Allow anyone to view pet details
    
    def get_permissions(self):
        """Only pet owner can update/delete"""
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated(), IsOwnerOrReadOnly()]
        return [AllowAny()]

# Application API Views
class ApplicationListCreateView(generics.ListCreateAPIView):
    """
    GET: List user's applications
    POST: Create new application
    """
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Application.objects.filter(applicant=self.request.user)
    
    def perform_create(self, serializer):
        pet_id = serializer.validated_data['pet_id']
        pet = get_object_or_404(Pet, id=pet_id, status='available')
        
        # Check if user already applied for this pet
        if Application.objects.filter(pet=pet, applicant=self.request.user).exists():
            raise serializers.ValidationError("You have already applied for this pet")
        
        serializer.save(applicant=self.request.user, pet=pet)

class ApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Get application details
    PUT/PATCH: Update application status (pet owner only)
    DELETE: Cancel application (applicant only)
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ApplicationStatusUpdateSerializer
        return ApplicationSerializer

# Dashboard API Views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def owner_dashboard_data(request):
    """Get dashboard data for pet owners"""
    try:
        profile = request.user.userprofile
        if profile.user_type != 'owner':
            return Response({'error': 'Access denied'}, status=403)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=404)
    
    # Get owner's pets
    pets = Pet.objects.filter(owner=request.user)
    pet_serializer = PetListSerializer(pets, many=True, context={'request': request})
    
    # Get applications for owner's pets
    applications = Application.objects.filter(pet__owner=request.user)
    app_serializer = ApplicationSerializer(applications, many=True, context={'request': request})
    
    # Stats
    stats = {
        'total_pets': pets.count(),
        'available_pets': pets.filter(status='available').count(),
        'pending_applications': applications.filter(status='pending').count(),
        'approved_applications': applications.filter(status='approved').count()
    }
    
    return Response({
        'pets': pet_serializer.data,
        'applications': app_serializer.data,
        'stats': stats
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def seeker_dashboard_data(request):
    """Get dashboard data for pet seekers"""
    try:
        profile = request.user.userprofile
        if profile.user_type != 'seeker':
            return Response({'error': 'Access denied'}, status=403)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=404)
    
    # Get available pets (excluding user's own pets if they're also an owner)
    available_pets = Pet.objects.filter(status='available').exclude(owner=request.user)
    pets_serializer = PetListSerializer(available_pets[:10], many=True, context={'request': request})
    
    # Get user's applications
    my_applications = Application.objects.filter(applicant=request.user)
    app_serializer = ApplicationSerializer(my_applications, many=True, context={'request': request})
    
    return Response({
        'featured_pets': pets_serializer.data,
        'my_applications': app_serializer.data,
        'application_stats': {
            'pending': my_applications.filter(status='pending').count(),
            'approved': my_applications.filter(status='approved').count(),
            'total': my_applications.count()
        }
    })

# User Profile API Views
class UserProfileView(generics.RetrieveUpdateAPIView):
    """Get or update user profile"""
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile

# Firebase Integration - Create or get Django user from Firebase
@api_view(['POST'])
@permission_classes([AllowAny])
def firebase_auth(request):
    """
    Handle Firebase authentication
    Creates or gets Django user based on Firebase token
    """
    firebase_uid = request.data.get('firebase_uid')
    email = request.data.get('email')
    display_name = request.data.get('display_name', '')
    
    if not firebase_uid or not email:
        return Response({'error': 'firebase_uid and email required'}, status=400)
    
    # Create or get user
    user, created = User.objects.get_or_create(
        email=email,
        defaults={
            'username': email,
            'first_name': display_name.split(' ')[0] if display_name else '',
            'last_name': ' '.join(display_name.split(' ')[1:]) if len(display_name.split(' ')) > 1 else ''
        }
    )
    
    # Store Firebase UID in user profile or session
    profile, profile_created = UserProfile.objects.get_or_create(user=user)
    
    return Response({
        'user_id': user.id,
        'username': user.username,
        'email': user.email,
        'profile_exists': not profile_created,
        'user_type': profile.user_type if profile.user_type else None
    })

# Custom permission class
class IsOwnerOrReadOnly(permissions.BasePermission):
    """Custom permission to only allow owners of an object to edit it."""
    
    def has_object_permission(self, request, view, obj):
        # Read permissions for any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions only to the owner of the object
        return obj.owner == request.user
