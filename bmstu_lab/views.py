from django.shortcuts import render
from django.http import HttpResponse

def model():
   data = {'data': {
        'category': [
            {'title': 'Каталог', 'desk': 'Здесь вы можете выбрать препараты, медицинские устройства и тд', 'id': 1},
            {'title': 'Доставка', 'desk': 'Условия и положения доставки', 'id': 2},
            {'title': 'Помощь в выборе', 'desk': 'Бот для помощи в выборе препарата', 'id': 3}
        ]
    }}
   return data

def GetCategories(request):
    return render(request, 'categories.html', model())


def GetCategory(request, title, id, desk):
    return render(request, 'order.html',
     {'datas':
        {
                'title': title,
                'id': id,
                'desk': desk


    }})


