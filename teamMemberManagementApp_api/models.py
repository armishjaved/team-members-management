from django.db import models

# Create your models here.
class TeamMember(models.Model):
    roles = [
        ('admin', 'Admin'),
        ('regular', 'Regular'),
    ]

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=roles, default='regular')

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"
