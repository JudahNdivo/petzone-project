from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from . import views

# API URL patterns for React frontend
api_urlpatterns = [
    # Authentication
    path('auth/firebase/', views.firebase_auth, name='firebase_auth'),
    
    # Pets
    path('pets/', views.PetListCreateView.as_view(), name='api_pets'),
    path('pets/<int:pk>/', views.PetDetailView.as_view(), name='api_pet_detail'),
    
    # Applications
    path('applications/', views.ApplicationListCreateView.as_view(), name='api_applications'),
    path('applications/<int:pk>/', views.ApplicationDetailView.as_view(), name='api_application_detail'),
    
    # Dashboard data
    path('dashboard/owner/', views.owner_dashboard_data, name='api_owner_dashboard'),
    path('dashboard/seeker/', views.seeker_dashboard_data, name='api_seeker_dashboard'),
    
    # User profile
    path('profile/', views.UserProfileView.as_view(), name='api_user_profile'),
]

# Basic Django views (minimal - mainly for development/admin)
django_urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='pages/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('profile-setup/', views.profile_setup, name='profile_setup'),
]

urlpatterns = [
    # API endpoints - prefix all API calls with /api/
    path('api/', include(api_urlpatterns)),
    
    # Basic Django views (optional - for development)
    path('django/', include(django_urlpatterns)),
    
    # Root path - simple landing page or redirect to React
    path('', views.home, name='landing'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)