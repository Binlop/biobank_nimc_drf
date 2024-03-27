import time
from datetime import datetime
import pytz
import json

class RequestMiddleware:
    def __init__(self, get_response):
       self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        if self.check_url_path(request=request):
            timestamp = time.monotonic()

            data = {
                'date': self.get_current_date_UTC_7(),
                'path': request.path,
                'request_total': round(time.monotonic() - timestamp, 3),
                'user': str(request.user),
            }
            self.write_data_to_json_logs(data)
        return response
    
    def check_url_path(self, request):
        if request.path.startswith('/api/sample'):
            return True


    def get_current_date_UTC_7(self):
        current_datetime = datetime.now()
        timezone_utc_7 = pytz.timezone('Asia/Krasnoyarsk')  # Выберите нужную зону времени из базы данных часовых поясов
        current_datetime_utc_7 = current_datetime.astimezone(timezone_utc_7)
        return current_datetime_utc_7.strftime("%Y-%m-%d %H:%M:%S")
    
    def write_data_to_json_logs(self, data):
        with open('request.log', 'a') as f:
           f.write(json.dumps(data) + '\n')

class PostRequestMiddleware:
    def __init__(self, get_response):
       self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        if self.check_request_method(request=request):
            timestamp = time.monotonic()

            data = {
                'date': self.get_current_date_UTC_7(),
                'path': request.path,
                'request_total': round(time.monotonic() - timestamp, 3),
                'user': str(request.user),
            }
            self.write_data_to_json_logs(data)
        return response
    
    def check_request_method(self, request):
        if request.method != 'GET' and not request.path.startswith('/api/user/'):
            return True


    def get_current_date_UTC_7(self):
        current_datetime = datetime.now()
        timezone_utc_7 = pytz.timezone('Asia/Krasnoyarsk')  # Выберите нужную зону времени из базы данных часовых поясов
        current_datetime_utc_7 = current_datetime.astimezone(timezone_utc_7)
        return current_datetime_utc_7.strftime("%Y-%m-%d %H:%M:%S")
    
    def write_data_to_json_logs(self, data):
        with open('request_post_method.log', 'a') as f:
           f.write(json.dumps(data) + '\n')