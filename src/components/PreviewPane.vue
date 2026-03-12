<template>
  <div class="preview-pane">
    <div class="preview-toolbar">
      <button class="device-btn" :class="{ active: device === 'desktop' }" @click="$emit('device-change', 'desktop')" title="桌面">
        🖥
      </button>
      <button class="device-btn" :class="{ active: device === 'tablet' }" @click="$emit('device-change', 'tablet')" title="平板">
        📱
      </button>
      <button class="device-btn" :class="{ active: device === 'mobile' }" @click="$emit('device-change', 'mobile')" title="手机">
        📲
      </button>
      <div class="toolbar-sep"></div>
      <div class="preview-url">preview://local</div>
      <button class="refresh-btn" @click="$emit('refresh')" title="刷新">↻</button>
    </div>
    <div class="preview-frame-wrap" :class="device">
      <iframe ref="frame" :class="'frame-' + device" referrerpolicy="no-referrer"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewPane',
  props: {
    device: {
      type: String,
      default: 'mobile'
    }
  },
  emits: ['device-change', 'refresh'],
  computed: {
    frame() {
      return this.$refs.frame
    }
  }
}
</script>

<style scoped>
.preview-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-toolbar {
  height: 38px;
  padding: 0 12px;
  background: var(--bg-panel);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.device-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-active);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-btn:hover {
  border-color: var(--accent);
}

.device-btn.active {
  border-color: var(--accent);
  background: rgba(124, 106, 255, 0.15);
}

.toolbar-sep {
  width: 1px;
  height: 16px;
  background: var(--border);
  margin: 0 4px;
}

.preview-url {
  flex: 1;
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-code);
}

.refresh-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-active);
  color: var(--text-secondary);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.15s;
}

.refresh-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.preview-frame-wrap {
  flex: 1;
  background: var(--bg-editor);
  overflow: auto;
  display: flex;
  justify-content: center;
  padding: 16px;
}

.frame-desktop {
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
  border-radius: 8px;
}

.frame-tablet {
  width: 768px;
  height: 100%;
  border: none;
  background: #fff;
  border-radius: 8px;
}

.frame-mobile {
  width: 375px;
  height: 100%;
  border: none;
  background: #fff;
  border-radius: 8px;
}
</style>
