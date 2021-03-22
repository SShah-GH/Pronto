from fuzzywuzzy import fuzz 
from fuzzywuzzy import process 

# importing requests package
import requests     
import random
 
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
    return results;
  

def getTop5(category_list):
    top_results = [] #this list will store our top 5 articles
    general_article_set = set()
    for ar in NewsFromBBC('general'):
       general_article_set.add(ar) #creating a set of general articles, ranked only by popularity, not category
    if len(category_list) == 0: # if we have no categories selected, we just generate our list using our general set
        for i in range(5):
            elem = general_article_set.pop() #getting most popular aritcles regardless of catgories from the top of the set
            top_results.append(elem)  
            for top_result in top_results:
                print(top_result)
            return
    for category in category_list: #if list isnt empty, loop through categories
        temp_list = []
        templist = list(NewsFromBBC(category)) #creating list of articles ranked by popularity for each category
        for i in range(20):
            if templist[i] in general_article_set: # if the first article is also in the general article_set, we add it
                top_results.append(templist[i])
                if (len(top_results) == 5): #if our list is already full, terminate function
                    for top_result in top_results:
                        print(top_result)
                    return

    while(len(top_results) < 5): #if list is not fall we will pull articles from a random category
        rand_cat = random.choice(category_list)
        for ar in NewsFromBBC(rand_cat):
            if ar not in top_results:
                top_results.append(ar)
                break;


    for i in range(len(top_results)): #printing articles
        print(i + 1, top_results[i])
       



# Driver Code
if __name__ == '__main__':
    print('Enter up to 3 categories for filtering news articles. You can choose from entertainment, general, health, science, sports, technology, business')
    cat_list = [] #list used as container for all the input categories
    x = input()
    if x != "":
        cat_list.append(x)
    y = input()
    if y != x: #is a unique category input
        if y != "":
            cat_list.append(y)
    z = input()
    if z != x and z != y: #is a unique category input
         if z != "":
             cat_list.append(z)
    getTop5(cat_list)