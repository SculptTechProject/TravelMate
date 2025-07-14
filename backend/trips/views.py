from rest_framework.viewsets import ModelViewSet
from .models import Trip
from .serializers import TripSerializer

# Create your views here.
from rest_framework.permissions import IsAuthenticated

class TripViewSet(ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]