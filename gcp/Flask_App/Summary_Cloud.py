# Ensure your pyOpenSSL pip package is up to date
# Example posting a text URL:
from boilerpy3 import extractors
from flask import Flask, render_template
import json
import requests


def getContent(url):
    
    extractor = extractors.ArticleExtractor()

    # From a URL
    content = extractor.get_content_from_url(url)

    #print(content)
    return content

def Summarize(content):
    r = requests.post(
        "https://api.deepai.org/api/summarization",
        data={
            'text': content,
        },
        headers={'api-key': '8478ec51-d77b-4cc5-ab0a-9fef54374644'}
    )
    return r.json()

@app.route("/sentiment", methods=['GET'])
def Sentiment(request):
    # Get data from url
    url = request.args.get('url', default = '')

    article_text = getContent(url)
    summary = Summarize(article_text)
    return summary
