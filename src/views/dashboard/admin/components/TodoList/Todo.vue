<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo(todo)"
      />
      <label @dblclick="editing = true" v-text="todo.text" />
      <button class="destroy" @click="deleteTodo(todo)" />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, ref } from 'vue';
import { TodoType } from './index.vue';
export default defineComponent({
  name: 'Todo',
  directives: {
    focus(el, { value }) {
      if (value) {
        nextTick(() => {
          el.focus();
        });
      }
    },
  },
  props: {
    todo: {
      type: Object as PropType<TodoType>,
      default: () => ({}),
    },
  },
  emits: ['deleteTodo', 'editTodo', 'toggleTodo'],
  setup(props, context) {
    const editing = ref(false);
    const deleteTodo = (todo: TodoType) => {
      context.emit('deleteTodo', todo);
    };
    const editTodo = ({ todo, value }: { todo: TodoType; value: string }) => {
      context.emit('editTodo', { todo, value });
    };
    const toggleTodo = (todo: TodoType) => {
      context.emit('toggleTodo', todo);
    };
    const doneEdit = (e) => {
      const value = e.target.value.trim();
      if (!value) {
        deleteTodo(props.todo);
        nextTick(() => {
          editing.value = false;
        });
      } else if (editing.value) {
        editTodo({
          todo: props.todo,
          value,
        });
        editing.value = false;
      }
    };
    const cancelEdit = (e) => {
      e.target.value = props.todo.text;
      editing.value = false;
    };

    return {
      editing,
      deleteTodo,
      editTodo,
      toggleTodo,
      doneEdit,
      cancelEdit,
    };
  },
});
</script>
