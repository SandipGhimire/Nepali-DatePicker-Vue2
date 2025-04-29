<!-- Example Parent Component -->
<template>
  <div class="app-container">
    <NepaliDatepicker
      v-model="selectedDate"
      placeholder="Select a date"
      class="custom-datepicker"
      :yearSelect="false"
    />
  </div>
</template>

<script>
import NepaliDatepicker from "./NepaliDatePicker/NepaliDatePicker.vue";

export default {
  components: {
    NepaliDatepicker,
  },
  data() {
    return {
      selectedDate: "",
    };
  },
};
</script>