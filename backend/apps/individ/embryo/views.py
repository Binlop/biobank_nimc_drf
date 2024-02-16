from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import EmbryoSerializerOutput, EmbryoSerializerInput
from .models import Embryo
from ..selectors import FamilyMemberCheckingPermission
from django.shortcuts import get_object_or_404

class EmbryoDetailView(APIView):

    def get(self, request, pk):
        check_perm = FamilyMemberCheckingPermission()
        embryo = check_perm.check_user_acces_to_family_member(member=get_object_or_404(Embryo, id=pk), user=request.user)
        serializer = EmbryoSerializerOutput(embryo)
        return Response(serializer.data)
    

    
class EmbryoCreateView(APIView):
    
    def post(self, request):
        serializer = EmbryoSerializerInput(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)