/* Tracer Engine v6.7 - Hardened for Blowfish */
const viewport = document.getElementById('viewport'), world = document.getElementById('world'), bgLayer = document.getElementById('bg-layer');
const tracedPath = document.getElementById('traced-path'), nodeMarkers = document.getElementById('node-markers'), output = document.getElementById('svg-output'), svgInput = document.getElementById('svg-input');

let points = [], scale = 1, panX = 0, panY = 0, isPanning = false, draggedNodeIndex = null;

// Reclaim Space Bar and stop browser scroll
window.addEventListener('keydown', e => { 
    if(e.code === 'Space') { e.preventDefault(); isPanning = true; viewport.style.cursor = 'grab'; } 
});
window.addEventListener('keyup', e => { if(e.code === 'Space') { isPanning = false; viewport.style.cursor = 'crosshair'; } });

// Correct Toggle Logic
window.toggleLock = function(panelId) {
    const panel = document.getElementById(panelId);
    const isLocked = panel.classList.contains('locked');
    document.querySelectorAll('.hover-panel').forEach(p => p.classList.remove('locked'));
    if (isLocked) { panel.classList.remove('locked'); panel.classList.add('suppress-hover'); } 
    else { panel.classList.add('locked'); panel.classList.remove('suppress-hover'); }
};

viewport.addEventListener('wheel', e => { e.preventDefault(); scale *= (e.deltaY > 0 ? 0.9 : 1.1); updateTransform(); }, {passive: false});

viewport.addEventListener('mousedown', e => {
    if(isPanning || e.button === 1) return;
    if(e.target.classList.contains('node')) { draggedNodeIndex = parseInt(e.target.dataset.index); return; }
    points.push(getWorldCoords(e)); updateDraw();
});

window.addEventListener('mousemove', e => {
    const coord = getWorldCoords(e);
    document.getElementById('coord-pill').innerText = `X: ${Math.round(coord.x)}, Y: ${Math.round(coord.y)}`;
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
        let x0 = i == 0 ? data[0].x : data[i - 1].x, y0 = i == 0 ? data[0].y : data[i - 1].y;
        let x1 = data[i].x, x2 = data[i+1].x, y1 = data[i].y, y2 = data[i+1].y;
        let x3 = i == data.length - 2 ? x2 : data[i + 2].x, y3 = i == data.length - 2 ? y2 : data[i + 2].y;
        let cp1x = x1 + (x2 - x0) / 6, cp1y = y1 + (y2 - y0) / 6, cp2x = x2 - (x3 - x1) / 6, cp2y = y2 - (y3 - y1) / 6;
        path += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)},${cp2x.toFixed(1)},${cp2y.toFixed(1)},${x2.toFixed(1)},${y2.toFixed(1)}`;
    }
    return path;
}

window.undo = function() { points.pop(); updateDraw(); };
window.clearCanvas = function() { points = []; updateDraw(); };
window.copyOutput = function() { output.select(); document.execCommand('copy'); };
window.renderTextAsBG = function() { bgLayer.innerHTML = svgInput.value; };
window.parseManualInput = function() {
    const coords = output.value.match(/-?\d+(\.\d+)?/g);
    if (!coords) return; points = [];
    for (let i = 0; i < coords.length; i += 2) if(coords[i+1]) points.push({ x: parseFloat(coords[i]), y: parseFloat(coords[i+1]) });
    updateDraw();
};

document.getElementById('file-input').addEventListener('change', e => {
    const file = e.target.files[0], reader = new FileReader();
    reader.onload = ev => { bgLayer.innerHTML = file.type === "image/svg+xml" ? ev.target.result : `<img src="${ev.target.result}" />`; };
    if (file.type === "image/svg+xml") reader.readAsText(file); else reader.readAsDataURL(file);
});