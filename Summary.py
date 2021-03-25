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
    content = getContent()
    new_content = Summarize(content)
    print(new_content)

if __name__ == "__main__":
    main()