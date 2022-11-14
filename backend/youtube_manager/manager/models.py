from django.db import models, migrations

class User_credentials(models.Model):
    token = models.CharField(max_length=250)
    refresh_token = models.CharField(max_length=250)
    id_token = models.CharField(max_length=250)
    token_uri = models.CharField(max_length=250)
    client_id = models.CharField(max_length=250)
    client_secret = models.CharField(max_length=250)
    scopes = models.CharField(max_length=250)

