from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing todo items.
    Allows for filtering by completion status, due date, and priority,
    and searching by title.
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['completed', 'due_date', 'priority']
    search_fields = ['title']

