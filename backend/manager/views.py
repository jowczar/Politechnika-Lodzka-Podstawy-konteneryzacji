import json
import os
from dotenv import load_dotenv

from django.db import transaction
import google.auth.transport.requests
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
from django.conf import settings
from django.db import models
from django.http import JsonResponse
from django.shortcuts import (HttpResponse, HttpResponseRedirect, redirect, render)
from django.urls import reverse
import pymongo
# MODELS
# from manager.models import User_credentials, Video_list, Subscriptions_list, Author, Entry



load_dotenv("../youtube_manager/.env")

# DB HANDLER
connect_string = os.getenv('DB_CONNECT')
my_client = pymongo.MongoClient(connect_string)
dbname = my_client['mongo-db']


User_credentials = dbname["User_credentials"]



scopes = ["https://www.googleapis.com/auth/youtube.readonly"]
REDIRECT_URI = os.getenv('REDIRECT_URI')
client_secrets_file = json.loads(os.getenv('CLIENT_SECRET'))

# Create your views here.
def index(request):
    return render(request, 'manager/index.html')

def login(request):
 # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    os.environ["OAUTHLIB_RELAX_TOKEN_SCOPE"] = "0"
    # Get credentials and create an API client
    flow = google_auth_oauthlib.flow.Flow.from_client_config(
        client_config = client_secrets_file, scopes = scopes)
    # flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
    #     client_secrets_file = client_secrets_file, scopes = scopes)

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


    flow = google_auth_oauthlib.flow.Flow.from_client_config(
        client_config = client_secrets_file, scopes = scopes)
    flow.redirect_uri = REDIRECT_URI

    #get the full URL that we are on, including all the "?param1=token&param2=key" parameters that google has sent us.
    authorization_response = request.build_absolute_uri()
    #now turn those parameters into a token.
    flow.fetch_token(authorization_response=authorization_response)

    credentials = flow.credentials
    # print("CREDENTIALS HERE =====>")
    # print(credentials)
    request.session['id_token'] = credentials.id_token

    credentials = {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'id_token':credentials.id_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }
    User_credentials.insert(credentials)
    User_credentials.find({token_uri})
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

    
    return HttpResponse("<script>alert('success');location.href = 'http://127.0.0.1:8000/channels/'</script>")

