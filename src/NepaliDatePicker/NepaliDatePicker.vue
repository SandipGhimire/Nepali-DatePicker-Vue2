<template>
  <div class="nepali-datepicker" :key="date_id" :class="this.classValue">
    <div
      class="calendar-input-div"
      :class="modelValue ? 'calendar-input-contain-value' : ''"
    >
      <input
        type="text"
        class="calendar-input"
        @click="toggleCalendar(true)"
        v-model="formatedValue"
        :placeholder="placeholder"
        aria-haspopup="true"
        :id="'nepali-date-input-' + date_id"
        @keyup.enter="updateInputtedValue()"
      />
      <div
        class="calendar-input-icon calender-icon"
        @click.stop="toggleCalendar(true)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          width="1em"
          height="1em"
          v-if="!(visible && modelValue)"
        >
          <path
            d="M940.218 107.055H730.764v-60.51H665.6v60.51H363.055v-60.51H297.89v60.51H83.78c-18.617 0-32.581 13.963-32.581 32.581v805.237c0 18.618 13.964 32.582 32.582 32.582h861.09c18.619 0 32.583-13.964 32.583-32.582V139.636c-4.655-18.618-18.619-32.581-37.237-32.581zm-642.327 65.163v60.51h65.164v-60.51h307.2v60.51h65.163v-60.51h176.873v204.8H116.364v-204.8H297.89zM116.364 912.291V442.18H912.29v470.11H116.364z"
          ></path>
        </svg>
      </div>
      <div
        class="calendar-input-icon"
        :class="visible ? '' : 'calendar-clear-input'"
        @click.stop="resetClear()"
        v-if="modelValue"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <transition name="calendar-animation">
      <div
        v-if="visible"
        :class="['calendar', { show: visible }]"
        :id="'nepali-calendar-' + date_id"
        style="user-select: none"
      >
        <div class="calendar__body">
          <!-- month -->
          <div class="calendar__head">
            <div>
              <button class="calendar__toggle_button" @click="prevYear()">
                <i class="calendar-icon-double-left"></i>
              </button>
              <button
                class="calendar__toggle_button"
                @click="prev()"
                v-if="!showMonth && !showYear"
              >
                <i class="calendar-icon-left"></i>
              </button>
            </div>
            <div class="calendar__header_label">
              <a v-if="!monthSelect">{{ date.format("MMMM") }}</a>
              <a
                class="calendar__header_selector"
                @click.stop="toggleMonth"
                v-if="!showMonth && !showYear && monthSelect"
                >{{ date.format("MMMM") }}</a
              >
              <a v-if="!yearSelect">{{ date.format("YYYY") }}</a>
              <a
                class="calendar__header_selector"
                @click.stop="toggleYear"
                v-if="!showYear && yearSelect"
                >{{ date.format("YYYY") }}</a
              >
              <a v-if="showYear && yearSelect">
                {{ currentPageYears[0] }} ~
                {{ currentPageYears[currentPageYears.length - 1] }}</a
              >
            </div>
            <div>
              <button
                class="calendar__toggle_button"
                @click="next()"
                v-if="!showMonth && !showYear"
              >
                <i class="calendar-icon-right"></i>
              </button>
              <button class="calendar__toggle_button" @click="nextYear()">
                <i class="calendar-icon-double-right"></i>
              </button>
            </div>
          </div>
          <!-- week days -->
          <div class="calendar__container">
            <div v-if="!showMonth && !showYear">
              <!-- days of month -->
              <div class="calendar__weeks">
                <div
                  v-for="(weekday, w) in WEEK_SHORT_EN"
                  :key="w"
                  class="calendar__weekday"
                >
                  {{ weekday }}
                </div>
              </div>
              <div class="calendar__days">
                <div
                  class="calendar__day_spacer"
                  v-for="a in remainingStartDays"
                  v-if="date.year == startingYear && date.month == 0"
                  :key="a"
                ></div>
                <div
                  v-if="remainingStartDays"
                  v-for="(day, d) in prevDays"
                  :key="d + '-prev'"
                  class="calendar__day not_current_month"
                  :title="`${day.year}-${day.month + 1}-${day.day}`"
                  @click="select(day)"
                >
                  <span>{{ day.day }}</span>
                </div>
                <div
                  v-for="(day, d) in days"
                  :key="d + '-current'"
                  class="calendar__day"
                  :class="{ selected: activeDay(day), today: checkToday(day) }"
                  :title="`${day.year}-${day.month + 1}-${day.day}`"
                  @click="select(day)"
                >
                  <span>{{ day.day }}</span>
                </div>
                <div
                  v-if="remainingStartDays"
                  v-for="(day, d) in comingDays"
                  :key="d + '-new'"
                  class="calendar__day not_current_month"
                  :title="`${day.year}-${day.month + 1}-${day.day}`"
                  @click="select(day)"
                >
                  <span>{{ day.day }}</span>
                </div>
                <div
                  class="calendar__day_spacer"
                  v-for="a in remainingEndDays"
                  v-if="date.year == endingYear && date.month == 11"
                  :key="a"
                ></div>
              </div>
            </div>
            <div v-if="showMonth" class="calendar__months" @click.stop>
              <div
                v-for="(month, index) in MONTH_EN"
                class="calendar_month"
                :class="{ selected: activeMonth(index) }"
                @click="selectMonth(index)"
              >
                {{ month }}
              </div>
            </div>
            <div v-if="showYear" class="calendar__years" @click.stop>
              <div
                v-for="year in currentPageYears"
                class="calendar__year"
                :class="{ selected: activeYear(year) }"
                @click="selectYear(year)"
              >
                {{ year }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  NepaliDate,
  MONTH_EN,
  WEEK_SHORT_EN,
  NEPALI_DATE_MAP,
} from "nepali-date-library";

