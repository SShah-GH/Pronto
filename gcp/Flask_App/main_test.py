from flask import Flask, render_template
from fuzzywuzzy import fuzz 
from fuzzywuzzy import process 
import random
import json
#import helpers.py

# importing requests package
import requests

app = Flask(__name__)

def RetreiveNews(cat):
    # BBC news api
    # following query parameters are used
    # source, sortBy and apiKey
    query_params = {
      "sortBy": "top",
      "apiKey": "1c1a415df0f04b0199236dec9d3baf56",
      "category"  : cat
    }
    main_url = " https://newsapi.org/v2/top-headlines?country=us&category=" + cat + "&apiKey=1c1a415df0f04b0199236dec9d3baf56"
 
    # fetching data in json format
    res = requests.get(main_url, params=query_params)
    print(res)
    return res


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
    general_article_set = set()
    print_first = True
    for ar in RetreiveNews('general'):  #TODO FIND OUT WHAT THE RESPONSE OBJECT RETURNS
       if print_first:
        print(ar)
        print_first = False
       ar = str(ar, 'utf-8')
       general_article_set.add(ar) #creating a set of general articles, ranked only by popularity, not category
    if len(category_list) == 0: # if we have no categories selected, we just generate our list using our general set
        for i in range(5):
            elem = general_article_set.pop() #getting most popular aritcles regardless of catgories from the top of the set
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


def main():

    cat_list = []
    
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
                if(fuzz.ratio(ar, filtered_results[i]) > 40):  
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

    
    Dict_list = []
    for ar in filtered_results:
        ar = json.loads(ar)
        Dict_list.append(ar)

    Results_JSON = json.dumps(Dict_list)

    print(Results_JSON)

        




    
if __name__ == "__main__":
    main()
