<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SVG Pro-Tracer v6.6 - Restored Ribbon</title>
    <style>
        :root { --accent: #00f2ff; --bg: #000; --ui: #1a1a1a; --btn: #252525; --hover: #333; --danger: #552222; }
        body { background: var(--bg); color: #eee; font-family: system-ui, sans-serif; margin: 0; overflow: hidden; display: flex; flex-direction: column; height: 100vh; }
        
        /* THE RIBBON */
        #ribbon { background: var(--ui); padding: 5px 15px; display: flex; gap: 12px; align-items: center; border-bottom: 1px solid #333; z-index: 1000; height: 40px; box-sizing: border-box; }
        .group { display: flex; align-items: center; gap: 8px; border-right: 1px solid #444; padding-right: 12px; height: 100%; }
        .group:last-child { border: none; }
        
        /* HOVER/STICKY TEXTAREAS */
        .hover-panel { position: relative; display: flex; align-items: center; height: 100%; }
        .hover-panel textarea { 
            position: absolute; top: 35px; left: 0; width: 450px; height: 0; 
            opacity: 0; transition: height 0.2s ease, opacity 0.2s ease; overflow: hidden;
            background: #111; color: var(--accent); border: 1px solid var(--accent);
            font-family: monospace; z-index: 2000; pointer-events: none; padding: 0;
            box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }

        /* Panel Expansion Logic */
        .hover-panel:hover:not(.suppress-hover) textarea, 
        .hover-panel.locked textarea { height: 300px; opacity: 1; pointer-events: all; padding: 10px; }
        
        .label-tab { cursor: pointer; font-size: 0.85em; font-weight: bold; color: #aaa; white-space: nowrap; padding: 4px 8px; border-radius: 3px; user-select: none; }
        .label-tab:hover { background: var(--hover); color: #fff; }
        .hover-panel.locked .label-tab { color: var(--accent); background: #333; box-shadow: inset 0 0 4px var(--accent); }

        /* VIEWPORT */
        #viewport { flex: 1; position: relative; overflow: hidden; cursor: crosshair; }
        #world { position: absolute; transform-origin: 0 0; }
        #bg-layer, #grid-layer, #draw-layer { position: absolute; top: 0; left: 0; pointer-events: none; }
        
        /* BUTTONS */
        button { padding: 4px 10px; cursor: pointer; background: var(--btn); color: #fff; border: 1px solid #444; border-radius: 3px; font-size: 0.82em; transition: 0.1s; white-space: nowrap; }
        button:hover { background: var(--hover); border-color: var(--accent); }
        #coord-pill { position: absolute; bottom: 15px; right: 15px; background: rgba(0,0,0,0.8); padding: 3px 12px; border-radius: 15px; color: var(--accent); border: 1px solid var(--accent); font-size: 0.8em; z-index: 1000; }
        
        .node { cursor: move; pointer-events: all; fill: #ff0055; stroke: rgba(255,255,255,0.3); stroke-width: 1; transition: r 0.1s; }
        .node:hover { r: 8; fill: #fff; stroke: var(--accent); }
    </style>
</head>
<body>

<div id="ribbon">
    <div class="group">
        <input type="file" id="file-input" style="display:none">
        <button onclick="document.getElementById('file-input').click()">📁 Load BG</button>
        <button onclick="undo()">⟲ Undo</button>
        <button style="background:var(--danger)" onclick="clearCanvas()">✖ Clear</button>
    </div>

    <div class="group">
        <label style="font-size: 0.75em;"><input type="checkbox" id="smooth-toggle" checked onchange="updateDraw()"> Smooth</label>
        <label style="font-size: 0.75em;"><input type="checkbox" id="snap-toggle"> Snap</label>
    </div>

    <div class="group hover-panel" id="path-panel" onmouseleave="this.classList.remove('suppress-hover')">
        <span class="label-tab" onclick="toggleLock('path-panel')">📝 Path String</span>
        <textarea id="svg-output" placeholder="Coordinates show here..."></textarea>
        <button onclick="parseManualInput()">Sync</button>
        <button onclick="copyOutput()">Copy</button>
    </div>

    <div class="group hover-panel" id="bg-panel" onmouseleave="this.classList.remove('suppress-hover')">
        <span class="label-tab" onclick="toggleLock('bg-panel')">🖼️ BG SVG</span>
        <textarea id="svg-input" placeholder="Paste <svg> here..."></textarea>
        <button onclick="renderTextAsBG()">Render</button>
    </div>
    
    <div style="font-size: 0.7em; color: #666; margin-left: auto; text-align: right;">Space+Drag: Pan | Scroll: Zoom<br>Drag Dots: Edit</div>
</div>

<div id="viewport">
    <div id="world">
        <div id="bg-layer"></div>
        <svg id="grid-layer" width="8000" height="8000">
            <defs>
                <pattern id="minorGrid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/></pattern>
                <pattern id="majorGrid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/></pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#minorGrid)" /><rect width="100%" height="100%" fill="url(#majorGrid)" />
        </svg>
        <svg id="draw-layer" width="8000" height="8000" style="overflow: visible;">
            <path id="traced-path" d="" fill="none" stroke="#00f2ff" stroke-width="3" stroke-linecap="round" />
            <g id="node-markers"></g>
        </svg>
    </div>
    <div id="coord-pill">X: 0, Y: 0</div>
</div>

<script>
    const viewport = document.getElementById('viewport'), world = document.getElementById('world'), bgLayer = document.getElementById('bg-layer');
    const tracedPath = document.getElementById('traced-path'), nodeMarkers = document.getElementById('node-markers'), output = document.getElementById('svg-output');
    const coordPill = document.getElementById('coord-pill'), fileInput = document.getElementById('file-input'), svgInput = document.getElementById('svg-input');

    let points = [], scale = 1, panX = 0, panY = 0, isPanning = false, draggedNodeIndex = null;

    // Corrected Toggle Logic
    function toggleLock(panelId) {
        const panel = document.getElementById(panelId);
        const isCurrentlyLocked = panel.classList.contains('locked');
        
        // Clear other locks first to prevent overlap
        document.querySelectorAll('.hover-panel').forEach(p => { if(p.id !== panelId) p.classList.remove('locked'); });

        if (isCurrentlyLocked) {
            panel.classList.remove('locked');
            panel.classList.add('suppress-hover');
        } else {
            panel.classList.add('locked');
            panel.classList.remove('suppress-hover');
        }
    }

    // Viewport & Interaction
    window.addEventListener('keydown', e => { if(e.code === 'Space') { isPanning = true; viewport.style.cursor = 'grab'; } });
    window.addEventListener('keyup', e => { if(e.code === 'Space') { isPanning = false; viewport.style.cursor = 'crosshair'; } });
    viewport.addEventListener('wheel', e => { e.preventDefault(); const delta = e.deltaY > 0 ? 0.9 : 1.1; scale *= delta; updateTransform(); }, {passive: false});

    viewport.addEventListener('mousedown', e => {
        if(isPanning || e.button === 1) return;
        if(e.target.classList.contains('node')) { draggedNodeIndex = parseInt(e.target.dataset.index); return; }
        points.push(getWorldCoords(e)); updateDraw();
    });

    window.addEventListener('mousemove', e => {
        const coord = getWorldCoords(e);
        coordPill.innerText = `X: ${Math.round(coord.x)}, Y: ${Math.round(coord.y)}`;
        if(isPanning && e.buttons === 1) { panX += e.movementX; panY += e.movementY; updateTransform(); }
        else if (draggedNodeIndex !== null) { points[draggedNodeIndex] = coord; updateDraw(); }
    });
    window.addEventListener('mouseup', () => draggedNodeIndex = null);

    function getWorldCoords(e) {
        const rect = viewport.getBoundingClientRect();
        let x = (e.clientX - rect.left - panX) / scale, y = (e.clientY - rect.top - panY) / scale;
        if(document.getElementById('snap-toggle').checked) { x = Math.round(x/25)*25; y = Math.round(y/25)*25; }
        return {x, y};
    }
    function updateTransform() { world.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`; }

    // Path Logic
    function updateDraw() {
        nodeMarkers.innerHTML = "";
        if (!points.length) { tracedPath.setAttribute('d', ''); output.value = ''; return; }
        points.forEach((p, i) => {
            const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            c.setAttribute("cx", p.x); c.setAttribute("cy", p.y); c.setAttribute("r", 5);
            c.setAttribute("class", "node"); c.dataset.index = i; nodeMarkers.appendChild(c);
        });
        const d = (document.getElementById('smooth-toggle').checked && points.length >= 3) ? solve(points) : `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
        tracedPath.setAttribute('d', d); output.value = d;
    }

    function solve(data) {
        let path = `M${data[0].x.toFixed(1)},${data[0].y.toFixed(1)}`;
        for (let i = 0; i < data.length - 1; i++) {
            let x0 = i == 0 ? data[0].x : data[i - 1].x;
            let y0 = i == 0 ? data[0].y : data[i - 1].y;
            let x1 = data[i].x, x2 = data[i+1].x, y1 = data[i].y, y2 = data[i+1].y;
            let x3 = i == data.length - 2 ? x2 : data[i + 2].x, y3 = i == data.length - 2 ? y2 : data[i + 2].y;
            let cp1x = x1 + (x2 - x0) / 6, cp1y = y1 + (y2 - y0) / 6, cp2x = x2 - (x3 - x1) / 6, cp2y = y2 - (y3 - y1) / 6;
            path += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)},${cp2x.toFixed(1)},${cp2y.toFixed(1)},${x2.toFixed(1)},${y2.toFixed(1)}`;
        }
        return path;
    }

    // Utilities
    function undo() { points.pop(); updateDraw(); }
    function clearCanvas() { points = []; updateDraw(); }
    function copyOutput() { output.select(); document.execCommand('copy'); }
    function renderTextAsBG() { bgLayer.innerHTML = svgInput.value; }
    function parseManualInput() {
        const coords = output.value.match(/-?\d+(\.\d+)?/g);
        if (!coords) return; points = [];
        for (let i = 0; i < coords.length; i += 2) if(coords[i+1]) points.push({ x: parseFloat(coords[i]), y: parseFloat(coords[i+1]) });
        updateDraw();
    }
    fileInput.addEventListener('change', e => {
        const file = e.target.files[0], reader = new FileReader();
        reader.onload = ev => { bgLayer.innerHTML = file.type === "image/svg+xml" ? ev.target.result : `<img src="${event.target.result}" />`; };
        if (file.type === "image/svg+xml") reader.readAsText(file); else reader.readAsDataURL(file);
    });
</script>
</body>
</html>