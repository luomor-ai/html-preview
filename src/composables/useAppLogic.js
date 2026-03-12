import { ref, computed, onMounted, watch, nextTick } from 'vue'

const DEFAULT_CODE = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>我的页面</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background: #f0f4f8;
    }
    h1 { color: #2563eb; }
    .card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>👋 欢迎使用 HTML 在线预览器</h1>
    <p>在左侧编辑器中输入你的 HTML 代码，实时预览效果。</p>
    <p>也可以从 <strong>API 接口</strong> 获取 HTML 内容！</p>
  </div>
</body>
</html>`

const EXAMPLES = [
  {
    name: '欢迎页面',
    desc: '基础 HTML 结构示例',
    code: DEFAULT_CODE
  },
  {
    name: '卡片网格',
    desc: '响应式卡片布局',
    code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui; background: #0f172a; color: #e2e8f0; padding: 2rem; }
  h1 { text-align:center; font-size:2rem; margin-bottom:2rem; background:linear-gradient(90deg,#818cf8,#38bdf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:1rem; }
  .card { background:#1e293b; border-radius:16px; padding:1.5rem; border:1px solid #334155; transition:transform 0.2s, box-shadow 0.2s; cursor:pointer; }
  .card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(99,102,241,0.2); border-color:#6366f1; }
  .card-icon { font-size:2rem; margin-bottom:0.8rem; }
  .card h3 { font-size:1rem; margin-bottom:0.4rem; }
  .card p { font-size:0.85rem; color:#94a3b8; }
</style></head>
<body>
  <h1>✨ 卡片展示</h1>
  <div class="grid">
    <div class="card"><div class="card-icon">🚀</div><h3>快速部署</h3><p>一键部署到生产环境，简单高效。</p></div>
    <div class="card"><div class="card-icon">🎨</div><h3>UI 设计</h3><p>精美的用户界面，提升体验。</p></div>
    <div class="card"><div class="card-icon">⚡</div><h3>高性能</h3><p>优化的代码，极速加载。</p></div>
    <div class="card"><div class="card-icon">🔒</div><h3>安全可靠</h3><p>多层安全保护，数据无忧。</p></div>
    <div class="card"><div class="card-icon">📊</div><h3>数据分析</h3><p>实时数据洞察，智能决策。</p></div>
    <div class="card"><div class="card-icon">🌍</div><h3>全球部署</h3><p>多地区服务器，低延迟访问。</p></div>
  </div>
</body></html>`
  },
  {
    name: '登录表单',
    desc: '精美的登录页面设计',
    code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:system-ui; background:linear-gradient(135deg,#667eea,#764ba2); min-height:100vh; display:flex; align-items:center; justify-content:center; }
  .card { background:white; border-radius:20px; padding:40px; width:360px; box-shadow:0 20px 60px rgba(0,0,0,0.3); }
  h2 { font-size:1.6rem; font-weight:700; margin-bottom:6px; color:#1a1a2e; }
  p { color:#888; font-size:0.9rem; margin-bottom:28px; }
  label { display:block; font-size:0.85rem; font-weight:600; color:#444; margin-bottom:6px; }
  input { width:100%; padding:12px 14px; border:2px solid #e8e8e8; border-radius:10px; font-size:0.95rem; outline:none; transition:border-color 0.2s; margin-bottom:18px; }
  input:focus { border-color:#667eea; }
  button { width:100%; padding:13px; background:linear-gradient(135deg,#667eea,#764ba2); color:white; border:none; border-radius:10px; font-size:1rem; font-weight:600; cursor:pointer; transition:opacity 0.2s; }
  button:hover { opacity:0.9; }
  .link { text-align:center; margin-top:16px; font-size:0.85rem; color:#888; }
  .link a { color:#667eea; text-decoration:none; font-weight:600; }
</style></head>
<body>
  <div class="card">
    <h2>欢迎回来 👋</h2>
    <p>请输入您的账号信息登录</p>
    <label>邮箱地址</label>
    <input type="email" placeholder="your@email.com" />
    <label>密码</label>
    <input type="password" placeholder="••••••••" />
    <button>登 录</button>
    <div class="link">还没有账号？<a href="#">立即注册</a></div>
  </div>
</body></html>`
  },
  {
    name: '数据表格',
    desc: '带样式的数据表格',
    code: `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  body { font-family:system-ui; padding:2rem; background:#f8fafc; }
  h2 { color:#1e293b; margin-bottom:1rem; }
  .table-wrap { background:white; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.1); }
  table { width:100%; border-collapse:collapse; }
  th { background:#1e293b; color:white; padding:14px 16px; text-align:left; font-size:0.85rem; letter-spacing:0.5px; }
  td { padding:12px 16px; border-bottom:1px solid #f1f5f9; font-size:0.9rem; }
  tr:last-child td { border:none; }
  tr:hover td { background:#f8fafc; }
  .badge { padding:3px 10px; border-radius:20px; font-size:0.78rem; font-weight:600; }
  .green { background:#dcfce7; color:#16a34a; }
  .red { background:#fee2e2; color:#dc2626; }
  .yellow { background:#fef9c3; color:#ca8a04; }
</style></head>
<body>
  <h2>📊 用户数据表格</h2>
  <div class="table-wrap">
    <table>
      <tr><th>姓名</th><th>邮箱</th><th>角色</th><th>状态</th><th>加入时间</th></tr>
      <tr><td>张伟</td><td>zhang@example.com</td><td>管理员</td><td><span class="badge green">活跃</span></td><td>2023-01-15</td></tr>
      <tr><td>李明</td><td>li@example.com</td><td>编辑</td><td><span class="badge green">活跃</span></td><td>2023-03-22</td></tr>
      <tr><td>王芳</td><td>wang@example.com</td><td>访客</td><td><span class="badge yellow">待审核</span></td><td>2023-06-10</td></tr>
      <tr><td>陈静</td><td>chen@example.com</td><td>用户</td><td><span class="badge red">已禁用</span></td><td>2023-08-05</td></tr>
      <tr><td>刘洋</td><td>liu@example.com</td><td>编辑</td><td><span class="badge green">活跃</span></td><td>2023-11-30</td></tr>
    </table>
  </div>
</body></html>`
  }
]

const INJECT_STYLE = '<style data-injected>img,video,iframe,table{max-width:100%!important;height:auto;box-sizing:border-box;}body{overflow-x:hidden;}</style>'

export function useAppLogic() {
  const code = ref(DEFAULT_CODE)
  const activeTab = ref('split')
  const device = ref('mobile')
  const codePath = ref('index.html')
  const cursorLine = ref(1)
  const cursorCol = ref(1)
  const hasErrors = ref(false)
  const autoRunEnabled = ref(true)
  const showExamples = ref(false)
  const toasts = ref([])

  // API fetch state
  const apiUrl = ref('')
  const apiMethod = ref('GET')
  const apiHeaders = ref([])
  const apiBody = ref('')
  const apiFieldPath = ref('')
  const apiFetching = ref(false)
  const apiStatus = ref(null)

  const editorPane = ref(null)
  const previewPane = ref(null)

  const examples = EXAMPLES
  let debounceTimer = null
  let currentBlobUrl = null

  const lineCount = computed(() => code.value.split('\n').length)

  function showToast(msg, type = 'info', duration = 2500) {
    const id = Date.now()
    toasts.value.push({ id, msg, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
  }

  function injectStyle(html) {
    if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, INJECT_STYLE + '</head>')
    if (/<body/i.test(html)) return html.replace(/<body/i, INJECT_STYLE + '<body')
    return INJECT_STYLE + html
  }

  function runCode() {
    const iframe = previewPane.value?.$el?.querySelector('iframe')
    if (!iframe) return
    try {
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl)
        currentBlobUrl = null
      }
      const blob = new Blob([injectStyle(code.value)], { type: 'text/html; charset=utf-8' })
      currentBlobUrl = URL.createObjectURL(blob)
      iframe.src = currentBlobUrl
      hasErrors.value = false
    } catch (e) {
      hasErrors.value = true
      console.error(e)
    }
  }

  function onInput() {
    if (autoRunEnabled.value) {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(runCode, 600)
    }
  }

  function updateCursor(line, col) {
    cursorLine.value = line
    cursorCol.value = col
  }

  function formatCode() {
    try {
      let result = ''
      let indent = 0
      const lines = code.value.split('\n')
      const SELF_CLOSE = ['meta', 'link', 'br', 'hr', 'img', 'input', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr']
      lines.forEach(rawLine => {
        const line = rawLine.trim()
        if (!line) {
          result += '\n'
          return
        }
        const isClose = line.startsWith('</')
        const isSelfClose = SELF_CLOSE.some(t => line.toLowerCase().startsWith('<' + t))
        const isOpen = line.startsWith('<') && !isClose && !isSelfClose && !line.startsWith('<!') && !line.startsWith('<?')
        if (isClose) indent = Math.max(0, indent - 1)
        result += '  '.repeat(indent) + line + '\n'
        if (isOpen && !line.includes('</') && !line.endsWith('/>')) indent++
      })
      code.value = result.trimEnd()
      showToast('格式化完成', 'success')
    } catch (e) {
      showToast('格式化失败', 'error')
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(code.value).then(() => {
      showToast('已复制到剪贴板', 'success')
    }).catch(() => showToast('复制失败', 'error'))
  }

  function clearCode() {
    code.value = ''
    showToast('已清空', 'info')
  }

  function downloadHtml() {
    const blob = new Blob([code.value], { type: 'text/html; charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = codePath.value || 'index.html'
    a.click()
    showToast('下载成功', 'success')
  }

  function openInNewTab() {
    const blob = new Blob([code.value], { type: 'text/html; charset=utf-8' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 10000)
  }

  function loadExample(ex) {
    code.value = ex.code
    showToast(`已加载：${ex.name}`, 'info')
    nextTick(runCode)
  }

  function getByPath(obj, path) {
    if (!path) return obj
    return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj)
  }

  async function fetchFromApi() {
    if (!apiUrl.value.trim()) {
      showToast('请输入 API 地址', 'error')
      return
    }
    apiFetching.value = true
    apiStatus.value = { type: 'loading', msg: '正在获取...' }
    try {
      const headers = {}
      apiHeaders.value.forEach(h => {
        if (h.key) headers[h.key] = h.val
      })

      const opts = { method: apiMethod.value, headers }
      if (apiMethod.value === 'POST' && apiBody.value) {
        opts.body = apiBody.value
        headers['Content-Type'] = headers['Content-Type'] || 'application/json'
      }

      const res = await fetch(apiUrl.value.trim(), opts)
      const contentType = res.headers.get('content-type') || ''
      let html = ''

      if (contentType.includes('application/json')) {
        const json = await res.json()
        const extracted = getByPath(json, apiFieldPath.value.trim())
        if (typeof extracted === 'string') {
          html = extracted
        } else {
          html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:monospace;background:#1e1e2e;color:#cdd6f4;padding:1rem;}</style></head><body><pre>${JSON.stringify(extracted ?? json, null, 2)}</pre></body></html>`
        }
      } else {
        html = await res.text()
      }

      code.value = html
      apiStatus.value = { type: 'ok', msg: `✓ ${res.status} ${res.statusText} · ${html.length} 字符` }
      showToast('获取成功，已加载到编辑器', 'success')
      nextTick(runCode)
    } catch (e) {
      apiStatus.value = { type: 'err', msg: `✗ ${e.message}` }
      showToast('请求失败：' + e.message, 'error')
    } finally {
      apiFetching.value = false
    }
  }

  async function fetchXlabArticle(id) {
    apiFetching.value = true
    apiStatus.value = { type: 'loading', msg: `正在加载文章 #${id}...` }
    apiUrl.value = `https://xlab.ai-space.net/api/article/preview/${id}`
    apiFieldPath.value = 'data.content'
    try {
      const res = await fetch(`https://xlab.ai-space.net/api/article/preview/${id}`)
      const json = await res.json()
      const html = getByPath(json, 'data.content')
      if (typeof html === 'string' && html.trim()) {
        code.value = html
        apiStatus.value = { type: 'ok', msg: `✓ 文章 #${id} 加载成功 · ${html.length} 字符` }
        showToast(`文章 #${id} 已加载`, 'success')
      } else {
        apiStatus.value = { type: 'err', msg: `✗ 未找到 data.content 字段` }
        showToast('内容字段为空或不存在', 'error')
      }
    } catch (e) {
      apiStatus.value = { type: 'err', msg: `✗ ${e.message}` }
      showToast('加载失败：' + e.message, 'error')
    } finally {
      apiFetching.value = false
      nextTick(() => setTimeout(runCode, 80))
    }
  }

  function startResize(e) {
    const main = e.target.parentElement
    const editorPaneEl = main.querySelector('.editor-pane')
    const previewPaneEl = main.querySelector('.preview-pane')
    const startX = e.clientX
    const startEditorW = editorPaneEl.offsetWidth
    const startPreviewW = previewPaneEl.offsetWidth
    const total = startEditorW + startPreviewW

    function onMove(ev) {
      const dx = ev.clientX - startX
      const newEW = Math.max(200, Math.min(total - 200, startEditorW + dx))
      editorPaneEl.style.flex = 'none'
      editorPaneEl.style.width = newEW + 'px'
      previewPaneEl.style.flex = '1'
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  onMounted(() => {
    const params = new URLSearchParams(window.location.search)
    const xlabId = params.get('xlab')
    if (xlabId) {
      fetchXlabArticle(xlabId)
    } else {
      nextTick(() => setTimeout(runCode, 80))
    }
  })

  watch(activeTab, () => {
    nextTick(() => setTimeout(runCode, 50))
  })

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
    onInput,
    updateCursor,
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
