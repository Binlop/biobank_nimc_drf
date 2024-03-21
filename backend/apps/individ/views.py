from typing import Any
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from . import serializer as serializers
from .selectors import FamilyMemberListSelector, FamilyMemberDetailSelector

class IndividViewBase(APIView):
    serializer_class = None
    selector_class = None

    def get_serializer_class(self):
        if self.serializer_class is None:
            raise ValueError("Serializer class is not specified")
        return self.serializer_class
    
    def get_selector_class(self):
        if self.selector_class is None:
            raise ValueError("Selector class is not specified")
        return self.selector_class()

class FamilyMemberListView(IndividViewBase):

    def get(self, request, format=None):
        print(request.user)
        selector = FamilyMemberListSelector()
        members = selector.get_individ_list(user=request.user)      
        serializer = serializers.IndividSerializerListOutput(members, many=True)
        return Response(serializer.data)

class FamilyMemberListSearchView(IndividViewBase):

    def get(self, request, format=None):
        """Список отфильтрованных индивидов"""
        selector = FamilyMemberListSelector()
        members = selector.get_filtered_individ_list(user=request.user, filters=request.query_params)
        serializer = serializers.IndividSerializerListOutput(members, many=True)
        return Response(serializer.data)
    
class FamilyMembersToFamilyView(IndividViewBase):
    """Список индивидов семьи"""
    def get(self, request, pk):
        selector = FamilyMemberListSelector()
        members = selector.filter_individs_by_family(user=request.user, family_id=pk)
        serializer = serializers.IndividSerializerListOutput(members, many=True)
        return Response(serializer.data)

class FamilyMemberDetail(IndividViewBase):

    def get(self, request, pk):
        selector = FamilyMemberDetailSelector()
        member = selector.get_individ_detail(user=request.user, pk=pk)
        serializer = serializers.IndividSerializerDetailOutput(member)
        return Response(serializer.data)
    
class FamilyMemberCreateView(IndividViewBase):
    """
    Базовый класс для создания семейных участников.
    """ 
    def post(self, request):
        print(request.data)
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FamilyMemberUpdateView(IndividViewBase):
    """
    Базовый класс для изменения членов семьи.
    """
    def put(self, request, pk):
        print(request.data)
        selector = self.get_selector_class()
        member = selector.get_individ_detail(user=request.user, pk=pk)
        serializer = self.get_serializer_class()(member, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FamilyMemberDeleteView(IndividViewBase):
    
    def delete(self, request, pk):
        selector = FamilyMemberDetailSelector()
        member = selector.get_individ_detail(user=request.user, pk=pk)
        member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class EmbryoCreateView(FamilyMemberCreateView):
    serializer_class = serializers.EmbryoSerializerInput

class EmbryoUpdateView(FamilyMemberUpdateView):
    selector_class = FamilyMemberDetailSelector
    serializer_class = serializers.EmbryoSerializerInput


class FatherCreateView(FamilyMemberCreateView):
    serializer_class = serializers.FatherSerializerInput
    
class FatherUpdateView(FamilyMemberUpdateView):
    selector_class = FamilyMemberDetailSelector
    serializer_class = serializers.FatherSerializerInput
    
class MotherCreateView(FamilyMemberCreateView):
    serializer_class = serializers.MotherSerializerInput
    
class MotherUpdateView(FamilyMemberUpdateView):
    selector_class = FamilyMemberDetailSelector
    serializer_class = serializers.MotherSerializerInput
    
class AnotherMemberCreateView(FamilyMemberCreateView):
    serializer_class = serializers.AnotherMemberSerializerInput
    
class AnotherMemberUpdateView(FamilyMemberUpdateView):
    selector_class = FamilyMemberDetailSelector
    serializer_class = serializers.AnotherMemberSerializerInput

class MotherPregnancyView(APIView):
    
    def get(self, request, pk):
        selector = FamilyMemberDetailSelector()
        pregnancy = selector.get_mother_pregnancy(mother_id=pk)
        serializer = serializers.MotherPregnancySerializer(pregnancy, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk):
        selector = self.get_selector_class()
        member = selector.get_individ_detail(user=request.user, pk=pk)
        serializer = self.get_serializer_class()(member, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        selector = FamilyMemberDetailSelector()
        member = selector.get_individ_detail(user=request.user, pk=pk)
        member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)