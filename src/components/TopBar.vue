<template>
  <div class="topbar">
    <div class="topbar-logo">
      <div class="logo-icon">&lt;/&gt;</div>
      <span>HTML 预览器</span>
    </div>
    <div class="topbar-sep"></div>
    <div class="topbar-tabs">
      <button class="tab-btn" :class="{ active: activeTab === 'editor' }" @click="activeTab = 'editor'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        编辑器
      </button>
      <button class="tab-btn" :class="{ active: activeTab === 'split' }" @click="activeTab = 'split'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
        分屏
      </button>
      <button class="tab-btn" :class="{ active: activeTab === 'preview' }" @click="activeTab = 'preview'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        预览
      </button>
    </div>
    <div class="topbar-actions">
      <button class="icon-btn" @click="$emit('examples')" title="示例">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </button>
      <button class="icon-btn" @click="$emit('format')" title="格式化">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
      </button>
      <button class="icon-btn" @click="$emit('copy')" title="复制">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>
      <button class="icon-btn" @click="$emit('clear')" title="清空">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
      <div class="topbar-sep"></div>
      <button class="run-btn" @click="$emit('run')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        运行
      </button>
      <button class="icon-btn" @click="$emit('download')" title="下载">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
      <button class="icon-btn" @click="$emit('open-new')" title="新窗口打开">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    activeTab: {
      type: String,
      default: 'split'
    },
    codePath: {
      type: String,
      default: 'index.html'
    }
  },
  emits: ['run', 'format', 'copy', 'clear', 'download', 'open-new', 'examples', 'update:activeTab'],
  computed: {
    activeTab: {
      get() {
        return this.activeTab
      },
      set(val) {
        this.$emit('update:activeTab', val)
      }
    }
  }
}
</script>

<style scoped>
.topbar {
  height: 48px;
  background: var(--bg-panel);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  flex-shrink: 0;
  position: relative;
  z-index: 100;
}

.topbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 15px;
  color: var(--text-primary);
  letter-spacing: -0.3px;
}

.logo-icon {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
}

.topbar-sep {
  width: 1px;
  height: 20px;
  background: var(--border);
  margin: 0 4px;
}

.topbar-tabs {
  display: flex;
  gap: 2px;
  flex: 1;
}

.tab-btn {
  padding: 5px 14px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.tab-btn.active {
  background: var(--bg-active);
  color: var(--text-primary);
}

.tab-btn svg {
  opacity: 0.7;
}

.topbar-actions {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-left: auto;
}

.icon-btn {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  font-size: 13px;
}

.icon-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.run-btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  background: var(--accent);
  color: #fff;
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.18s;
  box-shadow: 0 0 0 0 var(--accent-glow);
}

.run-btn:hover {
  background: #8f7fff;
  box-shadow: 0 0 16px 4px var(--accent-glow);
  transform: translateY(-1px);
}

.run-btn:active {
  transform: translateY(0);
}
</style>
