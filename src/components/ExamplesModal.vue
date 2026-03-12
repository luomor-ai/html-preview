<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        选择示例模板
      </div>
      <div class="examples-list">
        <button
          v-for="ex in examples"
          :key="ex.name"
          class="example-btn"
          @mouseenter="$event.target.style.borderColor='var(--accent)'"
          @mouseleave="$event.target.style.borderColor='var(--border)'"
          @click="$emit('select', ex)"
        >
          <div class="example-name">{{ ex.name }}</div>
          <div class="example-desc">{{ ex.desc }}</div>
        </button>
      </div>
      <div class="modal-actions">
        <button class="modal-cancel" @click="$emit('close')">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamplesModal',
  props: {
    examples: { type: Array, default: () => [] }
  },
  emits: ['close', 'select']
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  width: 420px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.examples-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.example-btn {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-active);
  color: var(--text-primary);
  font-family: var(--font-ui);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}

.example-name {
  font-weight: 600;
  margin-bottom: 3px;
}

.example-desc {
  color: var(--text-muted);
  font-size: 12px;
}

.modal-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.modal-cancel {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-ui);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}

.modal-cancel:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
</style>
