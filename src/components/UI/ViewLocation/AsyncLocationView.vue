<script setup lang="ts">
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
  if (route.query?.lat && route.query?.lng) {
    try {
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${
          route.query.lat
        }&lon=${route.query.lng}&exclude={part}&appid=${
          import.meta.env.VITE_OpenWeatherApiId
        }&units=imperial`
      );

      // cal current date & time
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = weatherData?.data?.current?.dt * 1000 + localOffset;

      const currentTime = utc + 1000 * weatherData.data.timezone_offset;

      // cal hourly weather offset
      const hourly = weatherData.data?.hourly?.map((hour: any) => {
        const utc = hour.dt * 1000 + localOffset;

        const currentTime2 = utc + 1000 * weatherData.data.timezone_offset;

        return { ...hour, currentTime: currentTime2 };
      });

      return { ...weatherData.data, hourly, currentTime };
    } catch (err) {
      console.log(err);
    }
  }
};
const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("w-savedCities")!);
  const updatedCities = cities.filter(
    (city: any) => city.id !== route.query.id
  );
  localStorage.setItem("w-savedCities", JSON.stringify(updatedCities));
  router.push({
    name: "home",
  });
};
</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview === 'true'"
      class="p-4 bg-w-primary-1 w-full text-center"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>

    <div class="w-full" v-if="!!weatherData">
      <!-- Weather Overview -->
      <div class="flex flex-col items-center py-12">
        <h1 class="text-4xl mb-2 frost" :data-heading="route.params.city">
          {{ route.params.city }}
        </h1>
        <p class="text-sm mb-12">
          {{
            new Date(weatherData?.currentTime).toLocaleDateString("en-us", {
              weekday: "short",
              day: "2-digit",
              month: "long",
            })
          }}
          {{
            new Date(weatherData?.currentTime).toLocaleTimeString("en-us", {
              timeStyle: "short",
            })
          }}
        </p>
        <p class="text-8xl mb-8">
          {{ Math.round(weatherData?.current?.temp) }}&deg;
        </p>
        <p>
          Feels like
          {{ Math.round(weatherData?.current?.feels_like) }} &deg;
        </p>
        <p class="capitalize">
          {{ weatherData?.current?.weather[0].description }}
        </p>
        <img
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherData?.current?.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>

      <hr class="border-white border-opacity-10 border w-full" />

      <!-- Hourly Weather -->
      <div class="w-full max-w-screen-md py-12 mx-auto">
        <div class="mx-8">
          <h2 class="mb-4 text-w-primary">Hourly Weather</h2>
          <div class="flex gap-10 !max-w-full !min-w-[200px] overflow-x-scroll">
            <div
              v-for="hourData in weatherData.hourly"
              :key="hourData.dt"
              class="flex flex-col gap-4 items-center"
            >
              <p class="whitespace-nowrap text-md">
                {{
                  new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                    hour: "numeric",
                  })
                }}
              </p>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                alt=""
              />
              <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
            </div>
          </div>
        </div>
      </div>

      <hr class="border-white border-opacity-10 border w-full" />

      <!-- Weekly Weather -->
      <div class="max-w-screen-md w-full py-12 mx-auto">
        <div class="mx-8">
          <h2 class="mb-4 text-w-primary">7 Day Forecast</h2>
          <div
            v-for="day in weatherData.daily"
            :key="day.dt"
            class="flex items-center"
          >
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString("en-us", {
                  weekday: "long",
                })
              }}
            </p>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              alt=""
            />
            <div class="flex gap-2 flex-1 justify-end">
              <p>H: {{ Math.round(day.temp.max) }}</p>
              <p>L: {{ Math.round(day.temp.min) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stop tracking city -->
      <div class="flex justify-center py-12">
        <div
          class="flex items-center gap-2 text-sm text-w-white-3 cursor-pointer duration-150 hover:text-red-300"
          @click="removeCity"
        >
          <i class="fa-solid fa-trash"></i>
          <p class="">Stop tracking city</p>
        </div>
      </div>
    </div>
  </div>
</template>
