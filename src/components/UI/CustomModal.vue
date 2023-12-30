<script setup lang="ts">
const { showModal } = defineProps<{
  showModal: boolean;
}>();

defineEmits(["closeModal"]);
</script>

<template>
  <!-- send to body PORTAL -->
  <Teleport to="body">
    <!-- overlay -->
    <Transition name="modal-outer">
      <div
        v-show="showModal"
        class="absolute z-[400] w-full bg-black bg-opacity-25 h-screen top-0 left-0 flex justify-center px-8"
      >
        <!-- container -->
        <Transition name="modal-inner">
          <div
            v-if="showModal"
            class="px-4 py-5 bg-w-primary-1 self-start mt-[20vh] w-full max-w-screen-md"
          >
            <slot />
            <button
              class="mt-4 text-black bg-w-primary text-sm py-1.5 px-6 rounded-sm"
              @click="$emit('closeModal')"
            >
              Close
            </button>
          </div>
        </Transition>
      </div></Transition
    >
  </Teleport>
</template>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
