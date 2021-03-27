import flask
from flask import Flask, render_template
from flask_cors import CORS
from fuzzywuzzy import fuzz 
from fuzzywuzzy import process 
import random
import json
#import helpers.py

# importing requests package
import requests

app = Flask(__name__)
CORS(app)

def RetreiveNews(cat):
    # BBC news api
    # following query parameters are used
    # source, sortBy and apiKey
    apiKeysList = ["d7fa03ba28f94eba97ffb5276cca060a", "716c0526d1fc42008fdfd127fc0d6f9e", "a9e142b8b32a460497c02018511fbb65", "3670b6fd717a4ad0a49ba042649edef7", "122987b7c1bc4221897f5e361735d413", "196537e4a5814693b334cac3e4723a38", "39810cc78e384d3a9c416070fdeddc64"]
    apiKey = random.choice(apiKeysList)

    query_params = {
      "sortBy": "top",
      "apiKey": apiKey,
      "category"  : cat
    }
    main_url = " https://newsapi.org/v2/top-headlines?country=us&category=" + cat + "&apiKey=196537e4a5814693b334cac3e4723a38"
 
    # fetching data in json format
    res = requests.get(main_url, params=query_params)
    top_articles = res.json()
    article = top_articles["articles"]

    results = []

    for ar in article:
        results.append(ar)

    return results


def listFill(category_list, top_results):

    if len(category_list) == 0:
        rand_cat = 'general'
    else:
        rand_cat = random.choice(category_list)

    while(len(top_results) < 5): #if list is not full we will pull articles from a random category    
        for ar in RetreiveNews(rand_cat):
            if ar not in top_results:
                top_results.append(ar)
                break

    return top_results


def getTop5(category_list):
    top_results = [] #this list will store our top 5 articles
    general_article_set = []
    print_first = True
    for ar in RetreiveNews('general'):  #TODO FIND OUT WHAT THE RESPONSE OBJECT RETURNS
       general_article_set.append(ar) #creating a set of general articles, ranked only by popularity, not category
    if len(category_list) == 0: # if we have no categories selected, we just generate our list using our general set
        for i in range(5):
            elem = general_article_set.pop(i) #getting most popular aritcles regardless of catgories from the top of the set
            top_results.append(elem)  
        return top_results

    for category in category_list: #if list isnt empty, loop through categories
        temp_list = []
        templist = list(RetreiveNews(category)) #creating list of articles ranked by popularity for each category
        for i in range(20):
            if templist[i] in general_article_set: # if the first article is also in the general article_set, we add it
                top_results.append(templist[i])
                if (len(top_results) == 5): #if our list is already full, terminate function
                    return top_results


    #Fill in extra categories if still missing
    top_results = listFill(category_list, top_results)

    return top_results


@app.route("/", methods=['GET'])
def NewsHeadlines(request):
    print('Starting NewsHeadlines')

    # Get data from url
    categories = request.args.get('categories', default = '')
    cat_list = categories.split()

    
    top_results = getTop5(cat_list)
 
    # empty list which will 
    # contain all trending news
    filtered_results = []
    
    article_num = 0
    #iterate through top articles
    while(len(filtered_results) < 5):
        for ar in top_results:
            isUnique = True
            for i in range(len(filtered_results)):
                #check if article is unique
                if(fuzz.ratio(ar["title"], filtered_results[i]["title"]) > 40):  
                        isUnique = False
                        break

            #If article is not unique replace it
            if(not isUnique):
                top_results.pop(article_num)
                top_results = listFill(cat_list, top_results)
            #If article is unique add it to the list
            else:
                filtered_results.append(ar)
                if(len(filtered_results) == 5):
                    break
                article_num = article_num + 1 

    

    #result = json.dumps(filtered_results[0])
    result = flask.jsonify({'Articles' : filtered_results})
    result.headers.add('Access-Control-Allow-Origin', '*')


    return result























  


       



