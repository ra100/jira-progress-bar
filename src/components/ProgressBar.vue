<template>
  <div>
    <div class="progress">
      <div v-if="loading" class="loading">
        Loading...
      </div>
      <div v-else class="progress-inner">
        <div class="done" :style="{width: percentDone}">{{done}}</div>
        <div class="doing" :style="{width: percentDoing}">{{doing}}</div>
        <div class="todo" :style="{width: percentTodo}">{{todo}}</div>
      </div>
    </div>
    <div v-if="error" class="error">{{error}}</div>
    <div class="reload" @click="loadData">Reload</div>
  </div>
</template>

<script>
import jira from '../utils/jira'
import { refreshInterval } from '../../config/config.local'

export default {
  name: 'ProgressBar',
  data() {
    return {
      done: 1,
      doing: 2,
      todo: 3,
      issues: 6,
      error: '',
      loading: false,
      interval: null
    }
  },
  computed: {
    percentDone: function() {
      return `${this.done / this.issues * 100}%`
    },
    percentDoing: function() {
      return `${this.doing / this.issues * 100}%`
    },
    percentTodo: function() {
      return `${this.todo / this.issues * 100}%`
    }
  },
  mounted() {
    this.loadData()
    this.interval = setInterval(this.loadData, refreshInterval)
  },
  unmounted() {
    clearInterval(this.interval)
  },
  methods: {
    loadData() {
      this.loading = true
      this.error = ''
      jira
        .getIssues()
        .then(jira.getSummary)
        .then(({ done, doing, todo }) => {
          this.done = done
          this.doing = doing
          this.todo = todo
          this.issues = done + doing + todo
        })
        .catch(error => {
          console.error(error)
          this.error = error.message
        })
        .then(() => (this.loading = false))
    }
  }
}
</script>

<style scoped lang="scss">
.progress {
  background-color: #ccc;
  display: flex;
  height: 40px;
  width: 100%;
}

.progress-inner {
  flex: 1;
}

.loading {
  flex: 1;
  align-self: center;
  justify-self: center;
}

.done, .doing, .todo {
  align-items: center;
  justify-content: center;
  flex-grow: 2;
  display: flex;
  float: left;
  height: 40px;
}

.done {
  background-color: rgb(98, 203, 118);
}

.doing {
  background-color: rgb(98, 134, 203);
}

.todo {
  background-color: rgb(203, 108, 98);
}

.error {
  background-color: rgb(223, 49, 49);
  text-align: center;
  width: 100%;
}

.reload {
  cursor: pointer;
  float: left;
  border: 1px solid rgb(158, 104, 219);
  padding: 10px;

  &:hover {
    background-color: rgb(158, 104, 219);
  }
}
</style>
