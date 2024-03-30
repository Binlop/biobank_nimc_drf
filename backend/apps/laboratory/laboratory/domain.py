from typing import Optional
from datetime import datetime
from dataclasses import dataclass, field

@dataclass(frozen=True)
class Laboratory:
    name: str
    description: str
    id: Optional[int] = None
    created_at: Optional[datetime] = field(default_factory=datetime.now)
    updated_at: Optional[datetime] = field(default_factory=datetime.now)

    def __post_init__(self):
        if not self.created_at:
            self.created_at = datetime.now()

        if not self.updated_at:
            self.updated_at = datetime.now()

        self.validate()

    def validate(self):
        validator = LaboratoryValidator.create()
        is_valid = validator.validate(self.to_dict())

        if not is_valid:
            raise EntityValidationException(validator.errors)
        
    def to_dict(self):
        return {"id": self.id, 'name': self.name, 'description': self.description}