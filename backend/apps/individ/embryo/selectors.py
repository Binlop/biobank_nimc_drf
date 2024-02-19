from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from ..selectors import FamilyMemberCheckingPermission
from .models import Embryo

class EmbryoDetailSelector:

    def get_embryo_detail(self, user: User, pk: int) -> Embryo:
        embryo = get_object_or_404(Embryo, id=pk)
        check_perm = FamilyMemberCheckingPermission()
        return check_perm.check_user_acces_to_family_member(member=embryo, user=user)