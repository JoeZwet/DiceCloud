<template lang="html">
  <v-checkbox
    v-bind="$attrs"
    :loading="loading"
    :error-messages="errors"
    :input-value="safeValue"
    :disabled="isDisabled"
    @change="change"
  />
</template>

<script lang="js">
  import SmartInput from '/imports/ui/components/global/SmartInputMixin.js';

  export default {
    mixins: [SmartInput],
  };
</script>
