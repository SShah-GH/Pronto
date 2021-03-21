from fuzzywuzzy import fuzz 
from fuzzywuzzy import process 

# importing requests package
import requests     
 
def NewsFromBBC():
     
    # BBC news api
    # following query parameters are used
    # source, sortBy and apiKey
    query_params = {
      "sortBy": "top",
      "apiKey": "4dbc17e007ab436fb66416009dfb59a8"
    }
    main_url = " https://newsapi.org/v2/top-headlines?country=us&apiKey=4dbc17e007ab436fb66416009dfb59a8"
 
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
     
    # function call
    NewsFromBBC() 