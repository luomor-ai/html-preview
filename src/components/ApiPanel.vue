<template>
  <div class="api-panel">
    <div class="api-panel-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      API 获取 HTML
    </div>

    <div class="api-input-row">
      <select v-model="localMethod" class="method-sel">
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>
      <input v-model="localUrl" type="text" class="api-input" placeholder="API 地址..." />
    </div>

    <div class="headers-toggle" @click="showHeaders = !showHeaders">
      <span>{{ showHeaders ? '▼' : '▶' }} 请求头</span>
    </div>

    <div v-if="showHeaders" class="headers-list">
      <div v-for="(header, idx) in localHeaders" :key="idx" class="header-row">
        <input v-model="header.key" type="text" class="header-input" placeholder="Header 名" style="flex:1" />
        <input v-model="header.val" type="text" class="header-input" placeholder="值" style="flex:2" />
        <button class="del-btn" @click="localHeaders.splice(idx, 1)">×</button>
      </div>
      <button class="add-header-btn" @click="localHeaders.push({ key: '', val: '' })">+ 添加请求头</button>
    </div>

    <div v-if="localMethod === 'POST' || localMethod === 'PUT'" class="api-body-row">
      <textarea v-model="localBody" class="api-body-input" placeholder="请求体 (JSON)..." rows="2"></textarea>
    </div>

    <div class="api-field-row">
      <input v-model="localFieldPath" type="text" class="api-input" placeholder="JSON 字段路径 (如：data.content)" />
    </div>

    <button class="fetch-btn" @click="$emit('fetch')" :disabled="fetching">
      <svg v-if="fetching" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
      <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
      {{ fetching ? '获取中...' : '获取并加载' }}
    </button>

    <div v-if="status" class="fetch-status" :class="status.type">
      <span v-if="status.type === 'ok'">✓</span>
      <span v-else-if="status.type === 'err'">✗</span>
      <span v-else>⏳</span>
      {{ status.msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiPanel',
  props: {
    url: { type: String, default: '' },
    method: { type: String, default: 'GET' },
    headers: { type: Array, default: () => [] },
    body: { type: String, default: '' },
    fieldPath: { type: String, default: '' },
    fetching: { type: Boolean, default: false },
    status: { type: Object, default: null }
  },
  emits: ['fetch', 'update:url', 'update:method', 'update:headers', 'update:body', 'update:fieldPath'],
  data() {
    return {
      showHeaders: false
    }
  },
  computed: {
    localUrl: {
      get() { return this.url },
      set(val) { this.$emit('update:url', val) }
    },
    localMethod: {
      get() { return this.method },
      set(val) { this.$emit('update:method', val) }
    },
    localHeaders: {
      get() { return this.headers },
      set(val) { this.$emit('update:headers', val) }
    },
    localBody: {
      get() { return this.body },
      set(val) { this.$emit('update:body', val) }
    },
    localFieldPath: {
      get() { return this.fieldPath },
      set(val) { this.$emit('update:fieldPath', val) }
    }
  }
}
</script>

<style scoped>
.api-panel {
  width: 220px;
  padding: 12px;
  background: var(--bg-sidebar);
}

.api-panel-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--accent-2);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.api-input-row {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.method-sel {
  padding: 7px 8px;
  background: var(--bg-active);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--accent-2);
  font-family: var(--font-code);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
}

.api-input {
  flex: 1;
  padding: 7px 10px;
  background: var(--bg-active);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-primary);
  font-family: var(--font-code);
  font-size: 11px;
  outline: none;
  transition: border-color 0.15s;
}

.api-input:focus {
  border-color: var(--accent);
}

.api-input::placeholder {
  color: var(--text-muted);
}

.headers-toggle {
  font-size: 11px;
  color: var(--text-muted);
  cursor: pointer;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
}

.headers-toggle:hover {
  color: var(--text-secondary);
}

.headers-list {
  margin-bottom: 8px;
}

.header-row {
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
}

.header-input {
  flex: 1;
  padding: 5px 7px;
  background: var(--bg-base);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-primary);
  font-family: var(--font-code);
  font-size: 10px;
  outline: none;
}

.del-btn {
  width: 22px;
  height: 22px;
  margin-top: 2px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.del-btn:hover {
  background: rgba(231, 76, 60, 0.2);
  color: var(--error);
}

.add-header-btn {
  font-size: 11px;
  color: var(--accent);
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 0;
}

.add-header-btn:hover {
  color: #8f7fff;
}

.api-body-row {
  margin-bottom: 8px;
}

.api-body-input {
  width: 100%;
  padding: 7px 10px;
  background: var(--bg-base);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-primary);
  font-family: var(--font-code);
  font-size: 11px;
  outline: none;
  resize: vertical;
}

.api-field-row {
  margin-bottom: 8px;
}

.fetch-btn {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-active);
  color: var(--accent-2);
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.15s;
}

.fetch-btn:hover {
  background: rgba(0, 212, 170, 0.1);
  border-color: var(--accent-2);
}

.fetch-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fetch-status {
  font-size: 11px;
  margin-top: 6px;
  padding: 5px 8px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.fetch-status.ok {
  background: rgba(46, 204, 113, 0.1);
  color: var(--success);
}

.fetch-status.err {
  background: rgba(231, 76, 60, 0.1);
  color: var(--error);
}

.fetch-status.loading {
  background: rgba(124, 106, 255, 0.1);
  color: var(--accent);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
