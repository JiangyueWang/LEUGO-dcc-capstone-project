from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from collection.models import Collection
from collection.serializer import ColletionSerializer
# Create your views here.


@api_view(['GET', 'POST'])
@ permission_classes([IsAuthenticated])
def get_sets_in_collection(request, username):
    sets = Collection.objects.filter(user_id=request.user.id)
    if request.method == 'GET':
        # GET request: get lego sets infor in collection model for logged in user
        # example url: http://127.0.0.1:8000/testuser/collection
        # get all the sets in the collection model that belongs to loggined user
        try:
            serializer = ColletionSerializer(sets, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Collection.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'POST':
        # POST request: allow logged in user to add a set to his/her collection
        # example url: http://127.0.0.1:8000/testuser/collection
        serializer = ColletionSerializer(data=request.data)
        if serializer.is_valid():
            # if the set has already exist in the user's collection will not save it and return status code 409
            # otherwise save it into the database
            # # print(request.data.get('set_num'))
            try:
                if (sets.get(set_num=request.data.get('set_num'))):
                    return Response(status=status.HTTP_409_CONFLICT)
            except Collection.DoesNotExist:
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PATCH', 'DELETE'])
@ permission_classes([IsAuthenticated])
def get_a_set(request, username, setnum):

    try:
        set = Collection.objects.filter(user_id=request.user.id).get(
            set_num=setnum)
        if request.method == 'PATCH':
            serializer = ColletionSerializer(
                set, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'DELETE':
            set.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    except Collection.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
