<template>
  <div id="map" class="yandex-maps"></div>
</template>

<script setup>
const API_KEY = '83914ce8-5042-494d-a186-d5948174283e'
const script = document.createElement('script')
script.id = 'yandexMap'
script.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`
document.head.appendChild(script)

function init(){
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 7
  });
}

script.onload = () => {
  ymaps.ready(init)
}

</script>

<style lang="sass" scoped>
.yandex-maps
  width: 400px
  height: 400px
  border: 1px solid red
</style>
