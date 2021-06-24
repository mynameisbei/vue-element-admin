<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { message } from '@/utils';

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
        };
      },
    },
  },
  setup() {
    const submit = () => {
      message.success({
        message: 'User information has been updated successfully',
        duration: 5 * 1000,
      });
    };

    return {
      submit,
    };
  },
};
</script>
