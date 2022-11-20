from django.db.models import Sum, Count
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from collection.models import Collection
from collection.serializer import ColletionSerializer
from collection.models import Wishlist
from collection.serializer import WishlistSerializer
# Create your views here.


@api_view(['GET', 'POST'])
@ permission_classes([IsAuthenticated])
def get_sets_in_collection(request, username):
    sets = Collection.objects.filter(user_id=request.user.id)
    sum_type_param = request.query_params.get('sum')

    if (sum_type_param):
        if sum_type_param == 'num_parts':
            # getting total number of parts of logged in user built
            sum_num_parts_obj = {}
            sum_num_parts = sets.aggregate(Sum('num_parts'))
            sum_num_parts_obj['total_num_parts'] = sum_num_parts
            return Response(sum_num_parts_obj)
        elif sum_type_param == 'minifigs':
            # getting total number of minifigs of logged in user
            sum_minifigs_obj = {}
            sum_minifigs = sets.aggregate(Sum('minifigs_num'))
            sum_minifigs_obj['minifigs'] = sum_minifigs
            return Response(sum_minifigs_obj)
        elif sum_type_param == 'theme':
            # getting number of sets logged in user owned
            sum_sets_by_theme = sets.values(
                'theme').annotate(count=Count('theme'))

            return Response(sum_sets_by_theme)
        else:
            sum_all = {}
            sum_num_parts = sets.aggregate(Sum('num_parts'))
            sum_minifigs = sets.aggregate(Sum('minifigs_num'))
            sum_sets_by_theme = sets.values(
                'theme').annotate(count=Count('theme'))
            sum_all['total_num_parts'] = sum_num_parts
            sum_all['total_num_minifigs'] = sum_minifigs
            sum_all['theme'] = sum_sets_by_theme
            return Response(sum_all)

    else:
        if request.method == 'GET':
            # GET request: get lego sets infor in collection model for logged in user
            # example url: http://127.0.0.1:8000/{username}/collection
            # get all the sets in the collection model that belongs to loggined user
            try:
                serializer = ColletionSerializer(sets, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Collection.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        elif request.method == 'POST':
            # POST request: allow logged in user to add a set to his/her collection
            # example url: http://127.0.0.1:8000/{username}/collection
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
            # PATCH request: allow loggin user to update partial information about sets in their collection
            # example url: http://127.0.0.1:8000/{username}/collection/{set_num}
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


@api_view(['GET', 'POST'])
@ permission_classes([IsAuthenticated])
def get_sets_in_wishlist(request, username):
    sets = Wishlist.objects.filter(user_id=request.user.id)
    if request.method == 'GET':
        # GET request: get lego sets infor in wishlist model for logged in user
        # example url: http://127.0.0.1:8000/{username}/wishlist
        # get all the sets in the wishlist model that belongs to loggined user
        try:
            serializer = WishlistSerializer(sets, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Wishlist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'POST':
        # POST request: allow logged in user to add a set to his/her wishlist
        # example url: http://127.0.0.1:8000/{username}/wishlist
        serializer = WishlistSerializer(data=request.data)
        if serializer.is_valid():
            # if the set has already exist in the user's wishlist will not save it and return status code 409
            # otherwise save it into the database
            # # print(request.data.get('set_num'))
            try:
                if (sets.get(set_num=request.data.get('set_num'))):
                    return Response(status=status.HTTP_409_CONFLICT)
            except Wishlist.DoesNotExist:
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@ permission_classes([IsAuthenticated])
def get_a_set_in_wishlist(request, username, setnum):
    set = Wishlist.objects.filter(user_id=request.user.id).get(
        set_num=setnum)
    if request.method == 'DELETE':
        set.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
