// Utils
import { createNamespace, isDef } from '../utils';
import { lockClick } from './lock-click';

// Mixins
import { PopupMixin } from '../mixins/popup';

// Components
import Icon from '../icon';
import Loading from '../loading';

const [createComponent, bem] = createNamespace('toast-group');

export default createComponent({
  mixins: [PopupMixin()],

  props: {
    icon: String,
    className: null,
    iconPrefix: String,
    loadingType: String,
    forbidClick: Boolean,
    closeOnClick: Boolean,
    maxCount: { type: Number, default: 3 },
    message: [Number, String],
    type: {
      type: String,
      default: 'text',
    },
    position: {
      type: String,
      default: 'top-center',
    },
    transition: {
      type: String,
      default: 'van-fade',
    },
    lockScroll: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      clickable: false,
      items: [],
    };
  },

  mounted() {
    if (this.position !== 'static') {
      const container =
        window.LcapMicro && window.LcapMicro.appendTo
          ? window.LcapMicro.appendTo
          : document.body;
      container.appendChild(this.$el);
    }
  },
  destroyed() {
    if (this.position !== 'static') {
      const container =
        window.LcapMicro && window.LcapMicro.appendTo
          ? window.LcapMicro.appendTo
          : document.body;
      container.removeChild(this.$el);
    }
  },

  // mounted() {
  //   this.toggleClickable();
  // },

  // destroyed() {
  //   this.toggleClickable();
  // },

  // watch: {
  //   value: 'toggleClickable',
  //   forbidClick: 'toggleClickable',
  // },

  methods: {
    onClick(item) {
      return () => {
        if (item.closeOnClick) {
          this.close(item);
        }
      };
    },

    toggleClickable(clickable) {
      if (this.clickable !== clickable) {
        this.clickable = clickable;
        lockClick(clickable);
      }
    },

    show(item) {
      if (!this.$el) this.$mount(document.createElement('div')); // Vue 加载完成后，触发某一事件后，先执行methods，再执行watch方法，会导致标签显示异常
      this.$nextTick(() => {
        this.open(item);
      });

      if (item.forbidClick) {
        this.toggleClickable(true);
      }

      item.clear = () => {
        this.close(item);
      };
      return item;
    },
    open(item) {
      let { maxCount } = this;
      if (this.single) maxCount = 1;
      if (this.items.length >= maxCount) this.close(this.items[0]);

      this.items.push(item);
      if (item.duration || item.duration === Infinity) {
        setTimeout(() => {
          this.close(item);
        }, item.duration);
      }
      this.$emit('open', item, this);
    },
    close(item) {
      const index = this.items.indexOf(item);
      if (!~index) return;

      if (item.forbidClick) {
        this.toggleClickable(false);
      }

      let cancel = false;
      this.$emit(
        'before-close',
        {
          preventDefault: () => {
            cancel = true;
          },
          ...item,
        },
        this
      );
      if (cancel) return;
      this.items.splice(index, 1);
      this.$emit('close', item, this);
    },

    /* istanbul ignore next */
    // onAfterEnter(item) {
    //   this.$emit('opened');

    //   if (this.onOpened) {
    //     this.onOpened(item);
    //   }
    // },

    // onAfterLeave() {
    //   this.$emit('closed');
    // },

    genIcon(item) {
      const { icon, type, iconPrefix, loadingType } = item;
      const hasIcon = icon || type === 'success' || type === 'fail';

      if (hasIcon) {
        return (
          <Icon
            class={bem('item__icon')}
            classPrefix={iconPrefix}
            name={icon || type}
          />
        );
      }

      if (type === 'loading') {
        return <Loading class={bem('item__loading')} type={loadingType} />;
      }
    },

    genMessage(item) {
      const { type, message } = item;

      if (!isDef(message) || message === '') {
        return;
      }

      if (type === 'html') {
        return <div class={bem('item__html')} domPropsInnerHTML={message} />;
      }

      return <div class={bem('item__text')}>{message}</div>;
    },
  },

  render() {
    const items = this.items.map((item) => (
      <div
        key={item.timestamp}
        class={bem('item', [{ [item.type]: !item.icon }])}
        onClick={this.onClick(item)}
      >
        {this.genIcon(item)}
        {this.genMessage(item)}
      </div>
    ));
    return (
      <transition-group
        tag="div"
        class={bem()}
        moveClass="animate__move"
        enterActiveClass="animate__animated animate__fadeInUpSmall"
        leaveActiveClass="animate__animated animate__fadeOutUpSmall fast animate__list-leave-active"
        // onAfterEnter={this.onAfterEnter}
        // onAfterLeave={this.onAfterLeave}
      >
        {items}
      </transition-group>
    );
  },

  // render1() {
  //   return (
  //     <transition
  //       name={this.transition}
  //       onAfterEnter={this.onAfterEnter}
  //       onAfterLeave={this.onAfterLeave}
  //     >
  //       <div
  //         vShow={this.value}
  //         class={[
  //           bem([this.position, { [this.type]: !this.icon }]),
  //           this.className,
  //         ]}
  //         onClick={this.onClick}
  //       >
  //         {this.genIcon()}
  //         {this.genMessage()}
  //       </div>
  //     </transition>
  //   );
  // },
});