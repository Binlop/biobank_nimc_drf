from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LaboratoryValidator(BaseModel):
    name: str
    description: str
    id: Optional[int] = None
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
