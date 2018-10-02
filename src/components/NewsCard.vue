<style></style>

<script>
export default {
  name: 'comp_newscard',
  data: function () {
    return {}
  },
  props: [ 'config', 'newsItem', 'index' ],
  methods: {
    /**
     * method to return the style(s) for the card
     */
    getStyleCardDimensions: function () {
      let styles = {}

      styles['width'] = this.config['card_dimension']['width']
      styles['height'] = this.config['card_dimension']['height']
      styles['overflow-y'] = 'hidden'

      // zoom factor... buggy
      /*
      let zoomFactor = 1 - (this.index % this.config.slideSize) * 0.2
      styles['transform'] = `scale(${zoomFactor})`
      styles['-ms-transform'] = `scale(${zoomFactor})`
      styles['-webkit-transform'] = `scale(${zoomFactor})`
      */
      return styles
    },
    /**
     * method to return the style(s) for the card image
     */
    getStyleCardImgHeight: function () {
      let styles = {}

      styles['height'] = (parseInt(this.config['card_dimension']['height']) / 1.8) + 'px'
      styles['background-size'] = 'cover'
      return styles
    },

    /**
     *  emit event back to the owner of this component (parent)
     */
    onCardClick: function (event) {
      this.$emit('carouselMainClick', {
        event: event,
        newsItem: this.newsItem
      })
    },
    /**
     * return the image url (fallback to a default "missing" photo)
     * @returns {*}
     */
    getImageUrl: function () {
      let url = this.newsItem.urlToImage
      if (!url) {
        url = '/comingSoon.jpg'
      }
      return url
    }
  }
}
</script>

<template>
  <div class="card nf-pointer-mouse"
       @click="onCardClick"
       v-bind:style="getStyleCardDimensions()">
    <img class="card-img-top"
         v-bind:style="getStyleCardImgHeight()"
         v-bind:src="getImageUrl()">
    <div class="card-body" style="text-align: left;">
      <!-- text-truncate to truncate long string -->
      <h6 class="card-title" >{{newsItem.title}}</h6>
      <p class="card-text pull-left text-truncate" style="font-size: 12px;">
        <b>{{newsItem.source.name}}</b>
      </p>
      <p class="card-text pull-right text-truncate" style="font-size: 12px;">
        {{newsItem.publishedAt}}
      </p>
    </div>
  </div>
</template>