export default {
  name: "NepaliDatepicker",
  props: {
    value: {
      type: String,
      default: "",
    },
    yearSelect: {
      type: Boolean,
      default: true,
    },
    monthSelect: {
      type: Boolean,
      default: true,
    },
    classValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      MONTH_EN,
      WEEK_SHORT_EN,
      date: this.value ? new NepaliDate(this.value) : new NepaliDate(),
      visible: false,
      formatedValue: this.value,
      endDay: null,
      previousEndDay: null,
      comingEndDay: null,
      startMonthValue: null,
      yearValue: this.value
        ? new NepaliDate(this.value).getYear()
        : new NepaliDate().getYear(),
      monthValue: this.value
        ? new NepaliDate(this.value).getMonth()
        : new NepaliDate().getMonth(),
      showMonth: false,
      showYear: false,
      startingYear: NEPALI_DATE_MAP[0].year,
      endingYear: NEPALI_DATE_MAP.length + NEPALI_DATE_MAP[0].year - 1,
      currentYearPage: 0,
      YEARS_PER_PAGE: 10,
      date_id: this.generateRandomId(),
    };
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
    },
    prevDays() {
      if (!(this.date.year == this.startingYear && this.date.month == 0)) {
        NEPALI_DATE_MAP.forEach((yearData) => {
          let c_year = this.date.year;
          let c_month = this.date.month - 1;
          if (this.days[0].month == 0) {
            c_year = c_year - 1;
            c_month = 11;
          }
          if (yearData.year === c_year) {
            yearData.days.forEach((data, index) => {
              if (index === c_month) {
                this.previousEndDay = data;
              }
            });
          }
        });
        return Array(this.previousEndDay)
          .fill(null)
          .map(
            (_, idx) =>
              new NepaliDate(this.date.year, this.date.month - 1, idx + 1)
          )
          .slice(-(this.remainingStartDays ? this.remainingStartDays : 0));
      }

      return [];
    },
    days() {
      NEPALI_DATE_MAP.forEach((yearData) => {
        if (yearData.year === this.date.year) {
          yearData.days.forEach((data, index) => {
            if (index === this.date.month) {
              this.endDay = data;
            }
          });
        }
      });
      return Array(this.endDay)
        .fill(null)
        .map(
          (_, idx) => new NepaliDate(this.date.year, this.date.month, idx + 1)
        );
    },
    comingDays() {
      if (!(this.date.year == this.endingYear && this.date.month == 11)) {
        NEPALI_DATE_MAP.forEach((yearData) => {
          let c_year = this.date.year;
          let c_month = this.date.month + 1;
          if (this.days[0].month == 11) {
            c_year = c_year + 1;
            c_month = 0;
          }
          if (yearData.year === c_year) {
            yearData.days.forEach((data, index) => {
              if (index === c_month) {
                this.comingEndDay = data;
              }
            });
          }
        });
        return Array(this.comingEndDay)
          .fill(null)
          .map(
            (_, idx) =>
              new NepaliDate(this.date.year, this.date.month + 1, idx + 1)
          )
          .slice(0, this.remainingEndDays);
      }
      return [];
    },
    remainingStartDays() {
      const currentDateValue = new NepaliDate(
        this.yearValue,
        this.monthValue,
        1
      );
      WEEK_SHORT_EN.forEach((data, index) => {
        if (currentDateValue.format("DDD") === "Su") {
          this.startMonthValue = 7;
        } else if (currentDateValue.format("DDD") === data) {
          this.startMonthValue = index;
        }
      });

      return this.startMonthValue;
    },
    remainingEndDays() {
      return (
        42 -
        this.days.length -
        (this.remainingStartDays ? this.remainingStartDays : 0)
      );
    },
    currentPageYears() {
      const years = NEPALI_DATE_MAP.map((item) => item.year);
      const startIdx = this.currentYearPage * this.YEARS_PER_PAGE;
      return years.slice(startIdx, startIdx + this.YEARS_PER_PAGE);
    },
    maxYearPages() {
      return Math.ceil(NEPALI_DATE_MAP.length / this.YEARS_PER_PAGE);
    },
  },
  watch: {
    value(newVal) {
      this.formatedValue = newVal;
      this.yearValue = newVal
        ? new NepaliDate(newVal).getYear()
        : new NepaliDate().getYear();
      this.monthValue = newVal
        ? new NepaliDate(newVal).getMonth()
        : new NepaliDate().getMonth();
      this.date = newVal ? new NepaliDate(newVal) : new NepaliDate();
    },
  },
  methods: {
    generateRandomId() {
      return this.random(3) + this.random(3) + this.random(3);
    },
    random(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    },
    toggleYear() {
      this.showYear = !this.showYear;
      this.showMonth = false;

      if (this.showYear) {
        const currentYear = this.date.year;
        const yearIndex = NEPALI_DATE_MAP.findIndex(
          (item) => item.year === currentYear
        );
        this.currentYearPage = Math.floor(yearIndex / this.YEARS_PER_PAGE);
      }
    },
    toggleCalendar(onlyOpen, onlyClose) {
      if (onlyOpen) {
        this.visible = true;
      } else if (onlyClose) {
        this.visible = false;
      } else {
        this.visible = !this.visible;
      }
      if (this.visible) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
        this.reset();
      }
    },
    toggleMonth() {
      this.showMonth = !this.showMonth;
      this.showYear = false;
    },
    next() {
      let _month = this.date.month + 1;
      let _year = this.date.year;
      if (_month > 11) {
        _year++;
        _month = 0;
      }
      if (!(_year + 1 < this.startingYear || _year > this.endingYear)) {
        this.setMonthAndYear(_month, _year);
        this.date = new NepaliDate(_year, _month, 1);
      }
    },
    nextYear() {
      if (this.showYear) {
        if (this.currentYearPage < this.maxYearPages - 1) {
          this.currentYearPage++;
        }
      } else {
        let _month = this.date.month;
        let _year = this.date.year + 1;
        if (!(_year < this.startingYear || _year > this.endingYear)) {
          this.setMonthAndYear(_month, _year);
          this.date = new NepaliDate(_year, _month, 1);
        }
      }
    },
    prev() {
      let _month = this.date.month - 1;
      let _year = this.date.year;
      if (_month < 0) {
        _year--;
        _month = 11;
      }
      if (!(_year < this.startingYear || _year > this.endingYear)) {
        this.setMonthAndYear(_month, _year);
        this.date = new NepaliDate(_year, _month, 1);
      }
    },
    prevYear() {
      if (this.showYear) {
        if (this.currentYearPage > 0) {
          this.currentYearPage--;
        }
      } else {
        let _month = this.date.month;
        let _year = this.date.year - 1;
        if (!(_year < this.startingYear || _year > this.endingYear)) {
          this.setMonthAndYear(_month, _year);
          this.date = new NepaliDate(_year, _month, 1);
        }
      }
    },
    activeDay(dateToCheck) {
      if (!this.modelValue) return false;
      let selectedDate = new NepaliDate(this.modelValue);
      return selectedDate.getTime() === dateToCheck.getTime();
    },
    activeMonth(month) {
      const month2 = this.date.month;
      return month2 == month;
    },
    activeYear(year) {
      const year2 = this.date.year;
      return year2 == year;
    },
    checkToday(dateToCheck) {
      const today = new NepaliDate();
      return (
        dateToCheck.day === today.day &&
        dateToCheck.year === today.year &&
        dateToCheck.month === today.month
      );
    },
    setMonthAndYear(month, year) {
      this.monthValue = month;
      this.yearValue = year;
    },
    selectMonth(month) {
      this.monthValue = month;
      this.date.setMonth(month);
      this.showMonth = false;
    },
    selectYear(year) {
      this.yearValue = year;
      this.date.setYear(year);
      this.showYear = false;
      if (this.monthSelect) {
        this.showMonth = true;
      }
    },
    select(selectedDate, donotToggle) {
      this.date = selectedDate;
      this.formatedValue = this.date.format("YYYY-MM-DD");
      this.$emit("input", this.formatedValue);
      this.$emit("onSelect", this.formatedValue);
      if(donotToggle == null && !donotToggle) this.toggleCalendar();
    },
    updateInputtedValue(donotToggle) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(this.formatedValue)) {
        this.formatedValue = this.modelValue;
      }
      try {
        const val = new NepaliDate(this.formatedValue);
        this.select(val, donotToggle);
      } catch (e) {
        this.formatedValue = this.modelValue;
      }
    },
    handleClickOutside(event) {
      const calendarElement = document.getElementById(
        "nepali-calendar-" + this.date_id
      );
      const inputElement = document.getElementById(
        "nepali-date-input-" + this.date_id
      );

      if (!calendarElement || !inputElement) {
        return;
      }

      const isInsideCalendar = calendarElement.contains(event.target);
      const isInsideInput = inputElement.contains(event.target);

      const clickedElement = event.target;
      const isMonthOrYearClick =
        clickedElement.classList.contains("calendar_month") ||
        clickedElement.classList.contains("calendar__year") ||
        clickedElement.closest(".calendar__months") ||
        clickedElement.closest(".calendar__years");

      if (!isInsideCalendar && !isInsideInput && !isMonthOrYearClick) {
        this.visible = false;
        this.reset();
        if (this.formatedValue != this.modelValue) {
          this.updateInputtedValue(true);
        }
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    reset() {
      this.showMonth = false;
      this.showYear = false;
      this.date = this.modelValue
        ? new NepaliDate(this.modelValue)
        : new NepaliDate();
    },
    resetClear() {
      this.showMonth = false;
      this.showYear = false;
      this.date = new NepaliDate();
      this.$emit("input", "");
      this.$emit("onSelect", "");
      this.toggleCalendar(false, true);
    },
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
/* Date Picker CSS */
.nepali-datepicker {
  font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
    sans-serif;
}
.calendar-input-div {
  position: relative;
}

.calendar-input-div .calendar-input-icon {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  font-size: 16px;
  line-height: 0;
  color: rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  fill: currentColor;
  stroke: currentColor;
  cursor: pointer;
}

.calendar-input-div .calendar-input {
  height: 24px;
  width: 100%;
  z-index: inherit;
  border: 1px solid #9e9e9e;
}

.calendar-input:focus-visible {
  outline: none !important;
  border-color: #717171;
}

.calendar-input-contain-value:hover .calender-icon {
  display: none;
}

.calendar-input-contain-value:hover .calendar-clear-input {
  display: block;
}

.calendar-clear-input {
  display: none;
}

/* Calender CS */
.calendar {
  z-index: 2001;
  position: absolute;
  width: 248px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background: #fff;
  visibility: hidden;
  padding: 6px 12px;
  box-sizing: border-box;
  color: #73879c;
  border: 1px solid #e8e8e8;
}

.calendar__header_label > a {
  color: #73879c;
  text-decoration: none;
}

.calendar > a {
  color: #73879c;
}

.calendar.show {
  visibility: visible;
}

/* Calender Header CSS */
.calendar__head {
  display: flex;
  justify-content: space-between;
  padding: 6.5px 0px;
}

.calendar__header_label {
  display: flex;
  gap: 5px;
}

.calendar__header_label .calendar__header_selector:hover {
  color: #1284e7;
  cursor: pointer;
}

/* Container CSS */
.calendar__day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
}

.calendar__day_spacer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  cursor: default;
}

