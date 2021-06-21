<template>
  <el-table :data="list" style="width: 100%; padding-top: 15px">
    <el-table-column label="Order_No" min-width="200">
      <template #default="scope">
        {{ orderNoFilter(scope.row.order_no) }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template #default="scope">
        ¥{{ scope.row.price }}
        <!-- ¥{{ scope.row.price | toThousandFilter }} -->
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template #default="{ row }">
        <el-tag :type="statusFilter(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search';
import { ref } from 'vue';

export default {
  setup() {
    const list = ref([]);

    const fetchData = () => {
      transactionList().then((response) => {
        list.value = response.data.items.slice(0, 8);
      });
    };

    fetchData();

    const statusFilter = (status) => {
      const statusMap = {
        success: 'success',
        pending: 'danger',
      };
      return statusMap[status];
    };
    const orderNoFilter = (str) => {
      return str.substring(0, 30);
    };

    return {
      list,
      statusFilter,
      orderNoFilter,
    };
  },
};
</script>
