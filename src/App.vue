<template>
  <SlidePanel/>
  <router-view></router-view>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import MainView from './components/MainView.vue'
// import MainPanel from './components/MainPanel.vue'
import SlidePanel from './components/SlidePanel.vue'

const testComponent = ref(null);
const time = ref('');

const triggerGet1p1 = () => {
  if (testComponent.value) {
    testComponent.value.triggerGet1p1();
  }
};

const handleGet1p1Event = (event) => {
  testComponent.value.triggerGet1p1 = event;
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 20px;
  height: 100%;
}
</style>
