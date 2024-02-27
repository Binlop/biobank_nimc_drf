from typing import Union, TypeVar
from itertools import chain
from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404
from .models import Freezer, FreezerDrawer, Shelf, Box, SamplesMap

class StorageListSelector:
    """
    Класс отвечает за получение списка индивидов из бд
    """

    def get_storage_list(self, user: User, filters=None) -> QuerySet[Freezer]:
        user_laboratories = user.profile.get_user_laboratories()
        user_laboratory_ids = user_laboratories.values_list('id', flat=True)
        
        freezer_q = Q(laboratory__in=user_laboratory_ids)
        freezer_qs = Freezer.objects.filter(freezer_q)

        return freezer_qs

T = TypeVar('T', Freezer, FreezerDrawer, Shelf, Box, SamplesMap)

class StorageDetailSelector:
    """
    Класс отвечает за получение объекта хранилища(морозильник, ящик, полка, коробка) и проверку доступа к объекту 
    """
    model = None

    def check_user_acces_to_sample(self, storage_object: Union[Freezer, FreezerDrawer, Shelf, Box, SamplesMap], user: User) -> T:
        if storage_object.get_freezer_laboratories() & user.profile.get_user_laboratories():
            return storage_object
        else: return None

    def get_storage_detail(self, user: User, pk: int):
        if self.model is None:
            raise ValueError("Model is not specified")
        
        storage_object = get_object_or_404(self.model, pk=pk)
        return self.check_user_acces_to_sample(storage_object=storage_object, user=user)

class FreezerDetailSelector(StorageDetailSelector):
    model = Freezer