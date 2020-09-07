# from flask import Flask, request
# from flask_restful import Resource, Api
# from sqlalchemy import create_engine
# from json import dumps
# from flask.ext.jsonpify import jsonify

# app = Flask(__name__)
# api = Api(app)


# import requests
# import json
# import urllib3
# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# auth_url = "https://www.strava.com/oauth/token"

# payload = {
#     'client_id': "46746",
#     'client_secret': '8bad82efd8778153f3ef2117460519eba779c077',
#     'code': '02fc4941469165b7b6ffb8aba6ff11fedb5a695f',
#     'grant_type': "authorization_code",
#     'f': 'json'
# }

# #print("Requesting Token...\n")
# res = requests.post(auth_url, data=payload, verify=False)
# #print(res.json)
# access_token = res.json()['access_token']
# #print("Access Token = {}\n".format(access_token))
# #print(access_token)

# activite_url = 'https://www.strava.com/api/v3/athlete/activities'

# payload2 = {
#     'access_token' : access_token,
#     'per_page': '20'
# }

# #print("Requesting Activites...\n")
# res = requests.get(activite_url, data=payload2, verify=False)

# print(res.json())
# #json_object = json.loads(res.json())

# #json_formattes_str = json.dumps(json_object,indent=2)
# #print(json_formattes_str)

from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return jsonify({'text':'Hello World!'})

if __name__ == '__main__':
     app.run(port=5002)