def channels(request):
    api_service_name = "youtube"
    api_version = "v3"
    new_id_token = request.session['id_token']
    print("new token >>>>>", new_id_token)

    credentials = User_credentials.find()
    

    # print("BASE TOKEN ===>")
    # print(base_id_token.id_token)
    # print("NEW TOKEN ===>")
    # print(new_id_token)

    if User_credentials.find({token: new_id_token}):
        for cred in credential:
            temp = {
                'token': cred['token'],
                'refresh_token': cred['refresh_token'],
                'id_token':cred['id_token'],
                'token_uri': cred['token_uri'],
                'client_id': cred['client_id'],
                'client_secret': cred['client_secret'],
                'scopes': cred['scopes']
                }
        # print("FUNCKING TEMP ===>")
        # print(temp)
        credentials = google.oauth2.credentials.Credentials(**temp)
        # print("NEW CREDENTIALS ===>")
        # print(credentials)
    else: print("not mach")
    

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, credentials=credentials)

    ##### get list of subscriptions
    sub = []
    request = youtube.subscriptions().list(
        part="snippet,contentDetails",
        mine=True,
    )
    r = request.execute()

    for i in range(len(r['items'])):
        # print("RES===> ", r['items'][i])
        channel_address = r['items'][i]['snippet']['resourceId']['channelId']
        subscriptions = {
            'channel_name' : r['items'][i]['snippet']['title'],
            'channel_address' : r['items'][i]['snippet']['resourceId']['channelId'],
            'channel_avatar' : r['items'][i]['snippet']['thumbnails']['default']
            } 
        sub.append(subscriptions)

    next_page = r.get('nextPageToken')
    more_pages = True

    while more_pages:
        if next_page is None:
            more_pages = False
        else:
            request = youtube.subscriptions().list(
                part="snippet,contentDetails",
                mine=True,
                pageToken=r['nextPageToken']
            )
            r = request.execute()

            for i in range(len(r['items'])):
                subscriptions = {
                    'channel_name' : r['items'][i]['snippet']['title'],
                    'channel_address' : r['items'][i]['snippet']['resourceId']['channelId'],
                    'channel_avatar' : r['items'][i]['snippet']['thumbnails']['default']
                    }
                # print("RES===> ", r['items'][i])
                sub.append(subscriptions)

            next_page = r.get('nextPageToken')

    # print("SUBS XXXXXXXXXXX",sub)
    print(len(sub))
    # channel_name = r['items'][0]['snippet']['title']
    # channel_address = r['items'][0]['snippet']['resourceId']['channelId']
    # channel_avatar = r['items'][0]['snippet']['thumbnails']['default']
    # print("______________channel_name,channel_address,channel_avatar")
    # print(channel_name,channel_address,channel_avatar)
    videos_list = []
    video_address = []
    videos_all = []
    for i in range(len(sub)):
        ###### get list of videos from channel 
        request = youtube.channels().list(
            part="snippet,contentDetails,statistics",
            id=sub[i]['channel_address']
        )
        r = request.execute()
        uploads = r['items'][0]['contentDetails']['relatedPlaylists']['uploads']
        ###### get videos
        request = youtube.playlistItems().list(
            part="snippet, contentDetails",
            playlistId=uploads
        )
        r = request.execute()
        print(len(r['items']))
        # download 5 videos
        for j in range(len(r['items'])):
            video_address.append(r['items'][j]['snippet']['resourceId']['videoId'])
        print(video_address)
        # download info from that 5 videos
        request = youtube.videos().list(
            part="snippet,contentDetails",
            id=video_address
        )
        rd = request.execute()
        temp_channel_name = {'channel_name' : sub[i]['channel_name']}
        videos_list.clear()
        for k in range(len(video_address)):
            temp = {
                # 'channel_name' : sub[i]['channel_name'],
                'video' : {
                    'video_address' : r['items'][k]['snippet']['resourceId']['videoId'],
                    'video_thumbnails' : r['items'][k]['snippet']['thumbnails']['default'],
                    'video_title' : r['items'][k]['snippet']['title'],
                    'video_duration' : rd['items'][k]['contentDetails']['duration']
                }
            }
            videos_list.append(temp)
        temp_channel_name["videos"] = videos_list
        videos_all.append(temp_channel_name)
        video_address.clear()
     
    # print("videos all: ", videos_all)

    ##### Save data into database
    for video in videos_all:
        for vid_data in video['videos']:
            s = Video_list(
                channel_name = video['channel_name'],
                video_address = vid_data['video']['video_address'],
                video_thumbnails = vid_data['video']['video_thumbnails'],
                video_title = vid_data['video']['video_title'],
                video_duration = vid_data['video']['video_duration'],
                video_hide = False,
                video_watch = False
            )
            # print(vid_data['video']['video_address'])
            s.save()
        
    ###### get list of videos from channel 
    # request = youtube.channels().list(
    #     part="snippet,contentDetails,statistics",
    #     id=channel_address
    # )
    # r = request.execute()
    # uploads = r['items'][0]['contentDetails']['relatedPlaylists']['uploads']

    ###### get videos
    # request = youtube.playlistItems().list(
    #     part="snippet, contentDetails",
    #     playlistId=uploads
    # )
    # r = request.execute()
    # video_address = r['items'][0]['snippet']['resourceId']['videoId']
    # video_thumbnails = r['items'][0]['snippet']['thumbnails']['default']
    # video_title = r['items'][0]['snippet']['title']

    ###### get video duration
    # request = youtube.videos().list(
    #     part="snippet,contentDetails",
    #     id=video_address
    # )
    # r = request.execute()
    # video_duration = r['items'][0]['contentDetails']['duration']
    # print("______________video_address, video_thumbnails, video_title, video_duration")
    # print(video_address, video_thumbnails, video_title, video_duration)
    """
    ()czego mi trzeba:
    nazwa kanału snippet.title
    link do kanału snippet.resourceId.channelId
    awatar do kanału snippet.thumbnails.(default)
    
    ()ostatnio dodane filmy
    link do filmu snippet.resourceId.videoId 
    miniaturka snippet.thumbnails.(default) medium high
    tytuł snippet.title
    czas trwania contentDetails.endAt
    nazwa kanału
    awatar do kanału 

    channels list
    id => channel id
    z tego biore contentDetails.relatedPlaylists.uploads czyli liste wideo
        request = youtube.channels().list(
        part="snippet,contentDetails,statistics",
        id="UC_7PqixGIdE-jjoHKMPYpGA"
    )
    playlist id = uploads
    playlistitems
        request = youtube.playlistItems().list(
        part="snippet",
        playlistId="UU_7PqixGIdE-jjoHKMPYpGA"
    )

    czy obejrzane zrobić do tego model
    """
    # return render(request)
    # return HttpResponse("ok")
    return JsonResponse(videos_all, safe=False)

