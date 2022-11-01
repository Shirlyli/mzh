<template>
  <el-form ref="dataForm"
           :rules="rules"
           :model="defaultEquipmentInfoData"
           label-position="left"
           label-width="100px">
    <div v-for="(item,index) in formList"
         :key="index">
      <p style="font-size: 18px;">{{Object.keys(item)[0]}}</p>
      <el-row :gutter="20">
        <el-col :span="8"
                v-for="(formitems,i) in Object.values(item)[0]"
                :key="i">
          <el-form-item :label="formitems.label"
                        prop="type">
            <el-input v-model="defaultEquipmentInfoData[formitems.key]" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { equipmentInfoData } from '@/api/equipment'
import {
  equipmentBasicInfo,
  equipmentProperty,
  capitalStructure,
  purchaseInfo,
  biddingInfo,
  contractInfo,
  acceptanceInfo
} from '@/store/formlist/index'
@Component({
  name: 'TabPane'
})
export default class extends Vue {
  @Prop({ default: 'equipmentInfo' }) private type!: string
  private list = null
  private listQuery = {
    page: 1,
    limit: 5,
    type: this.type,
    sort: 'id'
  }

  private defaultEquipmentInfoData = equipmentInfoData // 默认新增模态框数据
  private loading = false
  private formList: any = []
  // 表单映射数组
  created() {
    console.log('🚀 ~ this.type', this.type)

    switch (this.type) {
      case 'equipmentInfo':
        this.formList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ]
        break
      case 'equipmentData':
        this.formList = [
          {
            申购信息: purchaseInfo
          },
          {
            招标信息: biddingInfo
          },
          {
            合同信息: contractInfo
          },
          {
            验收信息: acceptanceInfo
          }
        ]
        break
      case 'purchaseInfo':
        this.formList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ]
        break
      case 'depreciateInfo':
        this.formList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ]
        break
      default:
        console.log('error')
    }
    this.getList()
  }

  // 监听type值变化
  @Watch('type')
  private onTypeChange() {
    console.log('🚀 ~ type', this.type)
  }

  private async getList() {
    this.loading = true
    this.$emit('create') // for test
    const { data } = await getArticles(this.listQuery)
    this.list = data.items
    // Just to simulate the time of the request
    setTimeout(() => {
      this.loading = false
    }, 0.5 * 1000)
  }
}
</script>
