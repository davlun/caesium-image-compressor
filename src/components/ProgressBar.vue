<template>
  <div class="w-full h-4 bg-white">
    <div class="progress h-full bg-green-500 text-xs" :style="[{width: `${percentage}%`}]">
      <span v-if="showLabel" class="text-xs block h-full w-full">{{ percentage }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',

  props: {
    max: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    value: {
      type: Number,
      required: true,
    },
    showLabel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    percentage() {
      return this.max === 0 ? 0 : Math.round(this.value / this.max * 100);
    },
  },
};
</script>

<style scoped>
  .progress {
    transition: width .2s ease-in-out;
  }
</style>
