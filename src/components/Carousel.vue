<style>
.pane-carousel-container {
  width: 100%;
  height: 300px;
  background-image: linear-gradient(white, #efefef);
}
.pane-carousel-feed-container {
  margin-left: 40px;
  margin-right: 40px;
}

.btn-directions-carousel {
  color: #666;
}
.btn-directions-carousel:hover {
  color: #aaa;
}

.btn-directions-left {
  position: relative;
  float: left;
  top: 100px;
}
.btn-directions-right {
  position: relative;
  float: right;
  top: 100px;
}
</style>

<script>
export default {
  name: 'comp_carousel',
  data: function () {
    return {
      test: 'testing property',
      config: null,
      // the index of the news-items for display
      carousel: {
        current: 0,
        displayItems: []
      }
    }
  },
  props: [ 'configId', 'carouselData' ],
  /*
   * lifecycle diagram: https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
   */
  created: function () {
    // load config file contents...
    this.config = require(`./../assets/${this.configId}.json`)
  },
  methods: {
    /**
     * css for the "loading" gif
     * @returns {{"nf-hidden": boolean, "nf-show": boolean}}
     */
    getCssLoadingGif: function () {
      if (this.carouselData) {
        return {
          'nf-hidden': true,
          'nf-show': false
        }
      } else {
        return {
          'nf-hidden': false,
          'nf-show': true
        }
      }
    },
    getCssNewsItem: function () {
      let css = this.getCssLoadingGif()
      if (css) {
        css['nf-hidden'] = !css['nf-hidden']
        css['nf-show'] = !css['nf-show']
      }
      return css
    },

    /**
     *  update the items for display
     */
    getDisplayNewsItems: function () {
      let items = this.carouselData.data.articles

      this.carousel.displayItems = []
      if ((this.carousel.current + this.config.slideSize) < items.length) {
        for (let i = 0; i < 3; i++) {
          this.carousel.displayItems.push(items[this.carousel.current + i])
        }
      } else {
        let finalIndex = this.carouselData.data.articles.length
        let size = finalIndex - this.carousel.current

        for (let i = 0; i < size; i++) {
          this.carousel.displayItems.push(items[this.carousel.current + i])
        }
      }
    },
    /**
     *  swipe the carousel items by "direction"
     */
    swipeCarousel: function (direction) {
      switch (direction) {
        case 0:
          this.carousel.current--
          if (this.carousel.current < 0) {
            this.carousel.current = 0
          }
          break
        case 1:
          this.carousel.current++
          if (this.carousel.current >= this.carouselData.data.articles.length) {
            this.carousel.current = (this.carouselData.data.articles.length - 1)
          }
          break
      }
      // console.log(`total arcticles : ${this.carouselData.data.articles.length}, current index => ${this.carousel.current}`)
      // update the display items
      this.getDisplayNewsItems()
    }
  },
  watch: {
    /**
     * activate the getDisplayItems() to update the items for display
     * @param newValue
     * @param oldValue
     */
    carouselData: function (newValue, oldValue) {
      if (newValue) {
        this.getDisplayNewsItems()
      }
    }
  }
}
</script>

<template>
  <div class="pane-carousel-container">
    <!-- loading gif animation whilst connecting to the news-api server -->
    <div v-bind:class="getCssLoadingGif()" style="margin-top: 100px;">
      <img src="./../assets/loading.gif" width="100px" height="100px"  />
    </div>
    <!-- display area -->
    <div class="pane-carousel-feed-container" v-bind:class="getCssNewsItem()">
      <i @click="swipeCarousel(0)" class="fa fa-caret-left btn-direction-carousel btn-directions-carousel nf-pointer-mouse btn-directions-left" style="font-size: 60px;" aria-hidden="true"></i>
      <i @click="swipeCarousel(1)" class="fa fa-caret-right btn-direction-carousel btn-directions-carousel nf-pointer-mouse btn-directions-right" style="font-size: 60px;" aria-hidden="true"></i>
      <div style="margin-left: 48px; margin-right: 48px;">
        {{carousel.displayItems}}
        <!-- add a component for the card slide(s) -->
      </div>

    </div>

  </div>
</template>
