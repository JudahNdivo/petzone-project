from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Pet, Application, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'user_type', 'phone', 'address', 'created_at']

class PetSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    applications_count = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Pet
        fields = [
            'id', 'name', 'pet_type', 'breed', 'age', 'gender', 
            'description', 'health_status', 'vaccination_status', 
            'price', 'image', 'image_url', 'status', 'owner', 
            'applications_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['owner', 'created_at', 'updated_at']
    
    def get_applications_count(self, obj):
        return obj.applications.count()
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None

class PetListSerializer(serializers.ModelSerializer):
    """Simplified serializer for pet listings"""
    owner_name = serializers.CharField(source='owner.username', read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Pet
        fields = [
            'id', 'name', 'pet_type', 'breed', 'age', 'gender',
            'description', 'price', 'image_url', 'status', 
            'owner_name', 'created_at'
        ]
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None

class ApplicationSerializer(serializers.ModelSerializer):
    pet = PetListSerializer(read_only=True)
    applicant = UserSerializer(read_only=True)
    pet_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Application
        fields = [
            'id', 'pet', 'pet_id', 'applicant', 'reason_for_adoption',
            'living_situation', 'experience_with_pets', 'other_pets',
            'emergency_contact', 'emergency_phone', 'status', 'notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['applicant', 'created_at', 'updated_at']

class ApplicationStatusUpdateSerializer(serializers.ModelSerializer):
    """For updating application status by pet owners"""
    class Meta:
        model = Application
        fields = ['status', 'notes']
        
    def validate_status(self, value):
        if value not in ['pending', 'approved', 'rejected']:
            raise serializers.ValidationError("Invalid status")
        return value