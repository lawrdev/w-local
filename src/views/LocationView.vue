<script setup lang="ts">
import AsyncLocationView from "@/components/UI/ViewLocation/AsyncLocationView.vue";
import LocationViewSkeleton from "@/components/UI/ViewLocation/LocationViewSkeleton.vue";
</script>

<template>
  <div>
    <Suspense>
      <AsyncLocationView />

      <template #fallback>
        <div class="container">
          <LocationViewSkeleton />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>
