<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import LocationCardSkeletonVue from "@/components/UI/LocationCardSkeleton.vue";
import SavedLocationsList from "@/components/UI/Home/SavedLocationsList.vue";

const mapboxAPIKey = import.meta.env.VITE_MAPBOXAPIKEY;

const searchQuery = ref("");
// to store timer for delaying search query
const queryTimeout = ref<undefined | number>(undefined);
const mapboxSearchResults = ref<null | { [key: string]: any }[]>(null);
const searchError = ref(false);

const router = useRouter();

const previewCity = (searchResult: { [key: string]: any }) => {
  const [city, state] = searchResult.place_name.split(",");

  router.push({
    name: "locationView",
    params: { state: state.trim(), city: city.trim() },
    query: {
      lat: searchResult.geometry?.coordinates[1],
      lng: searchResult.geometry?.coordinates[0],
      preview: "true",
    },
  });
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }

      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>

<template>
  <main class="container text-w-white-1">
    <!-- search box -->
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full text-[16px] bg-transparent border-b focus:border-w-primary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute z-10 bg-w-black-3 text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p class="py-2" v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>

        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer hover:bg-w-primary-1 px-2"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <!-- Locations list  -->
    <div class="flex flex-col gap-4">
      <Suspense>
        <SavedLocationsList />

        <template #fallback>
          <LocationCardSkeletonVue />
        </template>
      </Suspense>
    </div>
  </main>
</template>
