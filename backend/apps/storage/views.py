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
        objects = selector.get_storage_list(user=request.user)
        serializer = self.get_serializer_class()(objects, many=True)
        return Response(serializer.data)

class StorageDetailView(StorageViewBase):

    def get(self, request, pk):
        selector = self.get_selector_class()
        object = selector.get_storage_detail(user=request.user, pk=pk)
        serializer = self.get_serializer_class()(object)
        return Response(serializer.data)

class StorageCreateView(StorageViewBase):
    
    def post(self, request):
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SampleUpdateView(StorageViewBase):

    def put(self, request, pk):
        selector = SampleDetailSelector()
        sample = selector.get_sample_detail(user=request.user, pk=pk)
        serializer = self.get_serializer_class()(sample, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SampleDeleteView(StorageViewBase):
    
    def delete(self, request, pk):
        selector = SampleDetailSelector()
        member = selector.get_sample_detail(user=request.user, pk=pk, delete=True)
        member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FreezerListView(StorageListView):
    serializer_class = serializers.FreezerOutputSerializer
    selector_class = selectors.StorageListSelector

class FreezerDetailView(StorageDetailView):
    serializer_class = serializers.FreezerOutputSerializer
    selector_class = selectors.FreezerDetailSelector

class FreezerCreateView(StorageCreateView):
    serializer_class = serializers.FreezerOutputSerializer
