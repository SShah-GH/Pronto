
from pip._vendor import requests
query_params = {
      "sortBy": "top",
      "apiKey": "333d5358ed1845caa58f17524b9b8010"
}
main_url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=333d5358ed1845caa58f17524b9b8010"
 
    # fetching data in json format
res = requests.get(main_url, params=query_params)
open_bbc_page = res.json()
 
    # getting all articles in a string article
article = open_bbc_page["articles"]
 
    # empty list which will 
    # contain all trending news
results = []
     
for ar in article:
    results.append(ar["title"])
         
for i in range(len(results)):
         
        # printing all trending news
    print(i + 1, results[i])