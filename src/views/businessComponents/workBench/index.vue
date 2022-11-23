<template>
  <div class="app-container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>待办事项</span>
      </div>
      <div class="todoBox">
        <div v-for="o in toDoList"
             :key="o"
             class="item"
             :style="{border:`1px solid ${o.bgcolor}` }">
          <div class="itemContent">
            <div class="contentLeft"
                 :style="{backgroundColor:o.bgcolor}"> <i :class="o.icon"
                 :style='{color:o.color,}'></i></div>
            <div class="contentRight">
              <span class="title">{{o.title}}</span>
              <span class="count">{{o.count}}</span>
            </div>
          </div>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'WorkBench',
})
export default class extends Vue {
  private listLoading = true

  private toDoList = [
    {
      title: '维修派工',
      count: 22,
      icon: 'el-icon-user-solid',
      color: '#FBA529',
      bgcolor: 'rgba(251, 165, 41, 0.1)',
    },
    {
      title: '维修派工',
      count: 22,
      icon: 'el-icon-user-solid',
      color: 'rgb(129,214,83)',
      bgcolor: 'rgb(242, 250, 237)',
    },
    {
      title: '维修派工',
      count: 22,
      icon: 'el-icon-user-solid',
      color: 'rgb(11,104,230)',
      bgcolor: 'rgba(230, 239, 252)',
    },
    {
      title: '维修派工',
      count: 22,
      icon: 'el-icon-user-solid',
      color: 'rgb(11,104,230)',
      bgcolor: 'rgba(230, 239, 252)',
    },
    {
      title: '维修派工',
      count: 22,
      icon: 'el-icon-user-solid',
      color: 'rgb(11,104,230)',
      bgcolor: 'rgba(230, 239, 252)',
    },
  ]
}
</script>

<style lang="scss" scoped>
.todoBox {
  display: flex;
  justify-content: space-between;

  .item {
    width: 220px;
    padding: 22px;
    // border: 1px solid #888;
    .itemContent {
      width: 100%;
      display: flex;
      align-content: center;
      align-items: center;

      .contentLeft {
        width: 50px;
        border-radius: 50%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 30px;
          text-align: center;
        }
      }

      .contentRight {
        flex: 1;
        margin-left: 12px;
        span {
          display: block;
        }
        .title {
          font-size: 22px;
        }

        .count {
          margin-top: 12px;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
