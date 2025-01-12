import { createNamespace, isFunction } from '../utils';
import { formatResult } from '../utils/format/data-source';
import { FieldMixin } from '../mixins/field';
import { ParentMixin } from '../mixins/relation';
import { Converter } from '../mixins/convertor';

const [createComponent, bem] = createNamespace('checkbox-group');

export default createComponent({
  mixins: [
    ParentMixin('vanCheckbox'),
    FieldMixin,
    Converter
  ],

  props: {
    dataSource: [Array, Object, Function, String],
    max: [Number, String],
    min: {
      type: Number,
      default: 0,
    },
    disabled: Boolean,
    direction: String,
    iconSize: [Number, String],
    checkedColor: String,
    value: {
      type: [Array, String],
      default: () => [],
    },
    converter: {
      type: String,
      default: 'json',
    },
    column: {
      type: Number,
    },
  },
  data() {
    return {
      currentValue: [],
      options: [],
    };
  },
  watch: {
    value(val) {
      // 暴露出去的值
      this.$emit(
        'change',
        this.converter !== 'none' ? this.currentConverter.get(val) : val
      );

      this.currentValue =
        this.converter !== 'none' ? this.currentConverter.set(val) : val;
    },
    currentValue(val) {
      let temp = val;
      if (this.converter !== 'none') {
        temp = this.currentConverter.get(val);
      }

      this.$emit('input', temp);
      this.$emit('update:value', temp);
    },
    dataSource: {
      deep: true,
      handler: 'update',
      immediate: true,
    },
  },
  computed: {
    inDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
  },

  mounted() {
    this.currentValue =
      this.converter !== 'none'
        ? this.currentConverter.set(this.value)
        : this.value || [];
  },

  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    fromValue(value) {
      try {
        if (value === undefined || value === null || value === '') return [];
        if (typeof value === 'string') return JSON.parse(value || '[]');
        if (typeof value === 'object') return value;
      } catch (err) {
        return [];
      }
    },
    toValue(value) {
      return Array.isArray(value) && value.length === 0
        ? '[]'
        : JSON.stringify(value);
    },
    // @exposed-api
    toggleAll(options = {}) {
      if (typeof options === 'boolean') {
        options = { checked: options };
      }

      const { checked, skipDisabled } = options;

      const children = this.children.filter((item) => {
        if (item.disabled && skipDisabled) {
          return item.checked;
        }
        return checked ?? !item.checked;
      });

      const names = children.map((item) => item.name);
      this.currentValue = names;
    },
    async update() {
      if (this.ifDesigner() && this.dataSource) {
        this.options = this.dataSource.map((item) => {
          item.disabled = true;
          return item;
        });
      } else if (isFunction(this.dataSource)) {
        try {
          const res = await this.dataSource({
            page: 1,
            size: 1000,
          });
          this.options = formatResult(res);
        } catch (error) {
          console.error(error);
        }
      } else {
        this.options = formatResult(this.dataSource);
      }
    },
  },

  render() {
    // 水平排列时
    let itemWidth = 'auto';
    if (this.column > 0) {
      itemWidth = (100 / this.column) + '%';
    }

    return (
      <div class={bem([this.direction])}>
        {this.options?.map((item, index) => (
          <div
            style={{
              position: 'relative',
              width: itemWidth,
            }}
          >
            {this.slots('item', { item, index })}
            {this.inDesigner && index > 0 && <div class="mantle"></div>}
          </div>
        ))}
        {!this.slots() && this.options?.length === 0 && this.inDesigner && (
          <div style="text-align: center;width:100%">
            请绑定数据源或插入子节点
          </div>
        )}
        {this.slots()}
      </div>
    );
  },
});
