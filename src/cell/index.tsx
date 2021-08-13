// Utils
import { createNamespace, isDef } from '../utils';
import { emit, inherit } from '../utils/functional';
import { routeProps, RouteProps, functionalRoute } from '../utils/router';
import { cellProps, SharedCellProps } from './shared';

// Components
import Icon from '../icon';

// Types
import { CreateElement, RenderContext } from 'vue/types';
import { ScopedSlot, DefaultSlots } from '../utils/types';
import { Mods } from '../utils/create/bem';

export type CellProps = RouteProps & SharedCellProps;

export type CellSlots = DefaultSlots & {
  icon?: ScopedSlot;
  title?: ScopedSlot;
  label?: ScopedSlot;
  extra?: ScopedSlot;
  'right-icon'?: ScopedSlot;
};

export type CellEvents = {
  onClick?(event: Event): void;
};

const [createComponent, bem] = createNamespace('cell');

function Cell(
  h: CreateElement,
  props: CellProps,
  slots: CellSlots,
  ctx: RenderContext<CellProps>
) {
  const { icon, size, title, label, value, isLink } = props;
  const showTitle = slots.title || isDef(title);

  function Label() {
    const showLabel = slots.label || isDef(label);

    if (showLabel) {
      return (
        <div class={[bem('label'), props.labelClass]}>
          {slots.label ? slots.label() : label}
        </div>
      );
    }
  }

  function Title() {
    if (showTitle) {
      return (
        <div class={[bem('title'), props.titleClass]} style={props.titleStyle}>
          {slots.title ? slots.title() : <span>{title}</span>}
          {Label()}
        </div>
      );
    }
  }

  function Value() {
    const showValue = slots.default || isDef(value);

    if (showValue) {
      return (
        <div class={[bem('value', { alone: !showTitle }), props.valueClass]}>
          {slots.default ? slots.default() : <span>{value}</span>}
        </div>
      );
    }
  }

  function LeftIcon() {
    if (slots.icon) {
      return slots.icon();
    }

    if (icon) {
      return (
        <Icon
          class={bem('left-icon')}
          name={icon}
          classPrefix={props.iconPrefix}
        />
      );
    }
  }

  function RightIcon() {
    const rightIconSlot = slots['right-icon'];

    if (rightIconSlot) {
      return rightIconSlot();
    }

    if (isLink) {
      const { arrowDirection } = props;

      return (
        <Icon
          class={bem('right-icon')}
          name={arrowDirection ? `arrow-${arrowDirection}` : 'arrow'}
        />
      );
    }
  }

  function currentHref() {
    if (props.href !== undefined)
        return props.href;
    if (props.destination !== undefined)
        return props.destination;
    else if (ctx.parent?.$router && props.to !== undefined)
        return ctx.parent?.$router.resolve(props.to, ctx.parent?.$route, props.append).href;
    else
        return undefined;
  }

  function onClick(event: Event) {
    emit(ctx, 'click', event);

    if (!props.href && !ctx.listeners.click) {
      event.preventDefault();
    }
    // @ts-ignore：没办法
    if (props.target !== '_self')
      return;

    let to;
    if (props.destination) {
        // 只处理/a/b形式的链接
        const origin = window.location.origin;
        const path = window.location.href.replace(origin, '').split('/');
        const destination = props.destination.replace(origin, '').split('/');
        if (path[1] === destination[1]) {
            to = '/' + destination.slice(2).join('/');
        } else {
            return;
        }
    }


    const currentTo = to || props.to;
    if (currentTo === undefined)
        return;
    let cancel = false;
    emit(ctx, 'before-navigate',  {
      to: currentTo,
      replace: props.replace,
      append: props.append,
      preventDefault: () => (cancel = true),
    });
  if (cancel)
      return;
  const $router = ctx.parent?.$router;
  const $route = ctx.parent?.$route;
  const { location } = $router.resolve(
      currentTo,
      $route,
      props.append,
  );
  props.replace ? $router.replace(location) : $router.push(location);

  emit(ctx, 'navigate',  { to: currentTo, replace: props.replace, append: props.append });
    // functionalRoute(ctx);
  }

  const clickable = props.clickable ?? isLink;

  const classes: Mods = {
    clickable,
    center: props.center,
    required: props.required,
    borderless: !props.border,
  };

  if (size) {
    classes[size] = size;
  }

  return (
    <div
      class={bem(classes)}
      role={clickable ? 'button' : null}
      tabindex={clickable ? 0 : null}
      href={currentHref()}
      onClick={onClick}
      {...inherit(ctx)}
    >
      {LeftIcon()}
      {Title()}
      {Value()}
      {RightIcon()}
      {slots.extra?.()}
    </div>
  );
}

Cell.props = {
  ...cellProps,
  ...routeProps,
};

export default createComponent<CellProps, CellEvents, CellSlots>(Cell);
