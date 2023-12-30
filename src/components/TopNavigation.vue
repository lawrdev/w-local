<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import CustomModal from "./UI/CustomModal.vue";
import { computed, onMounted, ref } from "vue";
import { uid } from "uid";
import type { LocalstorageLocationType } from "@/utils/types";

const showModal = ref(false);
const savedCities = ref<LocalstorageLocationType[]>([]);

const route = useRoute();
const router = useRouter();

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const addCity = () => {
  // if (localStorage.getItem("w-savedCities")) {
  //   savedCities.value = JSON.parse(localStorage.getItem("w-savedCities")!);
  // }

  const locationObj: LocalstorageLocationType = {
    id: uid(),
    state: route.params.state as string,
    city: route.params.city as string,
    coords: {
      lat: route.query.lat as string,
      lng: route.query.lng as string,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("w-savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const isAdded = computed(() => {
  if (savedCities.value.length > 0) {
    const isFound =
      savedCities.value.find(
        (x) => x.coords.lat === (route.query.lat as string)
      ) &&
      savedCities.value.find(
        (x) => x.coords.lng === (route.query.lng as string)
      );

    if (isFound) {
      let query = Object.assign({}, route.query);
      delete query.preview;
      router.replace({ query });
    }

    return !!isFound;
  } else {
    return false;
  }
});

onMounted(() => {
  if (localStorage.getItem("w-savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("w-savedCities")!);
  }
});
</script>

<template>
  <!-- bg-body-bg -->
  <header class="sticky top-0 z-50 shadow-lg bg-body-bg">
    <nav
      class="container flex flex-row items-center justify-between gap-4 text-w-white-1 py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex item-center gap-3 sm:gap-2 text-w-primary">
          <div class="partly_cloudy">
            <div class="partly_cloudy__sun"></div>
            <div class="partly_cloudy__cloud"></div>
          </div>

          <!-- data-heading="Local Weather" -->
          <h1 class="frost text-lg mb-0 self-center">What Weather</h1>
        </div>
      </RouterLink>

      <div class="flex gap-5 sm:gap-3">
        <i
          class="fa-solid fa-circle-info text-lg text-w-white-2 hover:text-w-white-1 duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-lg text-w-white-2 hover:text-w-white-1 duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview === 'true' && !isAdded"
        ></i>
      </div>

      <!-- ABOUT MODAL -->
      <CustomModal :show-modal="showModal" @close-modal="toggleModal">
        <div>
          <h2 class="frost text-xl sm:text-2xl mb-3">About this app:</h2>
          <p class="mb-4 text-sm text-w-white-1">
            This app allows you to track the current and future weather of
            cities of your choosing.
          </p>

          <h3 class="text-md text-w-white-1 mb-2">How it works:</h3>
          <ol class="list-decimal list-inside mb-4 text-sm">
            <li class="mb-2 text-w-white-3">
              Search for your city by entering the name into the search bar.
            </li>
            <li class="mb-2 text-w-white-3">
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li class="mb-2 text-w-white-3">
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h3 class="text-md text-w-white-1 mb-1">Removing a city</h3>
          <p class="mb-2 text-w-white-3 text-sm">
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </CustomModal>
    </nav>
  </header>
</template>

<style lang="scss">
.partly_cloudy__sun {
  &:before {
    content: "";
    position: absolute;
    height: 80%;
    width: 80%;
    top: 10%;
    right: 10%;
    border-radius: 50%;
    z-index: 2;
    background-color: #f1c40f;
    background-image: radial-gradient(#f1c40f, #f39c12);
    box-shadow: 0 0 25px #917508;
  }
  &:after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    z-index: 1;
    background-color: #f39c12;
    will-change: opacity, transform;
    animation: fadeIn 2s linear infinite reverse,
      scaleDown 2s linear infinite reverse;
  }
}

.partly_cloudy__cloud {
  &:before {
    content: "";
    position: absolute;
    height: 40%;
    width: 40%;
    top: 30%;
    right: 0%;
    border-radius: 50%;
    border-bottom-left-radius: 0;
    z-index: 2;
    background-color: #ecf0f1;
    background-image: radial-gradient(#ecf0f1, #bdc3c7);
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  }
  &:after {
    content: "";
    position: absolute;
    height: 60%;
    width: 70%;
    top: 10%;
    right: 30%;
    border-radius: 50%;
    border-bottom-right-radius: 0;
    z-index: 1;
    background-color: #ecf0f1;
    background-image: radial-gradient(#ecf0f1, #bdc3c7);
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  }
}

.partly_cloudy {
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  &__sun {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &__cloud {
    position: absolute;
    width: 60%;
    height: 60%;
    top: 40%;
    z-index: 2;
    will-change: transform;
    animation: translateUp 2s linear infinite alternate;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes scaleDown {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}

@keyframes translateUp {
  0% {
    transform: translatey(15%);
  }
  100% {
    transform: translatey(0);
  }
}
</style>
