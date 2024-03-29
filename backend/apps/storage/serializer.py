from rest_framework import serializers
from django.shortcuts import get_object_or_404
from sample.models import Sample
from laboratory.serializers import LaboratorySerializer
from .services.storage import FreezerService, DrawerService, ShelfService, BoxService, SampleMapService
from .models import Freezer, Drawer, Shelf, Box, SamplesMap

class StorageSerializerOutput(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    class Meta:
        model = None

class FreezerInputSerializer(StorageSerializerOutput):
    laboratory = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    
    class Meta:
        model = Freezer
        fields = ['name', 'laboratory', 'floor', 'id_freezer']

    def create(self, validated_data: dict):
        service = FreezerService()
        return service.create_freezer(validated_data=validated_data)
    
    def update(self, instance: Freezer, validated_data: dict):
        service = FreezerService()
        return service.update_freezer(instance, validated_data)

class FreezerOutputSerializer(FreezerInputSerializer):
    laboratory = LaboratorySerializer(many=True)
    drawers = serializers.SerializerMethodField()

    class Meta:
        model = Freezer
        fields = ['id', 'drawers', 'freezer_type'] + FreezerInputSerializer.Meta.fields


    def get_drawers(self, obj):
        drawers =  obj.drawer.all()
        serializer = DrawerSerializerOutput(drawers, many=True, fields=('id', 'name'))
        return serializer.data

class DrawerSrializerInput(StorageSerializerOutput):
    freezer_id = serializers.IntegerField(required=False)

    class Meta:
        model = Drawer
        fields = ['name', 'freezer_id']

    def create(self, validated_data: dict):
        service = DrawerService()
        return service.create_drawer(validated_data=validated_data)
    
    def update(self, instance: Freezer, validated_data: dict):
        service = DrawerService()
        return service.update_storage_object(instance, validated_data)

class DrawerSerializerOutput(StorageSerializerOutput):
    freezer = FreezerOutputSerializer(fields=('id', 'name'))
    shelf = serializers.SerializerMethodField()

    class Meta:
        model = Drawer
        fields = ['id', 'name', 'freezer', 'shelf']

    def get_shelf(self, obj):
        shelfs =  obj.shelf.all()
        serializer = ShelfSerializerOutput(shelfs, many=True, fields=('id', 'name'))
        return serializer.data  

class ShelfSerializerInput(StorageSerializerOutput):
    drawer_id = serializers.IntegerField(required=False)

    class Meta:
        model = Shelf
        fields = ['drawer_id', 'name', 'len_row', 'len_col']

    def create(self, validated_data: dict):
        service = ShelfService()
        return service.create_shelf(validated_data=validated_data)
    
    def update(self, instance: Freezer, validated_data: dict):
        service = ShelfService()
        return service.update_storage_object(instance, validated_data)

class ShelfSerializerOutput(ShelfSerializerInput):
    drawer = DrawerSerializerOutput(fields=('id', 'name'))
    box = serializers.SerializerMethodField()

    class Meta:
        model = Shelf
        fields = ['id', 'name', 'drawer', 'box', 'len_row', 'len_col']

    def get_box(self, obj):
        boxes =  obj.box.all()
        serializer = BoxSerializerOutput(boxes, many=True, fields=('id', 'name'))
        box_places = serializer.data
        boxes_map = [box_places[i:i+obj.len_col] for i in range(0, len(box_places), obj.len_col)]
        return boxes_map
    
class BoxSerializerInput(StorageSerializerOutput):
    shelf_id = serializers.IntegerField()
    count_boxes = serializers.IntegerField(write_only=True)

    class Meta:
        model = Box
        fields = ['shelf_id', 'name', 'count_boxes', 'len_row', 'len_col']

    def create(self, validated_data: dict):
        service = BoxService()
        return service.create_boxes(validated_data=validated_data)
    
    def update(self, instance: Freezer, validated_data: dict):
        service = BoxService()
        return service.update_storage_object(instance, validated_data)
    
class BoxSerializerOutput(BoxSerializerInput):
    shelf = ShelfSerializerOutput(fields=('id', 'name'))
    samples = serializers.SerializerMethodField()

    class Meta:
        model = Box
        fields = ['id', 'name', 'len_row', 'len_col', 'shelf', 'samples']

    def get_samples(self, obj):
        sample_places =  obj.samples_map.all()
        serializer = SamplesSerializerOutut(sample_places, many=True)
        places = serializer.data
        samples_map = [places[i:i+obj.len_col] for i in range(0, len(places), obj.len_col)]
        return samples_map
    
class SamplesSerializerInput(StorageSerializerOutput):
    box_id = serializers.IntegerField()
    count_samples = serializers.IntegerField(default=1)

    class Meta:
        model = SamplesMap
        fields = ['id', 'name', 'count_samples', 'box_id']

    def create(self, validated_data: dict):
        service = SampleMapService()
        return service.create_samples_map(validated_data=validated_data)
    
    def update(self, instance: Freezer, validated_data: dict):
        service = SampleMapService()
        return service.update_storage_object(instance, validated_data)

class SampleSerializer(serializers.Serializer):
    """Получение объектов образцов в хранилище"""
    id = serializers.IntegerField()
    name = serializers.CharField()

class SamplesSerializerOutut(StorageSerializerOutput):
    """Получение списка объектов SamplesMap - места хранения образцов"""
    sample = serializers.SerializerMethodField()

    class Meta:
        model = SamplesMap
        fields = ['id', 'name', 'state_location', 'sample_type', 'sample', 'box']

    def get_sample(self, obj: SamplesMap):
        if obj.sample_id:
            sample = get_object_or_404(Sample, id=obj.sample_id)
            serializer = SampleSerializer(sample)
            return serializer.data
