from datetime import datetime

from .repositories import DjangoLaboratoryRepository
from .entity import Laboratory

class CreateProductUseCase:
    def __init__(self, laboratory_repository: DjangoLaboratoryRepository) -> None:
        self.product_repository = laboratory_repository

    def execute(self, name: str, description: str) -> Laboratory:
        product = Laboratory(name=name, description=description)

        return self.product_repository.save(product)