from typing import Any
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from . import serializer as base_serializer
from .selectors import FamilyMemberListSelector, FamilyMemberDetailSelector


class FamilyMemberListView(APIView):

    def get(self, request, format=None):
        members = FamilyMemberListSelector.get_individ_list(user=request.user)      
        serializer = base_serializer.IndividSerializerOutput(members, many=True)
        return Response(serializer.data)

class FamilyMemberDeleteView(APIView):
    
    def delete(self, request, pk):
        selector = FamilyMemberDetailSelector()
        member = selector.get_individ_detail(user=request.user, pk=pk)
        member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FamilyMemberDetail(APIView):

    def get(self, request, pk):
        selector = FamilyMemberDetailSelector()
        member = selector.get_individ_detail(user=request.user, pk=pk)
        serializer = base_serializer.IndividSerializerOutput(member)
        return Response(serializer.data)
    

class FamilyMemberCreateView(APIView):
    """
    Базовый класс для создания семейных участников.
    """ 
    def post(self, request):
        serializer = self.get_serializer_class(request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer_class(self, requested_data):
        return base_serializer.AnotherSerializerInput(requested_data)

class FamilyMemberUpdateView(APIView):
    """
    Базовый класс для изменения членов семьи.
    """
    def put(self, request, pk):
        print(request.data)
        selector = FamilyMemberDetailSelector()
        member = selector.get_individ_detail(user=request.user, pk=pk)
        serializer = self.get_serializer(instance=member, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_serializer_class(self, requested_data):
        return base_serializer.AnotherSerializerInput(requested_data)

class EmbryoCreateView(FamilyMemberCreateView):
    def get_serializer_class(self, requested_data):
        return base_serializer.EmbryoSerializerInput(requested_data)

class EmbryoUpdateView(FamilyMemberUpdateView):
    def get_serializer_class(self, instance, requested_data):
        return base_serializer.EmbryoSerializerInput(instance, requested_data)

class FatherCreateView(FamilyMemberCreateView):
    def get_serializer_class(self, requested_data):
        return base_serializer.FatherSerializerInput(requested_data)
    
class FatherUpdateView(FamilyMemberUpdateView):
    def get_serializer_class(self, instance, requested_data):
        return base_serializer.FatherSerializerInput(instance, requested_data)
    
class MotherCreateView(FamilyMemberCreateView):
    def get_serializer_class(self, requested_data):
        return base_serializer.MotherSerializerInput(requested_data)
    
class MotherUpdateView(FamilyMemberUpdateView):
    def get_serializer_class(self, instance, requested_data):
        return base_serializer.MotherSerializerInput(instance, requested_data)
    
class AnotherFamilyCreateView(FamilyMemberCreateView):
    def get_serializer_class(self, requested_data):
        return base_serializer.AnotherSerializerInput(requested_data)
    
class AnotherFamilyUpdateView(FamilyMemberUpdateView):
    def get_serializer_class(self, instance, requested_data):
        return base_serializer.AnotherSerializerInput(instance, requested_data)