<template>
  <div class="cheesebox">
    <ul class="relative flex flex-wrap gap-2 w-full justify-center">
      <li
        class="cheese-item relative"
        v-for="letter in ['M', 'A', 'D', 'E', `space`, 'W', 'I', 'T', 'H']"
        :key="letter"
      >
        <input
          v-if="letter !== 'space'"
          class="cheese-input"
          type="checkbox"
          :checked="letter === 'D' || letter === 'I' || letter === 'T'"
        />
        {{ letter === "space" ? "&nbsp;" : null }}
        <div
          v-if="letter !== 'space'"
          class="cheese-letter text-base sm:text-lg font-extrabold px-3 py-2 relative bg-[#18191f] text-[#555] rounded-md"
        >
          {{ letter }}
        </div>
      </li>
    </ul>
    <br />
    <p class="text-red-500 text-center text-2xl mb-2">❤</p>
    <div class="w-full flex justify-center items-center">
      <a
        href="https://github.com/lawrdev"
        target="_blank"
        class="w-full text-center text-w-white-2"
        >@lawrdev</a
      >
    </div>
  </div>
</template>

<style scoped>
li.cheese-item {
  list-style: none;
}

label {
  position: relative;
}

input[type="checkbox"] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
  /* height: 80px;
  width: 80px; */
  height: 100%;
  width: 100%;
  z-index: 10;
}

div.cheese-letter {
  /* background: #18191f; */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: -1px -1px 4px rgba(255, 255, 255, 0.05),
    4px 4px 6px rgba(0, 0, 0, 0.2),
    inset -1px -1px 4px rgba(255, 255, 255, 0.05),
    inset 1px 1px 1px rgba(0, 0, 0, 0.1);
}

input[type="checkbox"]:checked ~ div.cheese-letter {
  box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.05),
    inset 4px 4px 6px rgba(0, 0, 0, 0.2);
  color: yellow;
  text-shadow: 0 0 15px yellow, 0 0 25px yellow;
  animation: glow 1.5s linear infinite;
}

@keyframes glow {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
