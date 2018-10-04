<style>
.searchbar-main-container {
  max-width: 600px;
  margin: auto;
}
.searchbar-has-items-header {
  text-align: left;
  margin-left: 24px;
  margin-right: 24px;
}
</style>

<script>
import ItemComponent from './SearchbarListingItem'

export default {
  name: 'comp_searchbarlisting',
  data: function () {
    return {}
  },
  methods: {
    /**
     * get the news items for display
     * @returns {null}
     */
    getNewsItems: function () {
      return this.$store.state.searchbar.newsItems
    }
  },
  components: {
    ItemComponent
  }
}
</script>

<template>
  <div class="searchbar-main-container">
    <div v-if="getNewsItems() && getNewsItems().length > 0">
      <div class="h6 searchbar-has-items-header" style="margin-bottom: 16px;">
        searchbar result listings ({{getNewsItems().length}})
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 col-sm-12" v-for="item in getNewsItems()" v-bind:key="item.url">
            <ItemComponent
              v-bind:item-object="item" ></ItemComponent>
          </div>
        </div>
      </div>

    </div>
    <div v-if="getNewsItems() && getNewsItems().length === 0">
      <div class="h6 searchbar-has-items-header">
        searchbar result listings (0) - no result found on the keywords
      </div>

    </div>
  </div>
</template>
