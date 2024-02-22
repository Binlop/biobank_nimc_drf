from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import DNAOutputSerializer, DNAInputSerializer
from .selectors import DNADetailSelector

class DNADetailView(APIView):

    def get(self, request, pk):
        selector = DNADetailSelector()
        dna = selector.get_dna_detail(user=request.user, pk=pk)
        serializer = DNAOutputSerializer(dna)
        return Response(serializer.data)
    
class DNACreateView(APIView):
    
    def post(self, request):
        serializer = DNAInputSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DNAUpdateView(APIView):

    def put(self, request, pk):
        selector = DNADetailSelector()
        sample = selector.get_dna_detail(user=request.user, pk=pk)
        serializer = DNAInputSerializer(sample, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)