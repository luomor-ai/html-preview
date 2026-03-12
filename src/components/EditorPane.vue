<template>
  <div class="editor-pane">
    <div class="pane-header">
      <span class="pane-dot dot-red"></span>
      <span class="pane-dot dot-yellow"></span>
      <span class="pane-dot dot-green"></span>
      <span class="pane-tag">{{ lineCount }} 行 · {{ charCount }} 字符</span>
    </div>
    <div class="editor-wrap">
      <div class="line-numbers" ref="lineNumbers">
        <span v-for="n in lineCount" :key="n" class="ln" :class="{ active: n === cursorLine }">{{ n }}</span>
      </div>
      <textarea
        ref="editor"
        :value="modelValue"
        @input="onInput"
        @scroll="syncScroll"
        @keydown="onKeyDown"
        @click="updateCursor"
        @keyup="updateCursor"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorPane',
  props: {
    modelValue: { type: String, default: '' }
  },
  emits: ['update:modelValue', 'run', 'format', 'copy', 'clear', 'download'],
  data() {
    return {
      cursorLine: 1,
      cursorCol: 1
    }
  },
  computed: {
    lineCount() {
      return this.modelValue.split('\n').length
    },
    charCount() {
      return this.modelValue.length
    }
  },
  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.value)
      this.$emit('run')
    },
    syncScroll() {
      if (this.$refs.lineNumbers && this.$refs.editor) {
        this.$refs.lineNumbers.scrollTop = this.$refs.editor.scrollTop
      }
    },
    updateCursor() {
      if (!this.$refs.editor) return
      const text = this.$refs.editor.value.substring(0, this.$refs.editor.selectionStart)
      const lines = text.split('\n')
      this.cursorLine = lines.length
      this.cursorCol = lines[lines.length - 1].length + 1
    },
    onKeyDown(e) {
      if (e.key === 'Tab') {
        e.preventDefault()
        const start = this.$refs.editor.selectionStart
        const end = this.$refs.editor.selectionEnd
        const val = this.modelValue
        const newVal = val.substring(0, start) + '  ' + val.substring(end)
        this.$emit('update:modelValue', newVal)
        this.$nextTick(() => {
          this.$refs.editor.selectionStart = this.$refs.editor.selectionEnd = start + 2
        })
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        this.$emit('run')
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        this.$emit('download')
      }
    }
  },
  mounted() {
    this.updateCursor()
  }
}
</script>

<style scoped>
.editor-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border);
  min-width: 0;
}

.pane-header {
  height: 38px;
  padding: 0 12px;
  background: var(--bg-panel);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.pane-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot-red {
  background: #ff5f57;
}

.dot-yellow {
  background: #febc2e;
}

.dot-green {
  background: #28c840;
}

.pane-tag {
  margin-left: auto;
  font-size: 11px;
  color: var(--text-muted);
  background: var(--bg-active);
  padding: 2px 8px;
  border-radius: 4px;
}

.editor-wrap {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
}

.line-numbers {
  width: 44px;
  flex-shrink: 0;
  background: var(--bg-editor);
  border-right: 1px solid var(--border);
  padding: 12px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 8px;
}

.ln {
  font-family: var(--font-code);
  font-size: 13px;
  line-height: 1.6;
  color: var(--line-num);
  user-select: none;
}

.ln.active {
  color: var(--accent);
}

textarea {
  flex: 1;
  background: var(--bg-editor);
  border: none;
  outline: none;
  resize: none;
  color: var(--text-primary);
  font-family: var(--font-code);
  font-size: 13px;
  line-height: 1.6;
  padding: 12px;
  tab-size: 2;
  overflow-y: auto;
  overflow-x: auto;
  white-space: pre;
}
</style>
