<style>
.pane-landing-container {
  margin: 20px 4px 24px 4px;
}
</style>

<script>
import CarouselComponent from './Carousel.vue'
import SearchbarListingComponent from './SearhbarListing'
import HistoricalListingComponent from './HistoricalSearchListing'

export default {
  name: 'comp_newsfeedlandingpage',
  data: function () {
    return {
      carouselTopHeadlines: null,

      commonError: null
    }
  },
  components: {
    CarouselComponent,
    SearchbarListingComponent,
    HistoricalListingComponent
  },
  methods: {
    // carousel related methods
    carouselGetTopHeadlinesSuccess: function (data) {
      this.carouselTopHeadlines = data
      console.log(this.carouselTopHeadlines)
    },
    carouselGetTopHeadLinesFailure: function (err) {
      this.commonError = err
    }
  },
  created: function () {
    // get current top 5 headlines
    window.NewsService.getTopHeadlinesForCarousel('us',
      5,
      this.carouselGetTopHeadlinesSuccess,
      this.carouselGetTopHeadLinesFailure)
  }
}
</script>

<template>
  <div>
    <!-- content -->
    <div class="pane-landing-container">
      <CarouselComponent config-id="landingCarouselMain" v-bind:carouselData="carouselTopHeadlines"></CarouselComponent>
    </div>
    <!-- searchbar results listing -->
    <SearchbarListingComponent></SearchbarListingComponent>
    <!-- the list of newsItem that might be interested by historical choices /searches -->
    <HistoricalListingComponent></HistoricalListingComponent>
  </div>
</template>
