from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from .models import Laboratory

class LaboratoryListSelector:
    """
    Класс отвечает за получение списка лабораторий из бд
    """

    def get_laboratory_list(user: User, filters=None) -> QuerySet[Laboratory]:
        return user.profile.get_user_laboratories()


class LaboratoryDetailSelector:
    """
    Класс отвечает за получение отдельной лаборатории из бд
    """
    def get_laboratory_detail(user: User, id: int) -> QuerySet[Laboratory]:
        laboratory = Laboratory.objects.get(id=id)
        if laboratory in user.profile.get_user_laboratories():
            return laboratory
        else: return None