import { createNamespace, isFunction } from '../utils';
import { formatResult } from '../utils/format/data-source';
import Tab from '../tab';
import Tabs from '../tabs';
import Icon from '../icon';
import Popup from '../popup';
import Field from '../field';
import Search from '../search';

// Mixins
import { FieldMixin } from '../mixins/field';
import DataSourceMixin from '../mixins/DataSource';


const _get = require('lodash/get');

const [createComponent, bem, t] = createNamespace('cascader');

export default createComponent({
  mixins: [FieldMixin, DataSourceMixin],

  props: {
    title: String,
    value: [Number, String],
    fieldNamesp: [Object, String],
    placeholder: { type: String, default: '请选择' },
    activeColor: String,
    converter: {
      type: String,
      default: 'json',
    },
    labelField: {
      type: String,
    },

    closeOnPopstate: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false,
    },
    novalue: {
      type: Boolean,
      default: false,
    },
    notitleblock: {
      type: Boolean,
      default: false,
    },
    inputAlign: String,
    // 筛选
    filterable: {
      type: Boolean,
      default: false,
    },
    treeDisplay: { type: Boolean, default: false }, // 组件内部默认不开启树，兼容老版本
  },

  data() {
    return {
      tabs: [],
      activeTab: 0,
      options: [],
      valuepopup: false,
      curValue: this.value || '',

      filterData: [],
    };
  },

  computed: {
    fieldNames() {
      if (this.fieldNamesp === null || this.fieldNamesp === undefined)
        return {};
      if (typeof this.fieldNamesp === 'string')
        return JSON.parse(this.fieldNamesp || '{}');
      if (typeof this.fieldNamesp === 'object') return this.fieldNamesp;
    },
    textKey() {
      return this.textField || this.fieldNames?.text || 'text';
    },
    valueKey() {
      return this.valueField || this.fieldNames?.value || 'value';
    },
    parentKey() {
      return this.parentField || this.fieldNames?.parentId || 'parentId';
    },
    childrenKey() {
      return this.childrenField || this.fieldNames?.children || 'children';
    },
    flattenData() {
      return this.flattenTree(this.currentData);
    },
  },

  watch: {
    currentData: {
      deep: true,
      handler: 'updateTabs',
    },
    value(val) {
      this.curValue = val;
    },
    curValue(value) {
      if (value || value === 0) {
        const values = this.tabs.map((tab) => {
          if (tab.selectedOption) {
            // return tab.selectedOption?.[this.valueKey];
            return _get(tab.selectedOption, this.valueKey);
          }
          return tab.selectedOption;
        });
        if (values.indexOf(value) !== -1) {
          return;
        }
      }
      this.updateTabs();
    },
  },

  methods: {
    getTitle() {
      const ifDesigner = this.$env && this.$env.VUE_APP_DESIGNER;
      if (ifDesigner) {
        return this.value;
      }
      const selectedOptions =
        this.getSelectedOptionsByValue(this.options, this.curValue) || [];
      const result = selectedOptions
        .map((option) => _get(option, this.textKey))
        .join('/');
      return result;
    },
    getSelectedOptionsByValue(options, value) {
      for (let i = 0; i < options.length; i++) {
        const option = options[i];

        if (_get(option, this.valueKey) === value) {
          return [option];
        }

        if (option[this.childrenKey]) {
          const selectedOptions = this.getSelectedOptionsByValue(
            option[this.childrenKey],
            value
          );
          if (selectedOptions) {
            return [option, ...selectedOptions];
          }
        }
      }
    },
    async updateTabs() {
      this.options = formatResult(this.currentData);

      if (this.curValue || this.curValue === 0) {
        const selectedOptions = this.getSelectedOptionsByValue(
          this.options,
          this.curValue
        );

        if (selectedOptions) {
          let optionsCursor = this.options;

          this.tabs = selectedOptions.map((option) => {
            const tab = {
              options: optionsCursor,
              selectedOption: option,
            };

            const next = optionsCursor.filter(
              (item) =>
                _get(item, this.valueKey) === _get(option, this.valueKey)
            );
            if (next.length) {
              optionsCursor = next[0][this.childrenKey];
            }

            return tab;
          });

          if (optionsCursor) {
            this.tabs.push({
              options: optionsCursor,
              selectedOption: null,
            });
          }

          this.$nextTick(() => {
            this.activeTab = this.tabs.length - 1;
          });

          return;
        }
      }

      this.tabs = [
        {
          options: this.options,
          selectedOption: null,
        },
      ];
    },

    onSelect(option, tabIndex) {
      this.tabs[tabIndex].selectedOption = option;

      if (this.tabs.length > tabIndex + 1) {
        this.tabs = this.tabs.slice(0, tabIndex + 1);
      }

      if (option[this.childrenKey]) {
        const nextTab = {
          options: option[this.childrenKey],
          selectedOption: null,
        };

        if (this.tabs[tabIndex + 1]) {
          this.$set(this.tabs, tabIndex + 1, nextTab);
        } else {
          this.tabs.push(nextTab);
        }

        this.$nextTick(() => {
          this.activeTab++;
        });
      }

      const selectedOptions = this.tabs
        .map((tab) => tab.selectedOption)
        .filter((item) => !!item);

      const eventParams = {
        value: _get(option, this.valueKey),
        tabIndex,
        selectedOptions,
      };
      this.curValue = _get(option, this.valueKey);
      this.$emit('input', _get(option, this.valueKey));
      this.$emit('update:value', _get(option, this.valueKey));
      this.$emit('change', eventParams); // expose

      if (!option[this.childrenKey]) {
        this.$emit('finish', eventParams); // expose
        // if (this.$parent) {
        //   this.$parent.realValue = false;
        // }
        this.togglePopup();
      }
    },

    onSelectFilterItem(option) {
      const eventParams = {
        value: _get(option, this.valueKey),
        tabIndex: option.parents.length,
        selectedOptions: [...option.parents, option],
      };

      this.curValue = _get(option, this.valueKey);
      this.$emit('update:value', _get(option, this.valueKey));
      this.$emit('change', eventParams); // expose
      this.$emit('finish', eventParams); // expose

      this.togglePopup();

      this.filterText = '';
    },

    onClose() {
      this.$emit('close');
    },

    togglePopup() {
      this.valuepopup = !this.valuepopup;
      this.$refs.popforcas.togglePModal();
    },

    // 覆盖mixin
    filter() {},
    onInput(value) {
      this.filterText = value;

      // 设置filterData
      this.filterData = this.flattenData.filter((item) => {
        if (_get(item, this.textKey).indexOf(value) !== -1) {
          return true;
        }

        let isMatch = false;

        for (let i = 0; i < item.parents.length; i++) {
          const parent = item.parents[i];
          if (_get(parent, this.textKey).indexOf(value) !== -1) {
            isMatch = true;
            break;
          }
        }

        return isMatch;
      });
    },

    flattenTree(tree) {
      const result = [];
      const _this = this;

      function traverse(node, parents = []) {
        const children = _get(node, _this.childrenKey);
        if (children?.length) {
          for (let i = 0; i < children.length; i++) {
            traverse(children[i], [...parents, node]);
          }
        } else {
          result.push({ ...node, parents });
        }
      }

      for (let i = 0; i < tree.length; i++) {
        traverse(tree[i]);
      }
      return result;
    },

    renderHeader() {
      return (
        <div class={bem('header')}>
          <h2 class={bem('title')}>{this.slots('title') || this.title}</h2>
          {this.closeable ? (
            <Icon
              name="cross"
              class={bem('close-icon')}
              onClick={this.onClose}
            />
          ) : null}
        </div>
      );
    },

    renderOptions(options, selectedOption, tabIndex) {
      const renderOption = (option) => {
        const isSelected =
          selectedOption &&
          _get(option, this.valueKey) === _get(selectedOption, this.valueKey);
        // option[this.valueKey] === selectedOption[this.valueKey];
        // console.log(option);
        const Text = this.slots('option', { option, selected: isSelected }) || (
          <span>{_get(option, this.textKey)}</span>
        );

        return (
          <li
            class={bem('option', { selected: isSelected })}
            style={{ color: isSelected ? this.activeColor : null }}
            onClick={() => {
              this.onSelect(option, tabIndex);
            }}
          >
            {Text}
            {isSelected ? (
              <Icon name="success" class={bem('selected-icon')} />
            ) : null}
          </li>
        );
      };

      return <ul class={bem('options')}>{options.map(renderOption)}</ul>;
    },

    renderTab(item, tabIndex) {
      const { options, selectedOption } = item;
      const title = selectedOption
        ? _get(selectedOption, this.textKey)
        : this.placeholder || t('select');

      return (
        <Tab
          title={title}
          titleClass={bem('tab', {
            unselected: !selectedOption,
          })}
        >
          {this.renderOptions(options, selectedOption, tabIndex)}
        </Tab>
      );
    },

    renderTabs() {
      if (this.filterText) {
        return (
          <div class={bem('filter')}>
            {this.filterData?.map((item) => (
              <li
                class={bem('filter-option')}
                onClick={() => this.onSelectFilterItem(item)}
              >
                {item.parents.map((p) => (
                  <span>{_get(p, this.textKey)}</span>
                ))}
                <span>{_get(item, this.textKey)}</span>

                <div class="icon">
                  <van-icon name="arrow" color="#999" />
                </div>
              </li>
            ))}
          </div>
        );
      }

      return (
        <Tabs
          vModel={this.activeTab}
          animated
          swipeable
          swipeThreshold={0}
          class={bem('tabs')}
          color={this.activeColor}
        >
          {this.tabs.map(this.renderTab)}
        </Tabs>
      );
    },

    renderSearch() {
      if (!this.filterable) return null;

      return (
        <Search shape="round" value={this.filterText} onInput={this.onInput} />
      );
    },
  },

  render() {
    const tempSlot = {
      title: () => this.slots('title'),
    };
    return (
      <div class={bem('wrapppcascader')}>
        <Field
          label={this.labelField}
          value={this.getTitle()}
          scopedSlots={tempSlot}
          readonly
          isLink={false}
          input-align={this.inputAlign || 'right'}
          onClick={this.togglePopup}
          // eslint-disable-next-line no-prototype-builtins
          notitle={!this.$slots.hasOwnProperty('title')}
          notitleblock={this.notitleblock}
          novalue={this.novalue}
          insel={true}
          nofi={true}
        />
        <Popup
          safe-area-inset-bottom
          round
          ref="popforcas"
          class={bem('popup')}
          position={'bottom'}
          closeOnClickOverlay={this.closeOnClickOverlay}
          // onClickOverlay={this.togglePopup}
          get-container="body" // 放body下不易出现异常情况
        >
          <div class={bem()}>
            {this.renderHeader()}
            {this.renderSearch()}
            {this.renderTabs()}
          </div>
        </Popup>
      </div>
    );
  },
});
