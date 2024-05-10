from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.utils import timezone
from datetime import timedelta
from .models import Todo

class TodoViewSetTestCase(APITestCase):
    def setUp(self):
        self.todo = Todo.objects.create(title="Initial Todo", completed=False, priority='Low', due_date=timezone.now().date())
        self.list_url = reverse('todo-list')
        self.detail_url = reverse('todo-detail', kwargs={'pk': self.todo.pk})
    
    def test_create_todo(self):
        data = {'title': 'New Todo', 'completed': False, 'priority': 'medium', 'due_date': '2024-07-20'}
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), 2)
        self.assertEqual(Todo.objects.last().title, 'New Todo')

    def test_retrieve_todo(self):
        response = self.client.get(self.detail_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Initial Todo')

    def test_list_todos(self):
        response = self.client.get(self.list_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_todo(self):
        data = {'title': 'Updated Todo', 'completed': True, 'priority': 'high', 'due_date': '2024-07-20'}
        response = self.client.put(self.detail_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.title, 'Updated Todo')
        self.assertTrue(self.todo.completed)

    def test_delete_todo(self):
        response = self.client.delete(self.detail_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)

    def test_filter_todos(self):
        Todo.objects.create(title="Completed Todo", completed=True, priority='High', due_date='2024-05-11')
        filter_url = f'{self.list_url}?completed=True'
        response = self.client.get(filter_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data[0]['completed'])

    def test_search_todos(self):
        search_url = f'{self.list_url}?search=Initial'
        response = self.client.get(search_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertIn('Initial', response.data[0]['title'])
