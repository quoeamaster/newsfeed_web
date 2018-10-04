<style>
.item-detail-container {
  max-width: 600px;
  margin: auto;
  padding: 24px;
  padding-bottom: 48px;

  text-align: left;
}
.item-detail-author {
  font-weight: bolder;
}
.item-detail-title {
  padding-top: 28px;
}
.item-detail-description {
  padding-top: 8px;
}
.item-detail-image-container {
  text-align: center;
}
.item-detail-image {
  max-width: 480px;
  border-radius: 8px;
}
.item-detail-read-more {
  text-align: right;
  padding-top: 16px;
  font-size: 14px;
  font-weight: bold;
}
.item-detail-back {
  float: right;
  font-size: 14px;
}
</style>

<script>
export default {
  name: 'newsfeeditemdetailpage',
  data: function () {
    return {
      item: null
    }
  },
  methods: {
    getNewsItem: function () {
      if (!this.item) {
        this.item = this.$store.state.general.pickedNewsItem
      }
      return this.item
    },
    getAuthor: function () {
      if (this.item.author) {
        return this.item.author
      }
      return 'UN-KNOWN author'
    },
    getImage: function () {
      if (this.item.urlToImage) {
        return this.item.urlToImage
      }
      return null
    },

    fwdToLandingPage: function () {
      this.$router.push({ name: 'NewsFeedLandingPage' })
    },

    openActualContentOnNewPage: function () {
      window.open(this.item.url, 'news-actual')
    }
  },
  created: function () {
    this.getNewsItem()
  }
}
</script>

<template>
  <div class="item-detail-container">
    <div class="item-detail-back nf-pointer-mouse" @click="fwdToLandingPage()">
      <i class="fa fa-chevron-left" aria-hidden="true">
        &nbsp;<span style="font-size: 16px;">back</span>
      </i>
    </div>
    <div class="item-detail-author nf-font-14">
      <i class="fa fa-user" aria-hidden="true"></i>
      &nbsp;
      {{getAuthor()}}
    </div>
    <div class="item-detail-title h6">
      {{item.title}}
    </div>
    <div class="item-detail-image-container">
      <img v-bind:src="getImage()" class="item-detail-image" />
    </div>
    <div class="item-detail-description">
      {{item.description}}
    </div>
    <div class="nf-separator">
      <span class="nf-separator-item-spacer">.</span>
      <span class="nf-separator-item-spacer">.</span>
      <span class="nf-separator-item-spacer">.</span>
    </div>
    <div class="item-detail-description">
      {{item.content}}
    </div>
    <div class="item-detail-read-more nf-pointer-mouse" @click="openActualContentOnNewPage()">
      Read all contents...
    </div>
  </div>
</template>
