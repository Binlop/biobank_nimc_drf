from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from ..selectors import SampleCheckingPermission
from ..models import DNA

class DNADetailSelector:

    def get_dna_detail(self, user: User, pk: int) -> DNA:
        sample = get_object_or_404(DNA, id=pk)
        check_perm = SampleCheckingPermission()
        return check_perm.check_user_acces_to_family_member(sample=sample, user=user)