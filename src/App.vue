<template>
  <div id="app">
    <Counter
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Counter from './Counter.vue';
@Component({
  components: {
    Counter,
  },
})
export default class App extends Vue {
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap')

body
    margin: 0
    font-family: 'roboto'

</style>
