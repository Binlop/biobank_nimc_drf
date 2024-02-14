from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import FamilySerializer
from .selectors import FamilyListSelector, FamilyDetailSelector


class FamilyListView(APIView):

    def get(self, request):
        families = FamilyListSelector.get_family_list(user=request.user)
        serializer = FamilySerializer(families, many=True)
        return Response(serializer.data)

class FamilyCreateView(APIView):

    def post(self, request):
        serializer = FamilySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FamilyDetailView(APIView):

    def get(self, request, pk):
        family = FamilyDetailSelector.get_family_detail(user=request.user, id=pk)
        serializer = FamilySerializer(family)
        return Response(serializer.data)

class FamilyUpdateView(APIView):

    def put(self, request, pk):
        family = FamilyDetailSelector.get_family_detail (user=request.user, id=pk)
        serializer = FamilySerializer(family, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)