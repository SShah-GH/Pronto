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
    call_success = False
    curr_key = 0

    while call_success == False:
        apiKeysList = ["f614de16d9154bbab2fefbfb24771ac9", "1c1a415df0f04b0199236dec9d3baf56", "0b9e04a358b84f0f894b7d20bad06a45", "d7fa03ba28f94eba97ffb5276cca060a", "716c0526d1fc42008fdfd127fc0d6f9e", "a9e142b8b32a460497c02018511fbb65", "3670b6fd717a4ad0a49ba042649edef7", "196537e4a5814693b334cac3e4723a38", "39810cc78e384d3a9c416070fdeddc64"]
        apiKey = apiKeysList[curr_key]
        print(curr_key)
        print(apiKey)

        
        query_params = {
        "sortBy": "top",
        "apiKey": apiKey,
        "category"  : cat
        }
        main_url = " https://newsapi.org/v2/top-headlines?country=us&category=" + cat + "&apiKey=" + apiKey

        res = requests.get(main_url, params=query_params)
        top_articles = res.json()
        # fetching data in json format
        try:
          article = top_articles["articles"]  
        except KeyError as e:
            call_success = False
            curr_key = curr_key + 1
            continue
        call_success = True

    results = []

    for ar in article:
        results.append(ar)

    return results

def listFill(category_list, top_results, used_articles):

    cat_num = len(category_list)
    if cat_num == 0:
        category_list = ['general']

    article_list = []
    for cat in category_list:
        temp_list = RetreiveNews(cat)
        for ar in temp_list:
            if ar not in top_results and ar not in used_articles:
                article_list.append(ar)
            if len(article_list) != 0 and len(article_list)%5 == 0:
                break
 
    curr_cat = 0
    while(len(top_results) < 5): #if list is not full we will pull articles from a random category
        if curr_cat >= len(article_list):
            curr_cat = 0
        ar = article_list[curr_cat]
        if ar not in top_results and ar not in used_articles:
            top_results.append(ar)
            curr_cat = int(curr_cat/5 + 5)
        else:
            curr_cat = curr_cat + 1


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
    used_results = []
    top_results = listFill(category_list, top_results, used_results)

    return top_results


def NewsHeadlines():
    print('Starting NewsHeadlines')

    cat_list = ['sports']
    
    top_results = getTop5(cat_list)
 
    # empty list which will 
    # contain all trending news
    print('Filtering Results')
    filtered_results = []
    used_articles = []

    
    article_num = 0
    #iterate through top articles
    while(len(filtered_results) < 5):
        article_num = 0
        for ar in top_results:
            isUnique = True

            for i in range(len(filtered_results)):
                #check if article is unique
                if((fuzz.ratio(ar["title"], filtered_results[i]["title"]) > 40)):  
                        isUnique = False
                        break

            #If article is not unique replace it
            if(not isUnique):
                used_articles.append(top_results.pop(article_num))
                top_results = listFill(cat_list, top_results, used_articles)
                article_num = article_num + 1 
            #If article is unique add it to the list
            else:
                filtered_results.append(ar)
                used_articles.append(ar)
                if(len(filtered_results) == 5):
                    break
                article_num = article_num + 1 

    

    result = json.dumps(filtered_results)
    #result = flask.jsonify({'Articles' : filtered_results})
    #result.headers.add('Access-Control-Allow-Origin', '*')

    return result


def main():
    result = NewsHeadlines()
    print(result)

if __name__ == "__main__":
    main()