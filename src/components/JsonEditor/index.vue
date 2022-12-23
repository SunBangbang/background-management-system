<template>
  <div class="node_list">
    <el-card>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eaeaea',color:'#000',padding: '0.9375rem'}" :cell-style="{padding: '0.9375rem'}">
        <el-table-column label="节点id" prop="node_id" width="800" show-overflow-tooltip />
        <!-- <el-table-column label="节点类型" prop="node_type" /> -->
        <el-table-column label="块高" prop="block_height" width="300" />
        <el-table-column label="状态">
          <!-- <template slot-scope="scope"> -->
          <button style="background: #67bf3a;color: #ffffff;border-width: 0px;border-radius: 20px;width: 60px;line-height: 35px;">
            <!-- {{ scope.row.state }} -->
            运行
          </button>
          <!-- </template> -->
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
const tableData = [
  {
    node_id: 'a51g6ag19a84safa8s4g6aa54s5sg498a416g5as4g98a4s9g84as65gg9',
    block_height: '521',
    node_type: '共识',
    state: '1'
  },
  {
    node_id: 'a51g6aga5sg19a8s4g9a84sg98a4s9g8a4s9g8as1586v8af4919a84sg9',
    block_height: '521',
    node_type: '共识',
    state: '1'
  },
  {
    node_id: 'a51g6agag98a4s89ga1sg89as4g9as1g98ags4f9a8sg1a6sg819a84sg9',
    block_height: '521',
    node_type: '共识',
    state: '1'
  },
  {
    node_id: 'a51g6aga2g6a489g41a6s84g9a8s4g15asg98a4g98a1sg6ag419a84sg9',
    block_height: '521',
    node_type: '共识',
    state: '1'
  },
  {
    node_id: 'a51gag498a49sg4a9sg49asg498as1g6a5sg98a4g9as1496ag19a84sg9',
    block_height: '521',
    node_type: '共识',
    state: '1'
  },
  {
    node_id: 'a51g6ag195as1g9a8sg9a8s4g98as1g56asg87asg95as1g6asg4a84sg9',
    block_height: '521',
    node_type: '共识',
    state: '1'
  },
  {
    node_id: 'a51g6ag19a84safa8s4g6aa54s5sg498a416g5as4g98a4s9g84as65gg9',
    block_height: '521',
    node_type: '共识',
    state: '1'
  },
  {
    node_id: 'a51g6aga5sg19a8s4g9a84sg98a4s9g8a4s9g8as1586v8af4919a84sg9',
    block_height: '521',
    node_type: '共识',
    state: '1'
  }
]
export default {
  name: 'NodeList',
  data() {
    return {
      tableData
    }
  }
}
</script>

<style scoped lang="scss">
.node_list {
  padding: 2rem;
}
</style>
<style scoped>
/deep/ .el-table .has-gutter{
  line-height: 2.5rem;
  background: #eaeaea;
  font-size:1.1rem;
}
/deep/  .el-card__body{
  padding: 2.5rem;
}
</style>
