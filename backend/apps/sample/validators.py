import re
from rest_framework import serializers


def check_not_gaps(value):
    res = bool(re.search(r"\s", value))
    if res:
        raise serializers.ValidationError("В строке не должно быть пробелов")
    
def check_not_cyrillic(value):
    res = bool(re.search('[а-яА-Я]', value))
    if res:
        raise serializers.ValidationError("В строке не должно быть кириллицы")
    
def check_only_upper_letters(value):
    if value.isdigit():
        return True
    elif value.isalpha():
        if not value.isupper():
            raise serializers.ValidationError("В строке должны быть только заглавные буквы")
    else: 
        for char in value:
            if char.isdigit():
                continue
            elif char.isalpha() and not char.isupper():
                raise serializers.ValidationError("В строке должны быть только заглавные буквы")
            