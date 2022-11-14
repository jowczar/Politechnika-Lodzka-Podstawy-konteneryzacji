from django.shortcuts import HttpResponse, render, HttpResponseRedirect

import os
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
import google.oauth2.credentials
import google.auth.transport.requests
from django.shortcuts import redirect
from django.urls import reverse
from django.db import models

from manager.models import User_credentials
from django.conf import settings

scopes = ["https://www.googleapis.com/auth/youtube.readonly"]
REDIRECT_URI = "http://127.0.0.1:8000/auth/"
client_secrets_file = "client_secret.json"
# Create your views here.
def index(request):
    return render(request, 'manager/index.html')

def login(request):
 # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    os.environ["OAUTHLIB_RELAX_TOKEN_SCOPE"] = "0"
    # Get credentials and create an API client
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        client_secrets_file, scopes)

    flow.redirect_uri = REDIRECT_URI
    
    authorization_url, state = flow.authorization_url(
                access_type='offline',
                approval_prompt='force',
                #which email is trying to login?
                # Enable incremental authorization. Recommended as a         best     practice.
                include_granted_scopes='true'
                )

    
    return HttpResponseRedirect(authorization_url)

def g_auth_endpoint(request):
    #this is the endpoint that the logged in token is sent to
    #here we are basically exchanging the auth code provided by gmail for an     access token.
    #the access token allows us to send emails.
    #it is a passthrough endpoint: we want to redirect to the next stage of 
    #whatever process they are doing here on completion.
    #===============================================
    #first we need to get the paramater 'state' from the url
    #NOTE that you should do some error handling here incase its not a valid token. I've removed that for brevity on stack overflow
    state = request.GET.get('state',None)


    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        client_secrets_file, scopes, state=state)
    flow.redirect_uri = REDIRECT_URI

    #get the full URL that we are on, including all the "?param1=token&param2=key" parameters that google has sent us.
    authorization_response = request.build_absolute_uri()
    #now turn those parameters into a token.
    flow.fetch_token(authorization_response=authorization_response)

    credentials = flow.credentials
    print("CREDENTIALS HERE =====>")
    print(credentials)
    request.session['id_token'] = credentials.id_token

    # temp = {
    #     'token': credentials.token,
    #     'refresh_token': credentials.refresh_token,
    #     'id_token':credentials.id_token,
    #     'token_uri': credentials.token_uri,
    #     'client_id': credentials.client_id,
    #     'client_secret': credentials.client_secret,
    #     'scopes': credentials.scopes
    # }
    # print(temp)
    # if not User_credentials.objects.get(id_token = credentials.id_token):
        # s = User_credentials(
        #     token = credentials.token,
        #     refresh_token =  credentials.refresh_token,
        #     id_token = credentials.id_token,
        #     token_uri = credentials.token_uri,
        #     client_id = credentials.client_id,
        #     client_secret = credentials.client_secret,
        #     scopes = credentials.scopes
        # )
        # s.save()
    s = User_credentials(
        token = credentials.token,
        refresh_token =  credentials.refresh_token,
        id_token = credentials.id_token,
        token_uri = credentials.token_uri,
        client_id = credentials.client_id,
        client_secret = credentials.client_secret,
        scopes = credentials.scopes
    )
    s.save()

    
    return HttpResponse("<script>alert('success');location.href = 'http://127.0.0.1:8000/channels/'</script>")

def channels(request):
    api_service_name = "youtube"
    api_version = "v3"
    new_id_token = request.session['id_token']
    base_id_token = User_credentials.objects.get(id_token = new_id_token)
    print("BASE TOKEN ===>")
    print(base_id_token.id_token)
    print("NEW TOKEN ===>")
    print(new_id_token)
    if new_id_token == base_id_token.id_token:
        cred = User_credentials.objects.get(id_token = new_id_token)
        print("it is a mach")
        print(cred)
        temp = {
            'token': cred.token,
            'refresh_token': cred.refresh_token,
            'id_token':cred.id_token,
            'token_uri': cred.token_uri,
            'client_id': cred.client_id,
            'client_secret': cred.client_secret,
            'scopes': cred.scopes
            }
        print("FUNCKING TEMP ===>")
        print(temp)
        credentials = google.oauth2.credentials.Credentials(**temp)
        print("NEW CREDENTIALS ===>")
        print(credentials)
    else: print("not mach")
    

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, credentials=credentials)
    request = youtube.channels().list(
        part="snippet,contentDetails,statistics",
        mine=True
    )
    r = request.execute()

    print(r)

    # return render(request)
    return HttpResponse("ok")
  