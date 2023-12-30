<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const { city } = defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

const router = useRouter();
const route = useRoute();

// VIEW A CITY
const goToCityView = () => {
  router.push({
    name: "locationView",
    params: { state: city.state.trim(), city: city.city.trim() },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};

defineEmits(["remove-city"]);
</script>

<template>
  <div class="relative group/card mb-3 w-full">
    <div
      class="flex py-6 px-4 bg-weather-secondary rounded-md shadow-md cursor-pointer bg-w-primary-1"
      @click="goToCityView"
    >
      <div class="flex flex-col flex-1">
        <h2 class="frost text-2xl" v-bind:data-heading="city.city">
          {{ city.city }}
        </h2>
        <h3>{{ city.state }}</h3>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-2xl self-end">
          {{ Math.round(city.weather.main.temp) }}&deg;
        </p>
        <div class="flex gap-2">
          <span class="text-xs">
            H:
            {{ Math.round(city.weather.main.temp_max) }}&deg;
          </span>
          <span class="text-xs">
            L:
            {{ Math.round(city.weather.main.temp_min) }}&deg;
          </span>
        </div>
      </div>
    </div>
    <!-- stop tracking -->
    <div
      class="opacity-0 group-hover/card:opacity-100 hidden sm:block absolute z-40 top-0 right-0 translate-x-1/3 -translate-y-1/3"
    >
      <i
        class="fa-sharp fa-solid fa-circle-xmark text-xl text-w-white-3 hover:text-w-white-1 duration-150 cursor-pointer"
        @click="$emit('remove-city', city)"
      ></i>
    </div>
  </div>
</template>
