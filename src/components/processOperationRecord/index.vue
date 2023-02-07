<template>
  <el-dialog title="操作记录"
             width="60%"
             top="30px"
             class="commonDialog"
             :visible="processRecordDialogVisible"
             @close="processRecordDialogVisible = false">
    <div class="contentBox">
      <el-table :data="processRecordListData"
                style="width: 100%"
                border>
        <el-table-column prop="nodeName"
                         label="节点名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="operator"
                         label="操作人"
                         width="180">
        </el-table-column>
        <el-table-column prop="auditStatus"
                         label="审核状态"
                         width="180">
        </el-table-column>
        <el-table-column prop="auditmind"
                         label="审批意见">
        </el-table-column>
        <el-table-column prop="operatorTime"
                         label="操作时间">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ moment(scope.row.operatorTime).format('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import moment from 'moment'
@Component({
  name: 'ProcessOperationRecord',
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) processRecordDialogVisible!: boolean
  @Prop({ default: [] }) processRecordListData!: []
  public moment = moment
}
</script>
