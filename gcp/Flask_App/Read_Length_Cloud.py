# Ensure your pyOpenSSL pip package is up to date
# Example posting a text URL:
from flask import Flask, render_template
import json
import requests


def getContent(url):
    
    extractor = extractors.ArticleExtractor()

    # From a URL
    content = extractor.get_content_from_url(url)

    #print(content)
    return content

def getLength(content):

    time = len(content)/1100.0

    minutes = int(round(time, 1))

    return minutes

@app.route("/length", methods=['GET'])
def Length(request):
    # Get data from url
    url = request.args.get('url', default = '')

    article_text = getContent(url)
    length = getLength(article_text)

    return length