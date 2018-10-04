let NewsService = function (configFile) {
  let _apiKey = ''
  let _httpHeaders = {
    headers: {
      'X-Api-Key': null
    }
  }

  return {
    /**
     * init method / ctor
     */
    init: function () {
      _apiKey = configFile.newsApi.apiKey
      _httpHeaders.headers['X-Api-Key'] = _apiKey
    },
    /**
     * return the top headlines
     * @param country
     * @param pageSize
     * @param successCallback
     * @param failureCallaback
     */
    getTopHeadlinesForCarousel: function (country, pageSize, successCallback, failureCallaback) {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}`
      /*
       *  calling axios to handle http get request.
       *  based on the suggestion from news-api website, the apiKey is embedded within the http header
       *  instead of attaching it on the url
       */
      window.Axios.get(url, _httpHeaders).then(response => {
        // console.log('** ok~')
        // console.log(response)
        if (successCallback) {
          successCallback(response)
        }
      }).catch(err => {
        console.log(err)
        if (failureCallaback) {
          failureCallaback(err)
        } else {
          alert(err)
        }
      })
    },
    /**
     * method to get everything from the news-api based on the given keywords
     * @param keywords
     * @param pageSize
     * @param pageNumber
     * @param sortBy
     * @param successCallback
     * @param failureCallback
     */
    getEverythingNewsByKeywords: function (keywords, pageSize, pageNumber, sortBy, language, successCallback, failureCallback) {
      let url = 'https://newsapi.org/v2/everything?q='
      // prepare the "parts" for the api
      if (keywords && window.TypeService.isEmptyString(keywords) === false) {
        // url encoded the keywords (especially with spaces in between)
        url += encodeURI(keywords)
      }
      if (pageSize) {
        url += '&pageSize=' + pageSize
      }
      if (pageNumber) {
        url += '&page=' + pageNumber
      }
      if (sortBy) {
        if (sortBy === 'publishedAt' || sortBy === 'relevancy' || sortBy === 'popularity') {
          url += '&sortBy=' + sortBy
        } else {
          url += '&sortBy=publishedAt'
        }
      } else {
        // default sorting by publish date
        url += '&sortBy=publishedAt'
      }
      if (language) {
        url += '&language=' + language
      }
      // call api
      window.Axios.get(url, _httpHeaders).then(response => {
        if (successCallback) {
          successCallback(response)
        }
      }).catch(err => {
        console.log(err)
        if (failureCallback) {
          failureCallback(err)
        } else {
          alert(err)
        }
      })
    }
  }
}

export default function (configFile) {
  return new NewsService(configFile)
}