.calendar__weeks {
  height: 32px;
}

.calendar__day.selected,
.calendar__day.selected.today,
.calendar_month.selected,
.calendar__year.selected {
  background-color: #1284e7 !important;
  color: white !important;
}

.calendar__day.today {
  color: #2a90e9 !important;
}

.calendar__day.not_current_month {
  color: #ccc !important;
  background-color: white !important;
}

.calendar__day:hover,
.calendar__year:hover,
.calendar_month:hover {
  background-color: #f3f9fe;
  color: #73879c;
}

.calendar__weeks,
.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 32px);
  align-items: center;
  text-align: center;
}

.calendar__months {
  display: grid;
  grid-template-columns: repeat(3, 75px);
  align-items: center;
  text-align: center;
}

.calendar__years {
  display: grid;
  grid-template-columns: repeat(2, 110px);
  align-items: center;
  text-align: center;
}

.calendar_month,
.calendar__year {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}

.calendar__year {
  height: 45px;
}

.calendar_month {
  height: 56px;
}

.calendar__days {
  cursor: pointer;
}

.calendar__container {
  font-size: 12px;
}

.calendar__toggle_button {
  border: none;
  background: white;
  cursor: pointer;
  padding: 0 4px;
}

/* Animation CSS */
.calendar-animation-enter-active,
.calendar-animation-leave-active {
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}

