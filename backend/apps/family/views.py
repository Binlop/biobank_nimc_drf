from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import FamilySerializerOutput, FamilySerializerInput
from .selectors import FamilyListSelector, FamilyDetailSelector
from .services import FamilyCreateService

class FamilyListView(APIView):

    def get(self, request):
        families = FamilyListSelector.get_family_list(user=request.user)
        serializer = FamilySerializerOutput(families, many=True)
        return Response(serializer.data)

class FamilyCreateView(APIView):

    def post(self, request):
        serializer = FamilySerializerInput(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FamilyDetailView(APIView):

    def get(self, request, pk):
        family = FamilyDetailSelector.get_family_detail(user=request.user, id=pk)
        serializer = FamilySerializerOutput(family)
        return Response(serializer.data)

    def delete(self, request, pk):
        family = FamilyDetailSelector.get_family_detail(user=request.user, id=pk)
        family.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FamilyUpdateView(APIView):

    def put(self, request, pk):
        family = FamilyDetailSelector.get_family_detail (user=request.user, id=pk)
        serializer = FamilySerializerInput(family, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)