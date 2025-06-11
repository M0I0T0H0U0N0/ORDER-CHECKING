from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Drink
from .serializer import DrinkSerializer
from .models import Order
from .serializer import OrderSerializer


@api_view(['GET', 'POST'])
def drink_list(request):
    if request.method == 'GET':
        drinks = Drink.objects.all()
        serializer = DrinkSerializer(drinks, many=True)
        return Response({'drinks': serializer.data}, status=status.HTTP_200_OK)

    if request.method == 'POST':
        email = request.data.get('mail')
        password = request.data.get('password')

        print("Incoming data:", request.data)

        # Use filter instead of get
        users = Drink.objects.filter(mail=email)

        if not users.exists():
            print("email not found")
            return Response({"message": "Email not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if any user has matching password
        for user in users:
            if user.password == password:
                print("login successul")
                return Response({"message": "Login successful"}, status=status.HTTP_200_OK)

        # If no password matches
            else:
                print("incorrect passwrod")
                return Response({"message": "Incorrect password"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'POST'])
def order_list(request):
    if request.method == 'GET':
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response({'orders': serializer.data}, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)