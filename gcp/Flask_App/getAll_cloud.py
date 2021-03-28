
import flask
from flask import Flask, render_template
from flask_cors import CORS
from fuzzywuzzy import fuzz 
from fuzzywuzzy import process 
from google.cloud import language_v1
from boilerpy3 import extractors
import random
import json
#import helpers.py

# importing requests package
import requests

app = Flask(__name__)
CORS(app)

def getContent(url):
    

    extractor = extractors.ArticleExtractor()

    # From a URL
    resp = requests.get(url)
    if resp.ok:
        content = extractor.get_content_from_url(url)
    else:
        content = 'error'
    
    if content == '':
        content = 'error'

    return content

def getLength(content):

    length = len(content)
    time = length/1100.0

    minutes = int(round(time, 1))

    return str(minutes)

def Summarize(content):
    r = requests.post(
        "https://api.deepai.org/api/summarization",
        data={
            'text': content,
        },
        headers={'api-key': '8478ec51-d77b-4cc5-ab0a-9fef54374644'}
    )
    return r.json()
  
def analyze_sentiment(content):

    client = language_v1.LanguageServiceClient()

    # Available types: PLAIN_TEXT, HTML
    type_ = language_v1.Document.Type.PLAIN_TEXT

    # Optional. If not specified, the language is automatically detected.
    # For list of supported languages:
    # https://cloud.google.com/natural-language/docs/languages
    language = "en"
    document = {"content": content, "type_": type_, "language": language}

    # Available values: NONE, UTF8, UTF16, UTF32
    encoding_type = language_v1.EncodingType.UTF8

    response = client.analyze_sentiment(request = {'document': document, 'encoding_type': encoding_type})

    sent = dict()

    # Get sentiment for all sentences in the document
    #for sentence in response.sentences:
    #    sent[sentence.text.content] = sentence.sentiment.score

    #json_obj = json.dumps(sent)
    #return json_obj

    # Get overall sentiment of the input document
    rounded_response = round((5 * response.document_sentiment.score),2)
    return str(rounded_response)
    #print(
    #    u"Document sentiment magnitude: {}".format(
    #       response.document_sentiment.magnitude
    #    )
    #)

def RetreiveNews(cat):
    # BBC news api
    # following query parameters are used
    # source, sortBy and apiKey
    call_success = False

    while call_success == False:
        apiKeysList = ["d7fa03ba28f94eba97ffb5276cca060a", "716c0526d1fc42008fdfd127fc0d6f9e", "a9e142b8b32a460497c02018511fbb65", "3670b6fd717a4ad0a49ba042649edef7", "196537e4a5814693b334cac3e4723a38", "39810cc78e384d3a9c416070fdeddc64"]
        apiKey = random.choice(apiKeysList)
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
            continue
        call_success = True

    results = []

    for ar in article:
        results.append(ar)

    return results


def listFill(category_list, top_results, used_articles):

    if len(category_list) == 0:
        rand_cat = 'general'
    else:
        rand_cat = random.choice(category_list)

    while(len(top_results) < 5): #if list is not full we will pull articles from a random category    
        for ar in RetreiveNews(rand_cat):
            if ar not in top_results and ar not in used_articles:
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
    used_articles = []
    top_results = listFill(category_list, top_results, used_articles)

    return top_results




@app.route("/", methods=['GET'])
def NewsHeadlines(request):
    print('Starting NewsHeadlines')

    # Get data from url
    categories = request.args.get('categories', default = '')
    cat_list = categories.split('-')
    
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
            content = getContent(ar['url'])

            if content == 'error':
                used_articles.append(top_results.pop(article_num))
                top_results = listFill(cat_list, top_results, used_articles)
                article_num = article_num + 1 
                break

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

    print('Filtered Results')
    for ar in filtered_results:
        print(ar['url'])
        content = getContent(ar['url'])
        summary = Summarize(content)
        #sentiment = analyze_sentiment(content)
        read_time = getLength(content)

        ar['summary'] = summary['output']
        #ar['sentiment'] = sentiment
        ar['read_time'] = read_time

    print('Appended Data')

    #result = json.dumps(filtered_results[0])
    result = flask.jsonify({'Articles' : filtered_results})
    result.headers.add('Access-Control-Allow-Origin', '*')

    return result


