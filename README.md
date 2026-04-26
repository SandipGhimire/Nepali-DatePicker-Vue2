# Nepali Date Picker (Vue 2) 🇳🇵

[![npm version](https://img.shields.io/npm/v/nepali-datepicker-vue2.svg?style=flat-square)](https://www.npmjs.com/package/nepali-datepicker-vue2)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/Docs-Official-blue?style=flat-square)](https://nepalidatepicker.sandip-ghimire.com.np/docs/Vue2/)

A clean and lightweight Nepali (Bikram Sambat) date picker component for Vue 2.

> ⚠️ **Note**: This package is in maintenance mode. For new projects, we recommend using the [Vue 3 version](https://github.com/SandipGhimire/Nepali-DatePicker-Vue3).

---

## 📚 Full Documentation

For advanced usage, examples, and full API reference, visit the official documentation:
👉 **[https://nepalidatepicker.sandip-ghimire.com.np/](https://nepalidatepicker.sandip-ghimire.com.np/)**

---

## ✨ Features

- **Vue 2 Support**: Native support for Vue 2 projects.
- **Accurate BS Dates**: Powered by `nepali-date-library`.
- **Year & Month Selection**: Navigate quickly through the calendar.
- **Today Highlighting**: Easily identify the current date.
- **Customizable**: Add your own CSS classes for styling.

---

## 🚀 Installation

```bash
npm install nepali-datepicker-vue2
```

### Import Styles

Import the required CSS in your main entry file (e.g., `main.js`):

```js
import "nepali-datepicker-vue2/main.css";
```

---

## 📖 Usage

```vue
<template>
  <div>
    <NepaliDatepicker v-model="selectedDate" placeholder="Select Date" />
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

---

## 🛠 Props

| Prop          | Type      | Default | Description                               |
| ------------- | --------- | ------- | ----------------------------------------- |
| `value`       | `string`  | `''`    | v-model binding (BS date in `YYYY-MM-DD`) |
| `yearSelect`  | `boolean` | `true`  | Enable/disable year selection             |
| `monthSelect` | `boolean` | `true`  | Enable/disable month selection            |
| `classValue`  | `string`  | `''`    | Custom class for the root element         |
| `placeholder` | `string`  | `''`    | Input placeholder                         |

---

## 📄 License

MIT © [Sandip Ghimire](https://github.com/SandipGhimire)
