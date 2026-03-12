<template>
  <div class="sidebar">
    <div class="sidebar-section">
      <div class="sidebar-label">文件</div>
      <button class="side-btn" @click="$emit('examples')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        示例模板
        <span class="kbd">E</span>
      </button>
      <button class="side-btn" @click="$emit('fetch-xlab', '56')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        加载文章
      </button>
    </div>

    <div class="sidebar-divider"></div>

    <div class="sidebar-section">
      <div class="sidebar-label">工具</div>
      <button class="side-btn" @click="$emit('toggle-auto')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        自动运行：{{ autoRunEnabled ? '开' : '关' }}
      </button>
    </div>

    <div class="sidebar-divider"></div>

    <div class="sidebar-section">
      <div class="sidebar-label">API 接口</div>
      <button class="side-btn" @click="$emit('fetch-xlab', '1')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        获取 HTML
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    autoRunEnabled: {
      type: Boolean,
      default: true
    }
  },
  emits: ['examples', 'toggle-auto', 'fetch-xlab']
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: var(--bg-sidebar);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
}

.sidebar-section {
  padding: 8px;
}

.sidebar-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 8px 8px 4px;
}

.side-btn {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-ui);
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s;
  text-align: left;
}

.side-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.side-btn svg {
  flex-shrink: 0;
}

.side-btn .kbd {
  margin-left: auto;
  font-size: 10px;
  color: var(--text-muted);
  background: var(--bg-active);
  padding: 1px 5px;
  border-radius: 3px;
}

.sidebar-divider {
  height: 1px;
  background: var(--border);
  margin: 6px 8px;
}
</style>
