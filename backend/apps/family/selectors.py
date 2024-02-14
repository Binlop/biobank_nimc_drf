from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from .models import Family
from django.shortcuts import get_object_or_404


class FamilyListSelector:
    """
    Класс отвечает за получение списка семей из бд
    """

    def get_family_list(user: User, filters=None) -> QuerySet[Family]:
        user_laboratories = user.profile.get_user_laboratories()
        user_laboratory_ids = user_laboratories.values_list('id', flat=True)
        
        return Family.objects.filter(laboratory__in=user_laboratory_ids).distinct()

class FamilyDetailSelector:
    """
    Класс отвечает за получение одного объекта семьи из бд и проверки доступа юзера к нему
    """
    def get_family_detail(user: User, id: int) -> QuerySet[Family]:
        family = get_object_or_404(Family, id=id)
        if family.get_family_laboratories() & user.profile.get_user_laboratories():
            return family
        else: return None