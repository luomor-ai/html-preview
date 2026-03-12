<template>
  <div class="toast-wrap">
    <transition-group name="toast">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="t.type">
        {{ t.msg }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    toasts: { type: Array, default: () => [] }
  }
}
</script>

<style scoped>
.toast-wrap {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.toast {
  padding: 10px 16px;
  border-radius: 8px;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-family: var(--font-ui);
  font-size: 13px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}

.toast.success {
  border-color: var(--success);
  color: var(--success);
}

.toast.error {
  border-color: var(--error);
  color: var(--error);
}

.toast.info {
  border-color: var(--accent);
  color: var(--accent);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
