from django.db import models
class Todo(models.Model):
    """
    Model representing a to-do item.

    Attributes:
        title (str): Title of the to-do item, indexed for search.
        completed (bool): Status of the to-do item, defaults to False, indexed.
        created_at (datetime): Record of when the to-do was created, automatically set to the current time on creation.
        due_date (datetime): The deadline for the to-do item, indexed.
        priority (str): Priority of the to-do, with choices of 'low', 'medium', 'high'. Defaults to 'medium', indexed.
    """
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    title = models.CharField(max_length=100, db_index=True)
    completed = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(db_index=True)
    priority = models.CharField(max_length=6, choices=PRIORITY_CHOICES, default='medium', db_index=True)

    def __str__(self):
        """
        Returns a string representation of the to-do item, which is its title.
        """
        return self.title

