<style>
.searchbar-listing-item-container {
  height: 180px;
  /* box-shadow: 0px 1px #ccc; */
  border-radius: 2px;

  border-top: 1px solid #ccc;
  border-bottom: none;
  border-left: none;
  border-right: none;

  text-align: left;
  padding: 8px;
}
.searchbar-listing-item-img {
  float: right;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.searchbar-listing-item-author {
  margin-top: 16px;
  font-weight: 100;
  font-size: 11px;
}
.searchbar-listing-item-readmore {
  text-align: right;
  font-weight: 400;
  font-size: 12px;
}
</style>

<script>
export default {
  name: 'comp_searchbarlistingitem',
  data: function () {
    return {}
  },
  props: [ 'itemObject' ],
  methods: {
    getAuthor: function () {
      if (this.itemObject.author) {
        return this.itemObject.author
      }
      return 'UN-KNOWN author'
    },
    getSourceName: function () {
      if (this.itemObject.source.name) {
        return this.itemObject.source.name
      }
      return 'UN-KNOWN source'
    },
    getImageSrc: function () {
      if (this.itemObject.urlToImage) {
        return this.itemObject.urlToImage
      }
      return '/comingSoon.jpg'
    },

    updatePickedNewsItem: function () {
      this.$store.commit('setPickedNewsItem', this.itemObject)
      // router forward to the details page
      this.$router.push({ name: 'NewsFeedItemDetailPage' })
    }
  }
}
</script>

<template>
  <div class="searchbar-listing-item-container" @click="updatePickedNewsItem()">
    <img
      v-bind:src="getImageSrc()"
      class="searchbar-listing-item-img"
      style="width: 60px; height: 48px;" />
    <div class="h6">
      {{itemObject.title}}
    </div>
    <div class="searchbar-listing-item-author text-truncate">
      <i class="fa fa-user" aria-hidden="true"></i>
      &nbsp;
      {{getAuthor()}}
    </div>
    <div class="nf-font-11">
      <i class="fa fa-exclamation-circle nf-font-11" aria-hidden="true"></i>
      &nbsp;
      <b>{{getSourceName()}}</b>
    </div>
    <div class="searchbar-listing-item-readmore nf-pointer-mouse">
      Read More...
    </div>
  </div>
</template>
