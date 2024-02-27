from typing import Union, TypeVar
from django.db import transaction
from ..models import Freezer, FreezerDrawer, Shelf, Box, SamplesMap

class StorageService:
    """
    Класс отвечает за сохранение и изменение объекта хранилища(морозильник, ящик, полка, коробка)
    """
    model: Union[Freezer, FreezerDrawer, Shelf, Box, SamplesMap] = None
    T = TypeVar('T', Freezer, FreezerDrawer, Shelf, Box, SamplesMap)

    @transaction.atomic
    def create_storage_object(self, validated_data: dict) -> Union[Freezer, FreezerDrawer, Shelf, Box, SamplesMap]:
        if self.model is None:
            raise ValueError("Model is not specified")
        storage_object = self.model.objects.create(**validated_data)
        return storage_object
    
    @transaction.atomic
    def update_storage_object(self, instance: Union[Freezer, FreezerDrawer, Shelf, Box, SamplesMap], validated_data: dict) -> T:
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance
    
class FreezerService(StorageService):
   
   @transaction.atomic
    def create_freezer(self, validated_data: dict) -> Freezer:
        freezer = self.create_storage_object(validated_data=validated_data)
        