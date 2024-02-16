from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import FamilyMemberSerializerOutput
from .selectors import FamilyMemberListSelector

class FamilyMemberListView(APIView):

    def get(self, request, format=None):
        members = FamilyMemberListSelector.get_individ_list(user=request.user)      
        serializer = FamilyMemberSerializerOutput(members, many=True)
        return Response(serializer.data)
    
    # def delete(self, request, pk):
    #     family = FamilyDetailSelector.get_family_detail(user=request.user, id=pk)
    #     family.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
