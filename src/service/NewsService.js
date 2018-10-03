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
    getTopHeadlinesForCarousel: function (country, pageSize, successCallback, failureCallaback) {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}`
      /*
       *  calling axios to handle http get request.
       *  based on the suggestion from news-api website, the apiKey is embedded within the http header
       *  instead of attaching it on the url
       */
      window.Axios.get(url, _httpHeaders).then(response => {
        // console.log('** ok~')
        console.log(response)
        if (successCallback) {
          successCallback(response)
        }
      }).catch(err => {
        // console.log('## shit')
        console.log(err)
        if (failureCallaback) {
          failureCallaback(err)
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
