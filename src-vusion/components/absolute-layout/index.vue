<template>
    <div :class="$style.root" v-on="$listeners" vusion-slot-name="default">
        <slot></slot>
        <template v-if="(!$slots.default) && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']">
            <div :class="$style.emptyTip">拖入组件放至任意位置</div>
        </template>
    </div>
</template>

<script>

export default {
    name: 'van-absolute-layout',
};
</script>

<style module>
.root {
    position: relative;
    width: 100%;
    height: 300px;
}

.root>* {
    position: absolute !important;
    /* 绝对定位元素需要手动设置下划线的继承 */
    text-decoration: inherit;
}
/* 在编辑器里禁用 transition，防止位置尺寸变化时候出现延迟 */
.root>[vusion-node-path]{
    transition: none !important;
}
.emptyTip {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #999;
}
.emptyTip::before {
    icon-font: url("./assets/drag-in-copy.svg");
    font-size: 12px;
    margin-right: 5px;
    position: relative;
    bottom: 1px;
}
</style>

