from .domain import Laboratory
from laboratory.models import Laboratory as LaboratoryModel


class DjangoLaboratoryRepository:
    def save(self, product: Laboratory) -> Laboratory:
        django_product = LaboratoryModel.from_entity(product)
        django_product.save()
        return django_product.to_entity()