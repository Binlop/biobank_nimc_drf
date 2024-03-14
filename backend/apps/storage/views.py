from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from . import serializer as serializers
from . import selectors

class StorageViewBase(APIView):
    serializer_class = None
    selector_class = None

    def get_serializer_class(self):
        if self.serializer_class is None:
            raise ValueError("Serializer class is not specified")
        return self.serializer_class
    
    def get_selector_class(self):
        if self.selector_class is None:
            raise ValueError("Selector class is not specified")
        return self.selector_class()

class StorageListView(StorageViewBase):

    def get(self, request):
        selector = self.get_selector_class()
        objs = selector.get_storage_list(user=request.user)
        serializer = self.get_serializer_class()(objs, many=True)
        return Response(serializer.data)

class StorageDetailView(StorageViewBase):

    def get(self, request, pk):
        selector = self.get_selector_class()
        obj = selector.get_storage_detail(user=request.user, pk=pk)
        serializer = self.get_serializer_class()(obj)
        return Response(serializer.data)

class StorageCreateView(StorageViewBase):
    
    def post(self, request):
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StorageUpdateView(StorageViewBase):

    def put(self, request, pk):
        selector = self.get_selector_class()
        obj = selector.get_storage_detail(user=request.user, pk=pk)
        serializer = self.get_serializer_class()(obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StorageDeleteView(StorageViewBase):
    
    def delete(self, request, pk):
        selector = self.get_selector_class()
        obj = selector.get_storage_detail(user=request.user, pk=pk)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FreezerListView(StorageListView):
    serializer_class = serializers.FreezerOutputSerializer
    selector_class = selectors.StorageListSelector

class FreezerDetailView(StorageDetailView):
    serializer_class = serializers.FreezerOutputSerializer
    selector_class = selectors.FreezerDetailSelector

class FreezerCreateView(StorageCreateView):
    serializer_class = serializers.FreezerInputSerializer

class FreezerUpdateView(StorageUpdateView):
    serializer_class = serializers.FreezerInputSerializer
    selector_class = selectors.FreezerDetailSelector

class FreezerDeleteView(StorageDeleteView):
    selector_class = selectors.FreezerDetailSelector


class DrawerDetailView(StorageDetailView):
    serializer_class = serializers.DrawerSerializerOutput
    selector_class = selectors.DrawerDetailSelector

class DrawerCreateView(StorageCreateView):
    serializer_class = serializers.DrawerSrializerInput

class DrawerUpdateView(StorageUpdateView):
    serializer_class = serializers.DrawerSrializerInput
    selector_class = selectors.DrawerDetailSelector


class ShelfrDetailView(StorageDetailView):
    serializer_class = serializers.ShelfSerializerOutput
    selector_class = selectors.ShelfDetailSelector

class ShelfCreateView(StorageCreateView):
    serializer_class = serializers.ShelfSerializerInput

class ShelfUpdateView(StorageUpdateView):
    serializer_class = serializers.ShelfSerializerInput
    selector_class = selectors.ShelfDetailSelector


class BoxDetailView(StorageDetailView):
    serializer_class = serializers.BoxSerializerOutput
    selector_class = selectors.BoxDetailSelector

class BoxCreateView(StorageCreateView):
    serializer_class = serializers.BoxSerializerInput

class BoxUpdateView(StorageUpdateView):
    serializer_class = serializers.BoxSerializerInput
    selector_class = selectors.BoxDetailSelector


class SampleMapCreateView(StorageCreateView):
    serializer_class = serializers.SamplesSerializerInput

class SampleMapListView(StorageCreateView):
    
    def get(self, request, pk):
        selector = selectors.StorageListSelector()
        objs = selector.get_free_sample_places(user=request.user, pk=pk)
        serializer = serializers.SamplesSerializerOutut(objs, many=True)
        return Response(serializer.data)