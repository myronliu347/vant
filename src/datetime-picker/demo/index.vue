<template>
  <demo-section>
    <!-- <demo-block card :title="t('dateType')">
      <van-datetime-picker
        :value.sync="value.date"
        type="date"
        :title="t('dateType')"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </demo-block>

    <demo-block card :title="t('yearMonthType')">
      <van-datetime-picker
        :value.sync="value.yearMonth"
        type="year-month"
        :title="t('yearMonthType')"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </demo-block>

    <demo-block v-if="!isWeapp" card :title="t('monthDayType')">
      <van-datetime-picker
        :value.sync="value.monthDayType"
        type="month-day"
        :title="t('monthDayType')"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </demo-block>

    <demo-block card :title="t('timeType')">
      <van-datetime-picker
        :value.sync="value.time"
        type="time"
        :title="t('timeType')"
        :min-hour="10"
        :max-hour="20"
      />
    </demo-block> -->
    <demo-block card :title="t('timeType')">
      <van-datetime-picker
        :value.sync="value.time"
        type="time"
        :title="t('timeType')"
        :min-hour="10"
        :max-hour="20"
      />
    </demo-block>
    <demo-block card :title="t('dateType')">
      <van-datetime-picker
        :value.sync="value.date"
        type="date"
        :title="t('dateType')"
      />
    </demo-block>
    <demo-block card :title="t('datetimeType')">
      <van-datetime-picker
        :value.sync="value.datetime"
        type="datetime"
        :title="t('datetimeType')"
      />
    </demo-block>
    <demo-block card :title="t('datetimeType')">
      <van-datetime-picker
        :value.sync="value.datetime"
        type="datetime"
        :title="t('datetimeType')"

        :max-date="maxDate"
      />
    </demo-block>
    <demo-block card :title="t('datetimeType')">
      <van-datetime-picker
    type="datetime"
    title="选择完整时间222"
    label-field="选择时间"
    readonly
  ></van-datetime-picker>
    </demo-block>

    <!-- <demo-block v-if="!isWeapp" card :title="t('datehourType')">
      <van-datetime-picker
        :value.sync="value.datehour"
        type="datehour"
        :title="t('datehourType')"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </demo-block>

    <demo-block card :title="t('optionFilter')">
      <van-datetime-picker
        :value.sync="value.optionFilter"
        type="time"
        :title="t('optionFilter')"
        :filter="filter"
      />
    </demo-block>

    <demo-block v-if="!isWeapp" card :title="t('sortColumns')">
      <van-datetime-picker
        :value.sync="value.sortColumnsDate"
        type="date"
        :title="t('sortColumns')"
        :columns-order="['month', 'day', 'year']"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </demo-block> -->
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      day: '日',
      year: '年',
      month: '月',
      timeType: '选择时间',
      dateType: '选择年月日',
      datetimeType: '选择完整时间',
      datehourType: '选择年月日小时',
      monthDayType: '选择月日',
      yearMonthType: '选择年月',
      optionFilter: '选项过滤器',
      sortColumns: '自定义列排序',
    },
    'en-US': {
      day: ' Day',
      year: ' Year',
      month: ' Month',
      timeType: 'Choose Time',
      dateType: 'Choose Date',
      datetimeType: 'Choose DateTime',
      datehourType: 'Choose DateHour',
      monthDayType: 'Choose Month-Day',
      yearMonthType: 'Choose Year-Month',
      optionFilter: 'Option Filter',
      sortColumns: 'Columns Order',
    },
  },

  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: "2020-12-12 12:12:12" || new Date(2025, 10, 1),
      value: {
        date: "2021-01-13 00:00:00" || new Date(2021, 0, 17),
        time: '12:00',
        datetime: '2022-03-31T07:21:52.066Z',
        datehour: new Date(2020, 0, 1),
        monthDay: new Date(2020, 0, 1),
        yearMonth: new Date(2020, 0, 1),
        optionFilter: '12:00',
        sortColumnsDate: new Date(2020, 0, 1),
      },
    };
  },

  methods: {
    formatter(type, value) {
      if (type === 'year') {
        return value + this.t('year');
      }
      if (type === 'month') {
        return value + this.t('month');
      }
      if (type === 'day') {
        return value + this.t('day');
      }
      return value;
    },

    filter(type, values) {
      if (type === 'minute') {
        return values.filter((value) => value % 5 === 0);
      }

      return values;
    },
  },
};
</script>
