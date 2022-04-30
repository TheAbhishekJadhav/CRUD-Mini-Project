import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.serializers import ProductSerializer
from api.models import Product
from rest_framework import serializers
from rest_framework import status

# Create your views here.

@api_view(['GET'])
def getItems(request):
    qs = Product.objects.all()
    serializer = ProductSerializer(qs, many=True)
    return Response(serializer.data)
@api_view(['POST'])
def addItems(request):
    prod = ProductSerializer(data=request.data)
    dp = json.dumps(request.data)
    reqData = json.loads(dp)
    newItem = reqData['item']
    print("item",newItem)
    if Product.objects.filter(item=newItem).exists():
        raise serializers.ValidationError('This data already exists')
    if prod.is_valid():
        prod.save()
        return Response(prod.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
def updateItems(request):
    dp = json.dumps(request.data)
    reqData = json.loads(dp)
    id = reqData['id']
    prod = Product.objects.get(id=id)
    data = ProductSerializer(instance=prod, data=request.data)
    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
@api_view(['DELETE'])
def deleteItems(request):
    dp = json.dumps(request.data)
    reqData = json.loads(dp)
    id = reqData['id']
    prod = Product.objects.get(id=id)
    prod.delete()
    return Response(status=status.HTTP_202_ACCEPTED)
    