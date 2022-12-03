from flask import Flask,Response
from flask_pymongo import PyMongo
from flask_restful import Resource, Api
from flask_cors import CORS
from bson  import json_util
from bson.objectid import ObjectId
import pandas as pd



app = Flask(__name__)
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
    data = mongo.db.rating.find().limit(10)
    response = json_util.dumps(data)
    return response

@app.route('/rating/<id>', methods=['GET'])
def get_user(id):
    datawithuser = mongo.db.rating.find_one({'_id':ObjectId(id)})
    response = json_util.dumps(datawithuser)
    return response

@app.route('/predict', methods=['GET'])
def getRank():
    top = mongo.db.comment.find()
    response = json_util.dumps(top)
    return response

if __name__ == "__main__":
    app.run(debug=True)