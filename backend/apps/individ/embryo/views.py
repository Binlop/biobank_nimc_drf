from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import EmbryoSerializerOutput, EmbryoSerializerInput
from .selectors import EmbryoDetailSelector

class EmbryoDetailView(APIView):

    def get(self, request, pk):
        selector = EmbryoDetailSelector()
        embryo = selector.get_embryo_detail(user=request.user, pk=pk)
        serializer = EmbryoSerializerOutput(embryo)
        return Response(serializer.data)
    

    
class EmbryoCreateView(APIView):
    
    def post(self, request):
        print(request.data)
        serializer = EmbryoSerializerInput(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class EmbryoUpdateView(APIView):

    def put(self, request, pk):
        selector = EmbryoDetailSelector()
        embryo = selector.get_embryo_detail(user=request.user, pk=pk)
        serializer = EmbryoSerializerInput(embryo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)