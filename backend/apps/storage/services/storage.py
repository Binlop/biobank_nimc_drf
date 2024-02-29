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
        freezer_id = validated_data.pop('freezer_id')
        validated_data["freezer"] = get_object_or_404(Freezer, id=freezer_id)
        drawer = self.create_storage_object(validated_data=validated_data)
        drawer.save()
        return drawer
    
class ShelfService(StorageService):
    model = Shelf

    @transaction.atomic
    def create_shelf(self, validated_data: dict) -> Shelf:
        drawer_id = validated_data.pop('drawer_id', None)
        if drawer_id:
            validated_data["drawer"] = get_object_or_404(Drawer, id=drawer_id)
            shelf = self.create_storage_object(validated_data=validated_data)
            shelf.save()
            return shelf

class BoxService(StorageService):
    model = Box

    @staticmethod
    def make_location_path_to_box(shelf: Shelf) -> str:
        freezer_name = shelf.drawer.freezer.name
        drawer_name = shelf.drawer.name
        shelf_name = shelf.name
        return f'{freezer_name}_{drawer_name}_{shelf_name}'

    @transaction.atomic
    def create_boxes(self, validated_data: dict) -> Box:
        shelf_id = validated_data.pop('shelf_id', None)
        shelf = get_object_or_404(Shelf, id=shelf_id)
        
        count_boxes = validated_data.pop('count_boxes', 1)
        location_path = self.make_location_path_to_box(shelf=shelf)
        for i in range(count_boxes):
            box = Box(name=f'{location_path}_коробка_{i}')
            box.shelf = shelf
            box.save()
        return box
    
class SampleMapService(StorageService):
    model = SamplesMap

    @transaction.atomic
    def create_samples_map(self, validated_data: dict):
        box_id = validated_data.pop('box_id', None)
        box = get_object_or_404(Box, id=box_id)

        count_samples = validated_data.pop('count_samples', 1)
        location_path = f'{BoxService.make_location_path_to_box(box.shelf)}_{box.name}'
        for i in range(count_samples):
            sample_place = SamplesMap(name=f'{location_path}_образец_{i}')
            sample_place.box = box
            sample_place.save()
        return sample_place