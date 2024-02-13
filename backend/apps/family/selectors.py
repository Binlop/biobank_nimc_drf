from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from .models import Family

class FamilyGetSelector:
    """
    Класс отвечает за получение списка семей из бд
    """

    def get_family_list(user: User, filters=None) -> QuerySet[Family]:
        pass
