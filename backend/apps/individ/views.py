from typing import Any
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializer import IndividSerializerOutput, EmbryoSerializerInput
from .selectors import FamilyMemberListSelector, FamilyMemberDetailSelector


class FamilyMemberListView(APIView):

    def get(self, request, format=None):
        members = FamilyMemberListSelector.get_individ_list(user=request.user)      
        serializer = IndividSerializerOutput(members, many=True)
        return Response(serializer.data)

class FamilyMemberDeleteView(APIView):
    
    def delete(self, request, pk):
        member = FamilyMemberDetailSelector.get_individ_detail(user=request.user, pk=pk)
        member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FamilyMemberDetail(APIView):

    def get(self, request, pk):
        selector = FamilyMemberDetailSelector()
        member = selector.get_individ_detail(user=request.user, pk=pk) 
        serializer = IndividSerializerOutput(member)
        return Response(serializer.data)
    

class FamilyMemberCreateView(APIView):
    """
    Базовый класс для создания семейных участников.
    """
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer(self, *args, **kwargs):
        # Возвращает сериализатор, переданный в параметрах запроса, или сериализатор по умолчанию
        serializer_class = kwargs.pop('serializer_class', EmbryoSerializerInput)
        return serializer_class(*args, **kwargs)


class EmbryoCreateView(FamilyMemberCreateView):
    serializer = EmbryoSerializerInput