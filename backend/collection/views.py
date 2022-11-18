from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from collection.models import Collection
from collection.serializer import ColletionSerializer
# Create your views here.


@api_view(['GET'])
@ permission_classes([IsAuthenticated])
def get_sets_in_collection(requst, username):
    if requst.method == 'GET':
        # GET request: get lego sets infor in collection model for logged in user
        # example url: http://127.0.0.1:8000/testuser/collection
        # get all the sets in the collection model that belongs to loggined user
        sets = Collection.objects.filter(user_id=requst.user.id)
        try:
            serializer = ColletionSerializer(sets, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Collection.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
