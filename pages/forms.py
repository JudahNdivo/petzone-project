from django import forms
from .models import Pet, Application, UserProfile

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['user_type', 'phone', 'address']
        widgets = {
            'user_type': forms.RadioSelect,
            'address': forms.Textarea(attrs={'rows': 3}),
            'phone': forms.TextInput(attrs={'placeholder': 'e.g., +254712345678'})
        }

class PetForm(forms.ModelForm):
    class Meta:
        model = Pet
        fields = [
            'name', 'pet_type', 'breed', 'age', 'gender', 
            'description', 'health_status', 'vaccination_status', 
            'price', 'image'
        ]
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Describe your pet\'s personality, habits, and any special needs...'}),
            'health_status': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Any health conditions, medications, or special care requirements...'}),
            'age': forms.NumberInput(attrs={'placeholder': 'Age in months'}),
            'price': forms.NumberInput(attrs={'placeholder': 'Optional - adoption fee in KES'}),
            'name': forms.TextInput(attrs={'placeholder': 'Pet\'s name'}),
            'breed': forms.TextInput(attrs={'placeholder': 'e.g., Golden Retriever, Persian Cat'}),
        }
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make some fields required
        self.fields['name'].required = True
        self.fields['pet_type'].required = True
        self.fields['age'].required = True
        self.fields['gender'].required = True
        self.fields['description'].required = True

class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = [
            'reason_for_adoption', 'living_situation', 'experience_with_pets',
            'other_pets', 'emergency_contact', 'emergency_phone'
        ]
        widgets = {
            'reason_for_adoption': forms.Textarea(attrs={
                'rows': 4, 
                'placeholder': 'Why do you want to adopt this pet? What are you looking for in a companion?'
            }),
            'living_situation': forms.Textarea(attrs={
                'rows': 3, 
                'placeholder': 'Describe your home (apartment/house), yard space, family members, etc.'
            }),
            'experience_with_pets': forms.Textarea(attrs={
                'rows': 3, 
                'placeholder': 'What experience do you have with pets? Previous pets owned, training experience, etc.'
            }),
            'other_pets': forms.Textarea(attrs={
                'rows': 2, 
                'placeholder': 'Do you currently have other pets? If yes, please describe them.'
            }),
            'emergency_contact': forms.TextInput(attrs={
                'placeholder': 'Full name of emergency contact'
            }),
            'emergency_phone': forms.TextInput(attrs={
                'placeholder': 'Emergency contact phone number'
            }),
        }
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make all fields required
        for field in self.fields:
            if field != 'other_pets':  # other_pets can be optional
                self.fields[field].required = True