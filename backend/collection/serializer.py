from rest_framework import serializers
from collection.models import Collection


class ColletionSerializer(serializers.ModelSerialiser):
    class Meta:
        model = Collection
        field = ['user_id', 'set_num', 'set_name', 'release_year', 'theme',
                 'num_parts', 'set_img_url', 'purchase_date', 'build_completion_date']
        depth = 1
