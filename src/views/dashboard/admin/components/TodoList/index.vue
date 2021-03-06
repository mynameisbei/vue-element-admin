<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input
        class="new-todo"
        autocomplete="off"
        placeholder="Todo List"
        @keyup.enter="addTodo"
      />
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input
        id="toggle-all"
        :checked="allChecked"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll({ done: !allChecked })"
      />
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ pluralize('item', remaining) }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a
            :class="{ selected: visibility === key }"
            @click.prevent="visibility = key"
          >
            {{ capitalize(key) }}
          </a>
        </li>
      </ul>
      <!-- <button
        v-show="todos.length > remaining"
        class="clear-completed"
        @click="clearCompleted"
      >
        Clear completed
      </button> -->
    </footer>
  </section>
</template>

<script lang="ts">
import { reactive, ref, computed, defineComponent } from 'vue';
import Todo from './Todo.vue';

export interface TodoType {
  text: string;
  done: boolean;
}

export default defineComponent({
  components: { Todo },
  setup() {
    const STORAGE_KEY = 'todos';
    const visibility = ref('all');
    const filters = reactive({
      all: (todos: TodoType[]) => todos,
      active: (todos: TodoType[]) => todos.filter((todo) => !todo.done),
      completed: (todos: TodoType[]) => todos.filter((todo) => todo.done),
    });
    const todos = ref<TodoType[]>([
      { text: 'star repository', done: false },
      { text: 'fork repository', done: false },
      { text: 'follow author', done: false },
      { text: 'vue-element-admin', done: true },
      { text: 'vue', done: true },
      { text: 'element-ui', done: true },
      { text: 'axios', done: true },
      { text: 'webpack', done: true },
    ]);

    const allChecked = computed(() => {
      return todos.value.every((todo) => todo.done);
    });
    const filteredTodos = computed(() => {
      return filters[visibility.value](todos.value);
    });
    const remaining = computed(() => {
      return todos.value.filter((todo) => !todo.done).length;
    });

    const pluralize = (n, w) => (n === 1 ? w : w + 's');
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const setLocalStorage = () => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    };
    const addTodo = (e) => {
      const text = e.target.value;
      if (text.trim()) {
        todos.value.push({
          text,
          done: false,
        });
        setLocalStorage();
      }
      e.target.value = '';
    };
    const toggleTodo = (val) => {
      val.done = !val.done;
      setLocalStorage();
    };
    const deleteTodo = (todo) => {
      todos.value.splice(todos.value.indexOf(todo), 1);
      setLocalStorage();
    };
    const editTodo = ({ todo, value }) => {
      todo.text = value;
      setLocalStorage();
    };
    const clearCompleted = () => {
      todos.value = todos.value.filter((todo) => !todo.done);
      setLocalStorage();
    };
    const toggleAll = ({ done }) => {
      todos.value.forEach((todo) => {
        todo.done = done;
        setLocalStorage();
      });
    };

    return {
      visibility,
      filters,
      todos,
      allChecked,
      filteredTodos,
      remaining,
      pluralize,
      capitalize,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
      toggleAll,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
