from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializer as serializers
from .selectors import SampleListSelector, SampleDetailSelector
from .services.sample import BaseSampleService
from rest_framework import status

class SampleViewBase(APIView):
    serializer = None
    selector = None

    def get_serializer_class(self):
        return self.serializer
    
    def get_selector_class(self):
        return self.selector

class SampleListView(SampleViewBase):

    def get(self, request, format=None):
        selector = SampleListSelector()
        samples = selector.get_samples_list(user=request.user)      
        serializer = serializers.CustomSampleSerializerOutput(samples, many=True)
        return Response(serializer.data)

class IndividSampleList(SampleViewBase):

    def get(self, request, pk):
        selector = SampleListSelector()
        samples = selector.get_individ_samples(user=request.user, individ_id=pk)      
        serializer = serializers.SamplesToIndividSerializer(samples, many=True)
        return Response(serializer.data)
    
class SampleListViewByBarcode(SampleViewBase):

    def get(self, request, barcode):
        selector = SampleListSelector()
        samples = selector.get_sample_by_barcode(user=request.user, barcode=barcode)      
        serializer = serializers.CustomSampleSerializerOutput(samples, many=True)
        return Response(serializer.data)

class SampleDetailView(SampleViewBase):

    def get(self, request, pk):
        selector = SampleDetailSelector()
        sample = selector.get_sample_detail(user=request.user, pk=pk)
        serializer = serializers.SampleSerializerBase(sample)
        return Response(serializer.data)

class SampleCreateView(SampleViewBase):
    
    def post(self, request):
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SampleUpdateView(SampleViewBase):

    def put(self, request, pk):
        selector = SampleDetailSelector()
        sample = selector.get_sample_detail(user=request.user, pk=pk)
        serializer = self.get_serializer_class()(sample, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SampleDeleteView(SampleViewBase):
    
    def delete(self, request, pk):
        selector = SampleDetailSelector()
        service = BaseSampleService()
        member = selector.get_sample_detail(user=request.user, pk=pk, delete=True)
        service.delete_sample(instance=member)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class DNACreateView(SampleCreateView):
    serializer = serializers.DNAInputSerializer
    
class DNAUpdateView(SampleUpdateView):
    serializer = serializers.DNAInputSerializer
    

class BloodCreateView(SampleCreateView):
    serializer = serializers.BloodInputSerializer
    
class BloodUpdateView(SampleUpdateView):
    serializer = serializers.BloodInputSerializer

    
class ChorionCreateView(SampleCreateView):
    serializer = serializers.ChorionInputSerializer
    
class ChorionUpdateView(SampleUpdateView):
    serializer = serializers.ChorionInputSerializer


class EndometriumCreateView(SampleCreateView):
    serializer = serializers.EndometriumInputSerializer
    
class EndometriumUpdateView(SampleUpdateView):
    serializer = serializers.EndometriumInputSerializer


class FetalSacNitrogenCreateView(SampleCreateView):
    serializer = serializers.FetalSacNitrogenInputSerializer
    
class FetalSacNitrogenUpdateView(SampleUpdateView):
    serializer = serializers.FetalSacNitrogenInputSerializer


class FetalSacFreezerCreateView(SampleCreateView):
    serializer = serializers.FetalSacFreezerInputSerializer
    
class FetalSacFreezerUpdateView(SampleUpdateView):
    serializer = serializers.FetalSacFreezerInputSerializer

class SampleAliquotsListView(APIView):
    """Список аликвот для конкретного образца"""
    def get(self, request, pk):
        selector = SampleListSelector()
        aliquots = selector.get_sample_aliquots(user=request.user, sample_id=pk)      
        serializer = serializers.SamplesToIndividSerializer(aliquots, many=True)
        return Response(serializer.data)

class AliquotCreateView(SampleCreateView):
    serializer = serializers.AliquotInputSerializer
    
class AliquotUpdateView(SampleUpdateView):
    serializer = serializers.AliquotInputSerializer

class SampleChageStatusView(APIView):
    """Меняет статус образца(в работе/свободен)"""
    def put(self, request, pk):
        selector = SampleDetailSelector()
        print(request.user)
        sample = selector.get_sample_detail(user=request.user, pk=pk, delete=True)
        serializer =serializers.SampleSerializerOutput(sample, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)