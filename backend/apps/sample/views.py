from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import SampleSerializerOutput
from .selectors import SampleListSelector

class SampleListView(APIView):

    def get(self, request, format=None):
        samples = SampleListSelector.get_samples_list(user=request.user)      
        serializer = SampleSerializerOutput(samples, many=True)
        return Response(serializer.data)
    