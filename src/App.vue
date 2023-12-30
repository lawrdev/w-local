<script setup lang="ts">
import { RouterView } from "vue-router";
import TopNavigation from "./components/TopNavigation.vue";
import CheeseBox from "./components/UI/Home/CheeseBox.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen font-Roboto">
    <TopNavigation />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component"
      /></Transition>
    </RouterView>

    <!-- cheeeeese! -->
    <div class="mt-auto pt-[72px] pb-4">
      <CheeseBox />
    </div>
  </div>
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

$color1: white;
$color2: black;

.frost {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/6963bbf342d87b3a2150bd8f59682b89.jpg);
  background-clip: text;
  background-size: contain;

  color: transparent;
  font-weight: 700;
  position: relative;
  font-family: "frozen", serif;

  &::before {
    content: attr(data-heading);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 45%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 55%,
      rgba(255, 255, 255, 0) 100%
    );
    background-clip: text;
    color: transparent;
    mix-blend-mode: screen;
    animation: shine 1s infinite;
    background-size: 200%;
    text-shadow: 2px 2px 10px rgba(#000, 0.2), -2px 2px 10px rgba(#000, 0.2),
      -2px -2px 10px rgba(#000, 0.2);
  }
}

@keyframes shine {
  0% {
    background-position: -100%;
  }
  100% {
    background-position: 100%;
  }
}
</style>
