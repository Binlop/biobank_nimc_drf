from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializer as serializers
from .selectors import SampleListSelector, SampleDetailSelector
from rest_framework import status

class SampleViewBase(APIView):
    serializer = None
    
    def get_serializer_class(self):
        return self.serializer

class SampleListView(SampleViewBase):

    def get(self, request, format=None):
        samples = SampleListSelector.get_samples_list(user=request.user)      
        serializer = serializers.SampleSerializerOutput(samples, many=True)
        return Response(serializer.data)
    
class SampleDetailView(SampleViewBase):

    def get(self, request, pk):
        selector = SampleDetailSelector()
        sample = selector.get_sample_detail(user=request.user, pk=pk)
        serializer = self.get_serializer_class()(sample)
        return Response(serializer.data)


class SampleCreateView(SampleViewBase):
    
    def post(self, request):
        serializer = self.get_serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SampleUpdateView(SampleViewBase):

    def put(self, request, pk):
        selector = SampleDetailSelector()
        sample = selector.get_sample_detail(user=request.user, pk=pk)
        serializer = serializers.DNAInputSerializer(sample, data=request.data)
        serializer = self.get_serializer_class()(sample, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DNADetailView(SampleDetailView):
    serializer = serializers.DNAOutputSerializer
    
class DNACreateView(SampleCreateView):
    serializer = serializers.DNAInputSerializer
    
class DNAUpdateView(SampleUpdateView):
    serializer = serializers.DNAInputSerializer
