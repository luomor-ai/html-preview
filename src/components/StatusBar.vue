<template>
  <div class="statusbar">
    <div class="status-item">
      <div class="status-dot" :class="{ warn: hasErrors }"></div>
      {{ hasErrors ? '有错误' : '就绪' }}
    </div>
    <div class="status-item">行 {{ cursorLine }} · 列 {{ cursorCol }}</div>
    <div class="status-item">{{ lineCount }} 行</div>
    <div class="status-item">{{ charCount }} 字符</div>
    <div class="status-item status-sep">UTF-8</div>
    <div class="status-item">HTML</div>
    <div class="status-item">{{ autoRunEnabled ? '自动运行 ✓' : '手动运行' }}</div>
  </div>
</template>

<script>
export default {
  name: 'StatusBar',
  props: {
    hasErrors: { type: Boolean, default: false },
    cursorLine: { type: Number, default: 1 },
    cursorCol: { type: Number, default: 1 },
    lineCount: { type: Number, default: 1 },
    charCount: { type: Number, default: 0 },
    autoRunEnabled: { type: Boolean, default: true }
  }
}
</script>

<style scoped>
.statusbar {
  height: 28px;
  background: var(--bg-panel);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 16px;
  font-size: 11px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
}

.status-dot.warn {
  background: var(--warning);
}

.status-sep {
  margin-left: auto;
  color: var(--text-muted);
}
</style>
