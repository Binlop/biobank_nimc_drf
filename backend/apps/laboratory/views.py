from .serializers import LaboratorySerializer
from rest_framework.response import Response
from rest_framework import status
from .selectors import LaboratoryListSelector, LaboratoryDetailSelector
from rest_framework.views import APIView

class LaboratoryListView(APIView):
    serializer_class = LaboratorySerializer

    def get(self, request):
        laboratories = LaboratoryListSelector.get_laboratory_list(user=request.user)
        serializer = LaboratorySerializer(laboratories, many=True)
        return Response(serializer.data)

class LaboratoryCreateView(APIView):
    serializer_class = LaboratorySerializer

    def post(self, request):
        serializer = LaboratorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LaboratoryDetailView(APIView):
    serializer_class = LaboratorySerializer

    def get(self, request, pk):
        laboratory = LaboratoryDetailSelector.get_laboratory_detail(user=request.user, id=pk)
        serializer = LaboratorySerializer(laboratory)
        return Response(serializer.data)

class LaboratoryUpdateView(APIView):

    def put(self, request, pk):
        laboratory = LaboratoryDetailSelector.get_laboratory_detail(user=request.user, id=pk)
        serializer = LaboratorySerializer(laboratory, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)