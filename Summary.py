# Ensure your pyOpenSSL pip package is up to date
# Example posting a text URL:
from boilerpy3 import extractors
import requests
import urllib.request

def getContent(url):
    extractor = extractors.ArticleExtractor(raise_on_failure=False)

    # From a URL
    resp = requests.get(url)
    if resp.ok:
        #content = extractor.get_content_from_url(url, headers= {'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'})
        r = urllib.request.Request(url, headers= {'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'})
        html = urllib.request.urlopen(r).read().decode()
        content = extractor.get_content(html)
    else:
        content = 'error'
    
    if content == '':
        content = 'error'

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


def main():
    content = getContent('https://www.statnews.com/2021/03/26/amazon-on-the-move-in-health-care-is-granted-authorization-for-its-own-covid-19-test/')
    new_content = Summarize(content)
    print(new_content)

if __name__ == "__main__":
    main()