import { createNamespace } from '../utils';
import { ChildrenMixin } from '../mixins/relation';

const [createComponent, bem] = createNamespace('col');

export default createComponent({
  mixins: [ChildrenMixin('vanRow')],

  props: {
    span: [Number, String],
    offset: [Number, String],
    tag: {
      type: String,
      default: 'div',
    },
  },

  computed: {
    style() {
      const { index } = this;
      const { spaces } = this.parent || {};

      if (spaces && spaces[index]) {
        const { left, right } = spaces[index];
        return {
          paddingLeft: left ? `${left}px` : null,
          paddingRight: right ? `${right}px` : null,
        };
      }
    },
  },

  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },

  render() {
    const { span, offset } = this;
    return (
      <this.tag
        style={this.style}
        class={bem({ [span]: span, [`offset-${offset}`]: offset })}
        onClick={this.onClick}
        empty={!this.$slots.default}
        vusion-slot-name="default"
        allowChild
      >
        {this.slots()}
        {(!this.$slots.default) && (this.$env && this.$env.VUE_APP_DESIGNER) ? <van-empty-col></van-empty-col> : null}
      </this.tag>
    );
  },
});
