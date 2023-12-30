<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

import LocationCard from "../LocationCard.vue";
import type { LocalstorageLocationType } from "@/utils/types";

const savedCities = ref<LocalstorageLocationType[]>([]);

// GET CITIES SAVED
const getCities = async () => {
  if (localStorage.getItem("w-savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("w-savedCities")!);

    const requests: any[] = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords?.lat}&lon=${city.coords?.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value: any, index) => {
      (savedCities.value[index] as any).weather = value.data;
    });
  }
};
// COMPONENTS IS ASYNC - top-level await
await getCities();

// STOP TRACKING CITY
const removeCity = (currCity: any) => {
  const i = savedCities.value.indexOf(currCity);
  if (i > -1) {
    savedCities.value.splice(i, 1);
  }

  const cities = JSON.parse(localStorage.getItem("w-savedCities")!);
  const updatedCities = cities.filter((city: any) => city.id !== currCity.id);

  // savedCities.value = savedCities.value.filter(
  //   (city: any) => city.id !== currCity.id
  // );
  localStorage.setItem("w-savedCities", JSON.stringify(updatedCities));
};
</script>

<template>
  <transition-group name="list" tag="div" class="relative p-0">
    <location-card
      v-for="city in savedCities"
      :key="city.id"
      :city="city"
      @remove-city="removeCity"
    />
  </transition-group>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
