<template lang="html">
  <div v-if="value !== undefined || $slots.default">
    <div class="text-caption">
      {{ name }}
    </div>
    <p class="ml-2 subheading">
      <slot>
        {{ value }}
      </slot>
    </p>
  </div>
</template>

<script lang="js">
export default {
	props: {
		name: String,
		value: [String, Number, Boolean],
	}
}
</script>

<style lang="css" scoped>
</style>
