from flask import Flask, render_template
from fuzzywuzzy import fuzz 
from fuzzywuzzy import process 

# importing requests package
import requests

app = Flask(__name__)

def RetreiveNews(query_params)
    #retreives category from json
    category = query_params['category']

    main_url = " https://newsapi.org/v2/top-headlines?country=us&category=" + category + "&apiKey=39810cc78e384d3a9c416070fdeddc64"
 
    # fetching array of articles
    res = requests.get(main_url, params=query_params)
    
    return res

@app.route("/", methods=['POST'])
def NewsHeadlines():
    # Get data from input json
    query_params = request.form.to_dict(flat=False)
    res = RetreiveNews(query_params)

    
    #CALL JEETHS HELPER FUNCTION TO FILTER FOR ALL THE ARTICLES THAT WE NEED IN A SET


    #CHANGE THIS TO GRAB ARTICLES FROM JEETH'S SET
    # getting all articles in a string article
    article = news_page["articles"]
 
    # empty list which will 
    # contain all trending news
    isUnique = True
    
    article_num = 0
    #iterate through top articles
    for ar in article:
        for i in range(len(results)):
            if(fuzz.ratio(ar, results[i]) > 40):  #don't append article if too similar to any articles already found
                    isUnique = False
                    break

        if(isUnique):
            res.pop(article_num)
            #res.append(Jeeth's Article Selector Function())  

        article_num = article_num + 1     
 
    news_results = res.json()

    return news_results

'''
@app.route("/docs")
def docs():
    return render_template("index.html", title="docs page")

@app.route("/about")
def about():
    return render_template("index.html", title="about page")
'''
if __name__ == "__main__":
    app.run(debug=True)