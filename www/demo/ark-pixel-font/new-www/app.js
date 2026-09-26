const storageKey = 'ark-pixel-font:www:settings'
const localeToFlavor = {
    en: 'latin',
    'zh-Hans': 'zh_hans',
    'zh-Hant': 'zh_hant',
    'zh-HK': 'zh_hk',
    'zh-TW': 'zh_tw',
    ja: 'ja',
    ko: 'ko',
}
const defaults = {
    fontSize: '12',
    widthMode: 'proportional',
    locale: 'zh-Hans',
    atlasSize: '12',
    atlasWidth: 'proportional',
}
let settings = { ...defaults }
try {
    settings = { ...settings, ...JSON.parse(localStorage.getItem(storageKey) || '{}') }
} catch {
    settings = { ...defaults }
}

const input = document.querySelector('#playground-input')
const localeSelect = document.querySelector('#locale-select')
const charCount = document.querySelector('#char-count')
const fontStatus = document.querySelector('#font-status')
const glyphGrid = document.querySelector('#glyph-grid')
const glyphResult = document.querySelector('#glyph-result')
const glyphSearch = document.querySelector('#glyph-search')
const alphabetLink = document.querySelector('#alphabet-link')
let alphabet = ''

const fontFamily = (size, width, locale) => `ark-${size}-${width}-${localeToFlavor[locale]}`
const fontUrl = (size, width, locale) => `fonts/ark-pixel-${size}px-${width}-${localeToFlavor[locale]}.otf.woff2`

function ensureFont(size, width, locale) {
    const family = fontFamily(size, width, locale)
    if ([...document.fonts].some(font => font.family === family)) return family
    const face = new FontFace(family, `url("${fontUrl(size, width, locale)}") format("woff2")`)
    document.fonts.add(face)
    face.load().catch(() => undefined)
    return family
}

function saveSettings() {
    localStorage.setItem(storageKey, JSON.stringify(settings))
}

function updateButtons() {
    document.querySelectorAll('[data-setting]').forEach(group => {
        const key = group.dataset.setting
        group.querySelectorAll('button').forEach(button => {
            const active = button.dataset.value === settings[key]
            button.classList.toggle('is-active', active)
            button.setAttribute('aria-pressed', String(active))
        })
    })
}

function applyPlayground() {
    const family = ensureFont(settings.fontSize, settings.widthMode, settings.locale)
    input.style.fontFamily = `${family}, sans-serif`
    input.style.fontSize = `${Number(settings.fontSize) * 3}px`
    input.lang = settings.locale
    localeSelect.value = settings.locale
    fontStatus.textContent = `${settings.fontSize}PX / ${settings.widthMode.toUpperCase()} / ${settings.locale.toUpperCase()}`
    charCount.textContent = `${[...input.value].length} CHARS`
    saveSettings()
    updateButtons()
}

async function loadAlphabet() {
    const file = `alphabet-${settings.atlasSize}px-${settings.atlasWidth}.txt`
    glyphResult.textContent = `正在读取 ${file}…`
    try {
        const response = await fetch(file)
        if (!response.ok) throw new Error(String(response.status))
        alphabet = await response.text()
        renderGlyphs()
    } catch {
        alphabet = '方舟像素字体天地玄黄宇宙洪荒日月山川海风云雨花鳥魚龍春夏秋冬東西南北人心文字文化未来世界'
        renderGlyphs()
        glyphResult.textContent = '预览模式 · 完整字符表暂不可用'
    }
}

function parseQuery(query) {
    const normalized = query.trim().toUpperCase().replace(/^U\+/, '')
    if (/^[0-9A-F]{4,6}$/.test(normalized)) {
        const codePoint = Number.parseInt(normalized, 16)
        return String.fromCodePoint(codePoint)
    }
    return query.trim()
}

function renderGlyphs() {
    const query = parseQuery(glyphSearch.value)
    const unique = [...new Set([...alphabet].filter(char => !/\s/.test(char)))]
    const filtered = query ? unique.filter(char => query.includes(char) || char.includes(query)) : unique
    const visible = filtered.slice(0, 180)
    const locale = settings.locale === 'en' ? 'zh-Hans' : settings.locale
    const family = ensureFont(settings.atlasSize, settings.atlasWidth, locale)
    glyphGrid.replaceChildren(...visible.map(char => {
        const cell = document.createElement('div')
        const glyph = document.createElement('strong')
        const code = document.createElement('span')
        cell.className = 'glyph-cell'
        glyph.textContent = char
        glyph.style.fontFamily = `${family}, sans-serif`
        glyph.lang = locale
        code.textContent = `U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`
        cell.append(glyph, code)
        return cell
    }))
    if (!visible.length) {
        const empty = document.createElement('p')
        empty.textContent = '未在当前字符集中找到该字符。'
        glyphGrid.append(empty)
    }
    glyphResult.textContent = query ? `找到 ${filtered.length} 个结果` : `显示 ${visible.length} / ${unique.length} 个字符`
    alphabetLink.href = `../build/outputs/alphabet-${settings.atlasSize}px-${settings.atlasWidth}.html`
}

