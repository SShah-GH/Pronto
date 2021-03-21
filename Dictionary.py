from fuzzywuzzy import fuzz 
from fuzzywuzzy import process 

# importing requests package
import requests     
 
def NewsFromBBC(cat):
    if cat != 'entertainment' and cat != 'general' and cat != 'health' and cat != 'science' and cat != 'sports' and cat != 'technology' and cat != 'business':
        print('please enter a correct category you can choose from : entertainment, general, health, science, sports, technology, business')
        return;
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
    open_bbc_page = res.json()
 
    # getting all articles in a string article
    article = open_bbc_page["articles"]
 
    # empty list which will 
    # contain all trending news
    results = []
    isUnique = True
     
    #iterate through top articles
    for ar in article:
        for i in range(len(results)):
            if(fuzz.ratio(ar, results[i]) > 40):  #don't append article if too similar to any articles already found
                    isUnique = False
                    break

        if(isUnique):
            results.append(ar["title"])
         
    for i in range(len(results)):
         
        # printing all trending news
        print(i + 1, results[i])
               
 
# Driver Code
if __name__ == '__main__':
    print('Enter category for filtering news articles. You can choose from entertainment, general, health, science, sports, technology, business')
    x = input()
    # function call
    NewsFromBBC(x) 