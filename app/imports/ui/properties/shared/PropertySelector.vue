<template lang="html">
  <div class="card-raised-background">
    <v-container
      fluid
      grid-list-lg
      fill-height
    >
      <v-layout
        wrap
        fill-height
      >
        <template v-for="(property, type) in PROPERTIES">
          <v-flex
            v-if="!noLibraryOnlyProps || !property.libraryOnly"
            :key="type"
            sm4
            xs6
          >
            <v-card
              hover
              style="height: 100%; overflow: hidden;"
              @click="$emit('select', type)"
            >
              <div
                class="layout align-center justify-center"
                style="min-height: 70px;"
              >
                <v-icon x-large>
                  {{ property.icon }}
                </v-icon>
              </div>
              <h3
                class="subtitle pb-3"
                style="text-align: center;"
              >
                {{ property.name }}
              </h3>
            </v-card>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="js">
import PROPERTIES from '/imports/constants/PROPERTIES.js';

export default {
  props: {
    noLibraryOnlyProps: Boolean,
  },
	data(){ return {
		PROPERTIES,
	};},
}
</script>

<style lang="css" scoped>
</style>