document.querySelectorAll('[data-setting] button').forEach(button => {
    button.addEventListener('click', () => {
        const group = button.closest('[data-setting]')
        const key = group.dataset.setting
        settings[key] = button.dataset.value
        if (key.startsWith('atlas')) loadAlphabet()
        else applyPlayground()
        updateButtons()
        saveSettings()
    })
})
localeSelect.addEventListener('change', () => {
    settings.locale = localeSelect.value
    applyPlayground()
    renderGlyphs()
})
input.addEventListener('input', () => {
    charCount.textContent = `${[...input.value].length} CHARS`
})
document.querySelector('#reset-text').addEventListener('click', () => {
    input.value = '汉字之美，在方寸之间。\n文字の美しさを、ピクセルで。\n한글의 아름다움을 픽셀로.\nTHE QUICK BROWN FOX JUMPS OVER A LAZY DOG.'
    input.dispatchEvent(new Event('input'))
    input.focus()
})
glyphSearch.addEventListener('input', renderGlyphs)

function createHeroScene() {
    const canvas = document.querySelector('#hero-canvas')
    const context = canvas.getContext('2d')
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let frame = 0
    let raf = 0

    function resize() {
        const scale = Math.min(devicePixelRatio || 1, 2)
        width = Math.ceil(canvas.clientWidth / 3)
        height = Math.ceil(canvas.clientHeight / 3)
        canvas.width = width * scale
        canvas.height = height * scale
        context.setTransform(scale, 0, 0, scale, 0, 0)
        context.imageSmoothingEnabled = false
        draw(performance.now())
    }

    function ridge(points, fill) {
        context.fillStyle = fill
        context.beginPath()
        context.moveTo(0, height)
        points.forEach(([x, y]) => context.lineTo(x, y))
        context.lineTo(width, height)
        context.closePath()
        context.fill()
    }

    function draw(time) {
        context.clearRect(0, 0, width, height)
        const sky = context.createLinearGradient(0, 0, 0, height)
        sky.addColorStop(0, '#9eb9b7')
        sky.addColorStop(.55, '#668c8c')
        sky.addColorStop(1, '#263f55')
        context.fillStyle = sky
        context.fillRect(0, 0, width, height)

        const moonX = width * .76
        const moonY = height * .25
        context.fillStyle = '#efe2b8'
        context.beginPath()
        context.arc(moonX, moonY, Math.max(24, width * .045), 0, Math.PI * 2)
        context.fill()

        ridge([[0,height*.58],[width*.10,height*.42],[width*.19,height*.52],[width*.29,height*.32],[width*.39,height*.51],[width*.51,height*.37],[width*.63,height*.54],[width*.74,height*.39],[width*.84,height*.52],[width,height*.41]],'#496f72')
        ridge([[0,height*.68],[width*.13,height*.53],[width*.24,height*.62],[width*.36,height*.45],[width*.48,height*.64],[width*.61,height*.51],[width*.73,height*.66],[width*.86,height*.48],[width,height*.64]],'#355a62')
        ridge([[0,height*.78],[width*.16,height*.63],[width*.28,height*.74],[width*.42,height*.58],[width*.58,height*.76],[width*.70,height*.62],[width*.83,height*.73],[width,height*.58]],'#233e51')

        context.fillStyle = '#182d42'
        const baseY = height * .76
        for (let x = width * .45; x < width * .98; x += 18) {
            const houseHeight = 7 + ((x * 13) % 12)
            context.fillRect(Math.floor(x), Math.floor(baseY - houseHeight), 13, houseHeight)
            context.fillRect(Math.floor(x - 2), Math.floor(baseY - houseHeight - 3), 17, 3)
        }
        context.fillRect(width * .64, height * .61, 8, height * .16)
        context.fillRect(width * .60, height * .64, width * .12, 6)
        context.fillRect(width * .625, height * .58, width * .055, 5)
        context.fillRect(width * .643, height * .54, width * .025, 5)

        context.fillStyle = '#13283d'
        context.fillRect(0, height * .78, width, height * .22)
        context.fillStyle = '#345b68'
        const offset = reducedMotion ? 0 : Math.floor((time / 80) % 20)
        for (let y = height * .81; y < height; y += 13) {
            for (let x = -20 + offset; x < width; x += 44) context.fillRect(x, y, 24, 3)
        }
        context.fillStyle = '#d69d52'
        for (let x = width * .48; x < width * .94; x += 22) context.fillRect(x, baseY - 5 - ((x * 7) % 7), 2, 2)

        if (!reducedMotion) raf = requestAnimationFrame(draw)
    }

    new ResizeObserver(resize).observe(canvas)
    if (!reducedMotion) raf = requestAnimationFrame(draw)
    window.addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true })
}

applyPlayground()
loadAlphabet()
createHeroScene()
