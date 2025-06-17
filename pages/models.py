from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    USER_TYPES = [
        ('owner', 'Pet Owner'),
        ('seeker', 'Pet Seeker'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.get_user_type_display()}"

class Pet(models.Model):
    PET_TYPES = [
        ('dog', 'Dog'),
        ('cat', 'Cat'),
        ('bird', 'Bird'),
        ('rabbit', 'Rabbit'),
        ('fish', 'Fish'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('pending', 'Pending'),
        ('adopted', 'Adopted'),
    ]
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pets')
    name = models.CharField(max_length=100)
    pet_type = models.CharField(max_length=10, choices=PET_TYPES)
    breed = models.CharField(max_length=100, blank=True)
    age = models.IntegerField(help_text="Age in months")
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')])
    description = models.TextField()
    health_status = models.TextField(blank=True)
    vaccination_status = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='pet_images/', blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='available')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.pet_type}) - {self.owner.username}"
    
    class Meta:
        ordering = ['-created_at']

class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    
    # Application details
    reason_for_adoption = models.TextField()
    living_situation = models.TextField(help_text="Describe your living situation")
    experience_with_pets = models.TextField()
    other_pets = models.TextField(blank=True, help_text="Do you have other pets?")
    emergency_contact = models.CharField(max_length=100)
    emergency_phone = models.CharField(max_length=15)
    
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True, help_text="Notes from pet owner")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.applicant.username} - {self.pet.name} ({self.status})"
    
    class Meta:
        ordering = ['-created_at']
        # Prevent duplicate applications for same pet by same user
        unique_together = ['pet', 'applicant']
