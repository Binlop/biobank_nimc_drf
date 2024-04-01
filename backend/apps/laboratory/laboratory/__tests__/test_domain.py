import unittest
from datetime import datetime
from unittest.mock import patch

from ..entity import Laboratory

class TestLaboratoryUnit(unittest.TestCase):
    def test_constructor(self):
        with patch.object(Laboratory, "validate") as mock_validate_method:
            laboratory = Laboratory("Laboratory_1", "None")
            mock_validate_method.assert_called_once()
            self.assertEqual(laboratory.name, "Laboratory_1")
            self.assertIsNone(laboratory.id)
            self.assertEqual(laboratory.description, "None")
            self.assertIsInstance(laboratory.created_at, datetime)
            self.assertIsInstance(laboratory.updated_at, datetime)