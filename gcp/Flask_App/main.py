from flask import Flask, render_template
from fuzzywuzzy import fuzz 
from fuzzywuzzy import process 

# importing requests package
import requests

app = Flask(__name__)

def RetreiveNews(cat):
    # BBC news api
    # following query parameters are used
    # source, sortBy and apiKey
    query_params = {
      "sortBy": "top",
      "apiKey": "39810cc78e384d3a9c416070fdeddc64",
      "category"  : cat
    }
    main_url = " https://newsapi.org/v2/top-headlines?country=us&category=" + cat + "&apiKey=39810cc78e384d3a9c416070fdeddc64"
 
    # fetching data in json format
    res = requests.get(main_url, params=query_params)
    return res


def listFill(category_list, top_results):
    while(len(top_results) < 5): #if list is not fall we will pull articles from a random category
        rand_cat = random.choice(category_list)
        for ar in RetreiveNews(rand_cat):
            if ar not in top_results:
                top_results.append(ar)
                break

    return top_results


def getTop5(category_list):
    top_results = [] #this list will store our top 5 articles
    general_article_set = set()
    for ar in RetreiveNews('general'):
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


@app.route("/", methods=['POST'])
def NewsHeadlines():
    # Get data from url
    categories = request.args.get('categories', default = 'none', type = string)
    cat_list = categories.split()

    top_results = getTop5(cat_list)
 
    # empty list which will 
    # contain all trending news
    results = []
    
    article_num = 0
    #iterate through top articles
    for ar in top_results:
        isUnique = True
        for i in range(len(results)):
            if(fuzz.ratio(ar, results[i]) > 40):  #don't append article if too similar to any articles already found
                    isUnique = False
                    break

        if(not isUnique):
            top_results.pop(article_num)
            top_results = listFill(cat_list, top_results)
        
        results.append(ar)

        article_num = article_num + 1     
    
    # Convert to json and return
    news_results = top_results.json()

    return news_results
























  


       



