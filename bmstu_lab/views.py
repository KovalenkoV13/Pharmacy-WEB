from django.shortcuts import render
from django.http import HttpResponse
from datetime import date


def GetCategories(request):
    return render(request, 'categories.html', {'data': {
        'category': [
            {'title': 'Одежда и обувь', 'id': 1},
            {'title': 'Электроника', 'id': 2},
            {'title': 'Все для дома', 'id': 3},
            {'title': 'Мебель', 'id': 4},
            {'title': 'Авто', 'id': 5},
        ],
        'descriptions': [
            {'desс': 'Удобная и практичная одежда и обувь от проверенных продавцов', 'id': 1}
        ]
    }})


def GetCategory(request, id):
    return render(request, 'order.html',
                  {'data':
                      {
                          'id': id,
                      }
                  })
