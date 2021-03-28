# Ensure your pyOpenSSL pip package is up to date
# Example posting a text URL:
from boilerpy3 import extractors
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

    return str(minutes)

def main():

    url = 'https://www.cnbc.com/2021/03/24/container-ship-runs-aground-in-suez-canal-causing-traffic-jam.html'

    content = getContent(url)
    time = getLength(content)

    print(time)


if __name__ == "__main__":
    main()