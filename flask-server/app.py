from flask import Flask,Response,request,jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson  import json_util
from bson.objectid import ObjectId
import pandas as pd
from werkzeug.security import generate_password_hash,check_password_hash



app = Flask(__name__)
app.secret_key = "secretkey"
app.config["MONGO_URI"] = "mongodb://localhost:27017/data"

mongo = PyMongo(app)

### model

# def weighted_rating(x, m=m, C=C):
#     v = x['count']
#     R = x['mean']
#     return (v/(v+m) * R) + (m/(m+v) * C)

def load():
    db = mongo['data']
    col = db['rating']
    z = list(col.find({},{'_id':0,'User':0}))
    df = pd.DataFrame(z)
    
    C = df.groupby(["Store"])["Rating"].count().reset_index(name="count") ## quantile
    av = df.groupby('Store')['Rating'].mean().reset_index(name="mean") ## C
    df2= C.merge(av,on='Store')
    C = df2['mean'].mean()
    m = df2['count'].quantile(0.5)


### weighted rating (WR) = (v ÷ (v+m)) × R + (m ÷ (v+m)) × C

CORS(app)


@app.route('/rating', methods=['GET'])
def get_data():
    data = mongo.db.rating.find().limit(20)
    response = json_util.dumps(data)
    return response

@app.route('/rating/<id>', methods=['GET'])
def get_user(id):
    datawithuser = mongo.db.rating.find_one({'_id':ObjectId(id)})
    response = json_util.dumps(datawithuser)
    return response

@app.route('/predict', methods=['GET'])
def getRank():
    top = mongo.db.comment.find().limit(10)
    response = json_util.dumps(top)
    return response

@app.route('/test', methods=['GET'])
def gettest():
    if request.method == 'GET':
        top = mongo.db.comment.find({}, {'_id':0,'count':0,'mean':0}).limit(10)
        response = json_util.dumps(top)
        re = json_util.loads(response)
        d ={'data':re}
        return d

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status':404,
        'message':'Not Found' + request.url
    }
    resp = jsonify(message)
 
    resp.status_code = 404
 
    return resp


@app.route('/add',methods=['POST'])
def add_user():
    _json = request.json
    # _name = _json['name']
    # _status = _json['status']
    _info = _json['info']
    _fav = _json['fav']
 
    if _info and  _fav and request.method == "POST":
        id = mongo.db.userpreference.insert_one({'info':_info,'fav':_fav})
        resp = jsonify("User Added successfully")

        resp.status_code = 200
 
        return resp
 
    else:
 
        return not_found()

@app.route('/store/<type1>',methods=['GET'])
def store(type1):
    if request.method == 'GET':
        x = type1
        ge = mongo.db.infostore.find({'type': {'$all':[x]}},{'Name':1,'_id':0})
        response = json_util.dumps(ge)
        return Response(response,mimetype='application/json')
    

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)


