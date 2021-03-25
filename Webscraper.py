


def getContent(request):
    from boilerpy3 import extractors

    extractor = extractors.ArticleExtractor()

    # From a URL
    content = extractor.get_content_from_url('https://www.bbc.com/news/world-us-canada-56501686')

    return content