<template>
  <div class="app">
    <!-- TOP BAR -->
    <TopBar
      v-model:activeTab="activeTab"
      :codePath="codePath"
      @run="runCode"
      @format="formatCode"
      @copy="copyCode"
      @clear="clearCode"
      @download="downloadHtml"
      @open-new="openInNewTab"
      @examples="showExamples = true"
    />

    <div class="main">
      <!-- SIDEBAR -->
      <Sidebar
        @examples="showExamples = true"
        @toggle-auto="autoRunEnabled = !autoRunEnabled"
        :autoRunEnabled="autoRunEnabled"
        @fetch-xlab="fetchXlabArticle"
      />

      <!-- API PANEL -->
      <ApiPanel
        v-model:url="apiUrl"
        v-model:method="apiMethod"
        v-model:headers="apiHeaders"
        v-model:body="apiBody"
        v-model:fieldPath="apiFieldPath"
        :fetching="apiFetching"
        :status="apiStatus"
        @fetch="fetchFromApi"
      />

      <!-- EDITOR PANE -->
      <EditorPane
        ref="editorPane"
        v-model:code="code"
        @run="runCode"
        @format="formatCode"
        @copy="copyCode"
        @clear="clearCode"
      />

      <!-- RESIZE HANDLE -->
      <div v-if="activeTab === 'split'" class="resize-handle" @mousedown="startResize"></div>

      <!-- PREVIEW PANE -->
      <PreviewPane
        v-show="activeTab !== 'editor'"
        ref="previewPane"
        :device="device"
        @device-change="device = $event"
        @refresh="runCode"
      />
    </div>

    <!-- STATUS BAR -->
    <StatusBar
      :hasErrors="hasErrors"
      :cursorLine="cursorLine"
      :cursorCol="cursorCol"
      :lineCount="lineCount"
      :charCount="code.length"
      :autoRunEnabled="autoRunEnabled"
    />

    <!-- EXAMPLES MODAL -->
    <ExamplesModal
      v-if="showExamples"
      :examples="examples"
      @close="showExamples = false"
      @select="loadExample"
    />

    <!-- TOAST -->
    <Toast :toasts="toasts" />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import Sidebar from './components/Sidebar.vue'
import ApiPanel from './components/ApiPanel.vue'
import EditorPane from './components/EditorPane.vue'
import PreviewPane from './components/PreviewPane.vue'
import StatusBar from './components/StatusBar.vue'
import ExamplesModal from './components/ExamplesModal.vue'
import Toast from './components/Toast.vue'

import { useAppLogic } from './composables/useAppLogic'

export default {
  name: 'App',
  components: {
    TopBar,
    Sidebar,
    ApiPanel,
    EditorPane,
    PreviewPane,
    StatusBar,
    ExamplesModal,
    Toast
  },
  setup() {
    const {
      code,
      activeTab,
      device,
      codePath,
      cursorLine,
      cursorCol,
      lineCount,
      hasErrors,
      autoRunEnabled,
      showExamples,
      toasts,
      examples,
      apiUrl,
      apiMethod,
      apiHeaders,
      apiBody,
      apiFieldPath,
      apiFetching,
      apiStatus,
      editorPane,
      previewPane,
      runCode,
      formatCode,
      copyCode,
      clearCode,
      downloadHtml,
      openInNewTab,
      loadExample,
      fetchFromApi,
      fetchXlabArticle,
      startResize
    } = useAppLogic()

    return {
      code,
      activeTab,
      device,
      codePath,
      cursorLine,
      cursorCol,
      lineCount,
      hasErrors,
      autoRunEnabled,
      showExamples,
      toasts,
      examples,
      apiUrl,
      apiMethod,
      apiHeaders,
      apiBody,
      apiFieldPath,
      apiFetching,
      apiStatus,
      editorPane,
      previewPane,
      runCode,
      formatCode,
      copyCode,
      clearCode,
      downloadHtml,
      openInNewTab,
      loadExample,
      fetchFromApi,
      fetchXlabArticle,
      startResize
    }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  font-family: var(--font-ui);
  background: var(--bg-base);
  color: var(--text-primary);
}

.main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.resize-handle {
  width: 4px;
  background: var(--bg-panel);
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  cursor: col-resize;
  flex-shrink: 0;
  transition: background 0.15s;
}

.resize-handle:hover {
  background: var(--accent);
}
</style>