def get_all_videos_from_channel(request):
    # if request.method == 'GET':
    names = []
    video_list = Video_list.objects.all()
    for video in video_list:
        names.append(video.channel_name)

    # return JsonResponse(data, safe=False)
    # return render(request, {"data": data})
    return HttpResponse("kej")

def lists(request):
    lists = [
        {
            'id': 1,
            'name': 'Spoko cardio',
            'link': 'https://www.youtube.com/playlist?list=RDCLAK5uy_lBNUteBRencHzKelu5iDHwLF6mYqjL-JU&playnext=1&index=1',
            'videos': [
            {
                'link': 'https://youtu.be/VaZU37y2T_Q',
                'thumbnail': 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                'title': 'Dlaczego liście tak robią?', 
                'duration': '18:33', 
                'uploadTime': '2011-10-05T14:48:00.000Z', 
                'channelName': 'Uwaga! Naukowy bełkot', 
                'channelAvatar': 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                'isWatched': False, 
                'isHidden': False 
            },
            {
                'link': 'https://youtu.be/VaZU37y2T_Q',
                'thumbnail': 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                'title': 'Dlaczego liście tak robią?', 
                'duration': '18:33', 
                'uploadTime': '2011-10-05T14:48:00.000Z', 
                'channelName': 'Uwaga! Naukowy bełkot', 
                'channelAvatar': 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                'isWatched': False, 
                'isHidden': False 
            },
            {
                'link': 'https://youtu.be/VaZU37y2T_Q',
                'thumbnail': 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                'title': 'Dlaczego liście tak robią?', 
                'duration': '18:33', 
                'uploadTime': '2011-10-05T14:48:00.000Z', 
                'channelName': 'Uwaga! Naukowy bełkot', 
                'channelAvatar': 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                'isWatched': False, 
                'isHidden': False 
            },
            {
                'link': 'https://youtu.be/VaZU37y2T_Q',
                'thumbnail': 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                'title': 'Dlaczego liście tak robią?', 
                'duration': '18:33', 
                'uploadTime': '2011-10-05T14:48:00.000Z', 
                'channelName': 'Uwaga! Naukowy bełkot', 
                'channelAvatar': 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                'isWatched': False, 
                'isHidden': False 
            },
            {
                'link': 'https://youtu.be/VaZU37y2T_Q',
                'thumbnail': 'https://i.ytimg.com/vi/VaZU37y2T_Q/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA7rqrDHuHKdpNda2RHn2k2pCAQUw', 
                'title': 'Dlaczego liście tak robią?', 
                'duration': '18:33', 
                'uploadTime': '2011-10-05T14:48:00.000Z', 
                'channelName': 'Uwaga! Naukowy bełkot', 
                'channelAvatar': 'https://yt3.ggpht.com/ArVAdn46mUBoDsd8PV_V4Bpjr8iGdEIbLChyLs2h3949LFhogNJUt9qcSTDDiVk1jHozFaElKtA=s176-c-k-c0x00ffffff-no-rj', 
                'isWatched': False, 
                'isHidden': False 
            }
        ]
    }]
    return JsonResponse(lists, safe=False)

    # credentials = dbname.User_credentials.find({'token_uri': 'asd' })
    # for cred in credentials:
    #     print()
    # cred['token_uri']
    # link = "https://oauth2.googleapis.com/token"
    # query = {}
    # if User_credentials.find():
    #     print("znalazło")
    # else:
    #     print("nope")

    # # for t in x:
    # #     print(t['token'])
    # return HttpResponse("lists ok")

def groups(request):

    return HttpResponse("groups ok")
  
def healthcheck(request):
    return JsonResponse({ 'healthcheck': 'ok' })