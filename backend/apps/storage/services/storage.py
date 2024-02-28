from typing import Union, TypeVar
from django.db import transaction
from django.shortcuts import get_object_or_404
from ..models import Freezer, Drawer, Shelf, Box, SamplesMap

class StorageService:
    """
    Класс отвечает за сохранение и изменение объекта хранилища(морозильник, ящик, полка, коробка)
    """
    model: Union[Freezer, Drawer, Shelf, Box, SamplesMap] = None
    T = TypeVar('T', Freezer, Drawer, Shelf, Box, SamplesMap)

    @transaction.atomic
    def create_storage_object(self, validated_data: dict) -> Union[Freezer, Drawer, Shelf, Box, SamplesMap]:
        if self.model is None:
            raise ValueError("Model is not specified")
        storage_object = self.model.objects.create(**validated_data)
        return storage_object
    
    @transaction.atomic
    def update_storage_object(self, instance: Union[Freezer, Drawer, Shelf, Box, SamplesMap], validated_data: dict) -> T:
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance
    
class FreezerService(StorageService):
    model = Freezer

    @transaction.atomic
    def create_freezer(self, validated_data: dict) -> Freezer:
        laboratory_data = validated_data.pop('laboratory')
        freezer = self.create_storage_object(validated_data=validated_data)
        freezer.laboratory.set(laboratory_data)
        freezer.save()
        return freezer
    
    @transaction.atomic
    def update_freezer(self, instance: Freezer, validated_data: dict) -> Freezer:
        laboratory_data = validated_data.pop('laboratory')
        freezer = self.update_storage_object(instance=instance, validated_data=validated_data)
        freezer.laboratory.set(laboratory_data)
        freezer.save()
        return freezer
    
class DrawerService(StorageService):
    model = Drawer

    @transaction.atomic
    def create_drawer(self, validated_data: dict) -> Drawer:
        print(validated_data)
        freezer_id = validated_data.pop('freezer_id')
        validated_data["freezer"] = get_object_or_404(Freezer, id=freezer_id)
        drawer = self.create_storage_object(validated_data=validated_data)
        freezer = get_object_or_404(Freezer, id=freezer_id)
        drawer.freezer = freezer
        drawer.save()
        return drawer