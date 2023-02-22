<template>
  <div class="wrapper">
    <!-- 布局左侧 -->
    <div class="wrapper-left"
         :class="{active: isOpen}"
         style="active">
      <div class="slot-left">
        <slot name="left"></slot>
      </div>
      <div class="switch-btn"
           @click="handleSwitch">
        <i class="el-icon-d-arrow-right"></i>
      </div>
    </div>
    <!-- 布局右侧 -->
    <div class="wrapper-right"
         :class="{active: isOpen}">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainSubLayout',
  data() {
    return {
      isOpen: false // 控制左侧显示隐藏开关
    }
  },
  methods: {
    // 处理开关点击
    handleSwitch() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  // height: calc(100vh - 88px);
  &-left {
    width: 200px;
    background: #fff;
    // border: 1px solid #d9d9d9;
    border-radius: 4px;
    position: relative;
    transition: all 0.3s;
    opacity: 1;
    max-width: 200px;

    .slot-left {
      width: 100%;
      height: 100%;
    }

    &.active {
      border: none;
      width: 0;

      .slot-left {
        max-width: 0;
        transition: all 0.3s;
        opacity: 0;
        pointer-events: 'none';
      }
      .switch-btn {
        left: -10px;
        transform: rotate(180deg);
      }
    }

    .switch-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 10px;
      height: 44px;
      color: #fff;
      background: #0b68e6;
      top: 200px;
      left: 200px;
      cursor: pointer;
      border-radius: 0 10px 10px 0;
      font-size: 10px;
    }
  }

  &-right {
    width: calc(100% - 220px);
    background: #fff;
    border-radius: 4px;
    // border: 1px solid #d9d9d9;

    &.active {
      width: 100%;
    }
  }
}
</style>
