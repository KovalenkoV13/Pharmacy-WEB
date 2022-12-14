# Generated by Django 4.1.1 on 2022-12-26 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('cost', models.FloatField(blank=True, null=True)),
                ('img', models.CharField(blank=True, max_length=255, null=True)),
                ('user_profile_userprofile', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'cart',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id_cat', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('description', models.CharField(blank=True, max_length=1000000, null=True)),
                ('prim', models.CharField(blank=True, max_length=100000, null=True)),
            ],
            options={
                'db_table': 'category',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Good',
            fields=[
                ('name', models.CharField(max_length=500, primary_key=True, serialize=False)),
                ('brand', models.CharField(blank=True, max_length=1000, null=True)),
                ('cost', models.FloatField(blank=True, null=True)),
                ('img', models.CharField(blank=True, max_length=100, null=True)),
                ('time_create', models.DateField(blank=True, null=True)),
                ('time_update', models.DateField(blank=True, null=True)),
                ('vest', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'good',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Ordergood',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('id_order', models.IntegerField(blank=True, null=True)),
                ('namegood', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'ordergood',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('sum', models.IntegerField(blank=True, null=True)),
                ('addres', models.CharField(blank=True, max_length=100, null=True)),
                ('users', models.IntegerField(blank=True, null=True)),
                ('time_create', models.DateField(blank=True, null=True)),
                ('time_update', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'orders',
                'managed': False,
            },
        ),
    ]
