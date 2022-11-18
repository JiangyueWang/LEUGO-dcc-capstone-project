from rest_framework import serializers
from collection.models import Collection


class ColletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['user_id', 'set_num', 'set_name', 'release_year', 'theme',
                  'num_parts', 'minifigs_num', 'set_img_url', 'purchase_date', 'build_completion_date']
        depth = 1
