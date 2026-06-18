from django.http import JsonResponse
from rest_framework.views import APIView


class UsersView(APIView):
    def get(self, request):
        return JsonResponse([{'id': 1, 'name': 'Test User'}], safe=False)


class ActivitiesView(APIView):
    def get(self, request):
        return JsonResponse([{'id': 1, 'name': 'Running'}], safe=False)
