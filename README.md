# Nepali Date Picker

A Vue 2 component for selecting dates in the Nepali calendar (Bikram Sambat).

## Features

- Vue 2 implementation
- Nepali (BS) calendar date picker with clean UI
- Support for date conversion between AD and BS
- Year and month selection
- Today highlighting
- Keyboard accessibility

## Installation

```bash
npm install nepali-datepicker-vue2
```

## Dependency
- [Vue](https://vuejs.org/)
- [Nepali Date Library](https://www.npmjs.com/package/nepali-date-library) 

## Usage

## Import Styles

Make sure to import the CSS styles in your main entry file (e.g., `main.ts` or `main.js`):

```ts
import 'nepali-datepicker-vue2/main.css';
```

## Initialization Example

```vue
<template>
  <div class="app-container">
    <NepaliDatepicker
      v-model="selectedDate"
      placeholder="Select a date"
      classValue="custom-datepicker"
    />
  </div>
</template>

<script>
import NepaliDatepicker from "nepali-datepicker-vue2";

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
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `String` | `''` | v-model binding for the selected date (YYYY-MM-DD format) |
| `yearSelect` | `Boolean` | `true` | Enable/disable year selection |
| `monthSelect` | `Boolean` | `true` | Enable/disable month selection |
| `classValue` | `String` | `''` | Additional CSS class for the input element |
| `placeholder` | `String` | `''` | Placeholder text for the input element |

## Events
| Event | Description |
|------|-------------|
| `@onSelect` | Called when date is selected |

## Browser Support

The component supports all modern browsers that are compatible with Vue 2.

## License

MIT License