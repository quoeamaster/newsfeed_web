<style>
  .historical-main-container {
    max-width: 600px;
    margin: auto;
  }
  .historical-has-items-header {
    text-align: left;
    margin-left: 24px;
    margin-right: 24px;
  }
</style>

<script>
import ItemComponent from './SearchbarListingItem'

export default {
  name: 'comp_historicalsearchlisting',
  data: function () {
    return {
      items: null
    }
  },
  methods: {
    getHistoricalSearchItems: function () {
      let pref = this.$store.state.prefs.record
      console.log(pref)
      if (pref && pref.keywords) {
        // prepare the keywords for a search again
        let prefKeywords = ''
        let arrKeywords = pref.keywords
        for (let i = 0; i < arrKeywords.length; i++) {
          prefKeywords += arrKeywords[i]['keyword'] + ' OR '
        }
        // remove the last ' OR '
        if (arrKeywords.length > 1) {
          prefKeywords = prefKeywords.substring(0, prefKeywords.length - 4)
        }
        window.NewsService.getEverythingNewsByKeywords(prefKeywords,
          8,
          1,
          'relevancy',
          'en',
          this.historicalSearchSuccess,
          this.historicalSearchFailure)
      }
    },
    historicalSearchSuccess: function (data) {
      this.items = data.data.articles
    },
    historicalSearchFailure: function (err) {
      console.log('damn')
      console.log(err)
      alert(err)
    }
  },
  computed: {
    searchPrefs: function () {
      return this.$store.state.prefs.record
    }
  },
  watch: {
    searchPrefs: function (newValue, oldValue) {
      this.getHistoricalSearchItems()
    }
  },
  mounted: function () {
    // run the pref search once
    this.getHistoricalSearchItems()
  },
  components: {
    ItemComponent
  }
}
</script>

<template>
  <div class="historical-main-container">
    <div v-if="items && items.length > 0">
      <div class="h6 historical-has-items-header" style="margin-bottom: 16px;">
        recommended listings based on Historical Searches ({{items.length}})
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 col-sm-12" v-for="item in items" v-bind:key="item.url">
            <ItemComponent
              v-bind:item-object="item" ></ItemComponent>
          </div>
        </div>
      </div>
    </div>
    <div v-if="items && items.length === 0">
      <div class="h6 historical-has-items-header" style="margin-bottom: 16px;">
        no recommended listings available based on historical searches ...
      </div>
    </div>

  </div>
</template>
