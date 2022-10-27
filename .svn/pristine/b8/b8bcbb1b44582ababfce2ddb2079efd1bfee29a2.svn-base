<template>
  <div>
    <!-- form表单区域 -->
    <el-form :inline="true"
             :model="formInline"
             ref="form"
             class="demo-form-inline"
             label-width="100px">
      <div class="filter-container">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item prop='user'
                          label="产品批号">
              <el-input v-model="listQuery.user"
                        placeholder="产品批号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop='region'
                          label="设备名称">
              <el-select v-model="listQuery.region"
                         class="filter-item"
                         placeholder="设备名称">
                <el-option label="区域一"
                           value="shanghai"></el-option>
                <el-option label="区域二"
                           value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"
                  v-show="isAllExpand">
            <el-form-item prop='title'
                          label="科室">
              <el-input v-model="listQuery.title"
                        :placeholder="$t('table.title')"
                        style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :span="8"
                  class="common-el-offset"
                  v-show="!isAllExpand">

            <el-button v-waves
                       class="filter-item"
                       icon="el-icon-refresh-right"
                       @click="handleReset('form')">
              {{ $t('table.reset') }}
            </el-button>
            <el-button v-waves
                       class="filter-item"
                       type="primary"
                       icon="el-icon-search"
                       @click="handleFilter">
              {{ $t('table.search') }}
            </el-button>
            <span @click="isAllExpand = !isAllExpand"
                  class="expandBtn">
              {{isAllExpand? '收起':"展开"}}
              <i :class="!isAllExpand?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="24"
                v-show="isAllExpand">
          <el-col :span="8">
            <el-form-item prop='importance'
                          label="状态">
              <el-select v-model="listQuery.importance"
                         :placeholder="$t('table.importance')"
                         clearable
                         style="width: 120px"
                         class="filter-item">
                <el-option v-for="item in importanceOptions"
                           :key="item"
                           :label="item"
                           :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop='type'
                          label="设备型号">
              <el-select v-model="listQuery.type"
                         :placeholder="$t('table.type')"
                         clearable
                         class="filter-item"
                         style="width: 130px">
                <el-option v-for="item in calendarTypeOptions"
                           :key="item.key"
                           :label="item.displayName+'('+item.key+')'"
                           :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop='sort'
                          label="设备类别">
              <el-select v-model="listQuery.sort"
                         style="width: 140px"
                         class="filter-item"
                         @change="handleFilter">
                <el-option v-for="item in sortOptions"
                           :key="item.key"
                           :label="item.label"
                           :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isAllExpand">
          <el-col :span="8"
                  :offset="16"
                  class="common-el-offset">
            <el-button v-waves
                       class="filter-item"
                       icon="el-icon-refresh-right"
                       @click="handleReset('form')">
              {{ $t('table.reset') }}
            </el-button>
            <el-button v-waves
                       class="filter-item"
                       type="primary"
                       icon="el-icon-search"
                       @click="handleFilter">
              {{ $t('table.search') }}
            </el-button>
            <span @click="isAllExpand = !isAllExpand"
                  class="expandBtn">
              {{isAllExpand? '收起':"展开"}}
              <i :class="!isAllExpand?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
            </span>
          </el-col>
        </el-row>

      </div>
    </el-form>

    <!-- 额外操作区域 -->
    <div class="extraBtn">
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="success"
                 icon="el-icon-edit"
                 @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
      <el-button v-waves
                 class="filter-item"
                 type="danger"
                 icon="el-icon-download"
                 @click="handleFilter">
        {{ $t('table.import') }}
      </el-button>
      <el-button v-waves
                 :loading="downloadLoading"
                 class="filter-item"
                 type="primary"
                 icon="el-icon-download"
                 @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :key="tableKey"
              v-loading="listLoading"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%;"
              @sort-change="sortChange"
              height="500">
      <el-table-column v-for="(item,index) in columns"
                       :key="index"
                       :label="item.title"
                       :width="item.width"
                       align="center">
        <template slot-scope="{row}">
          <span v-show="item.dataIndex !== 'type'">{{ row[item.dataIndex]  }}</span>
          <div v-show="item.dataIndex === 'type'">
            <el-button type="primary"
                       size="mini"
                       @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-if="row.status!=='deleted'"
                       size="mini"
                       type="danger"
                       @click="handleDelete(row, $index)">
              {{ $t('table.delete') }}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList" />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>