.calendar-animation-enter,
.calendar-animation-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

.calendar-animation-enter-to,
.calendar-animation-leave {
  transform: scaleY(1);
  opacity: 1;
}

/* Toggle Icon CSS */
.calendar-icon-left:before,
.calendar-icon-right:before,
.calendar-icon-double-left:before,
.calendar-icon-double-right:before,
.calendar-icon-double-left:after,
.calendar-icon-double-right:after {
  content: "";
  position: relative;
  top: -1px;
  display: inline-block;
  width: 10px;
  height: 10px;
  vertical-align: middle;
  border-style: solid;
  border-color: #73879c;
  border-width: 2px 0 0 2px;
  border-radius: 1px;
  box-sizing: border-box;
  transform-origin: center;
  transform: rotate(-45deg) scale(0.7);
}

.calendar-icon-left:hover::before,
.calendar-icon-right:hover::before,
.calendar-icon-double-left:hover::before,
.calendar-icon-double-right:hover::before,
.calendar-icon-double-left:hover::after,
.calendar-icon-double-right:hover::after {
  border-color: #2a90e9;
}

.calendar-icon-right:before,
.calendar-icon-double-right:before,
.calendar-icon-double-right:after {
  transform: rotate(135deg) scale(0.7);
}

.calendar-icon-double-left:after {
  left: -4px;
}

.calendar-icon-double-right:before {
  right: -4px;
}
</style>
