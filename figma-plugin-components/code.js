// DS Components Creator
// Cria Input, Badge, Card e Typography usando as Variables do Design System

figma.showUI(__html__, { width: 440, height: 420, title: "DS Components Creator" });

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function loadFonts() {
  const fonts = [
    { family: "Inter", style: "Regular" },
    { family: "Inter", style: "Medium" },
    { family: "Inter", style: "SemiBold" },
    { family: "Inter", style: "Bold" },
  ];
  for (const f of fonts) await figma.loadFontAsync(f);
}

let _semanticVars = null;
async function getSemanticVars() {
  if (_semanticVars) return _semanticVars;
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const col = collections.find(c => c.name === "Semantic");
  if (!col) return {};
  const all = await figma.variables.getLocalVariablesAsync();
  const map = {};
  for (const v of all) {
    if (v.variableCollectionId === col.id) map[v.name] = v;
  }
  _semanticVars = map;
  return map;
}

async function sem(name) {
  const vars = await getSemanticVars();
  return vars[name] || null;
}

function colorPaint(variable) {
  return figma.variables.setBoundVariableForPaint(
    { type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } },
    "color",
    variable
  );
}

async function applyFill(node, varName) {
  const v = await sem(varName);
  if (v) node.fills = [colorPaint(v)];
}

async function applyStroke(node, varName, weight = 1.5) {
  const v = await sem(varName);
  if (v) {
    node.strokes = [colorPaint(v)];
    node.strokeWeight = weight;
    node.strokeAlign = "INSIDE";
  }
}

async function applyTextColor(node, varName) {
  const v = await sem(varName);
  if (v) node.fills = [colorPaint(v)];
}

function makeText({ chars, size, style, x, y, width }) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: style || "Regular" };
  t.fontSize = size || 14;
  t.characters = chars;
  if (width) t.resize(width, t.height);
  t.x = x || 0;
  t.y = y || 0;
  return t;
}

// ─── INPUT / TEXTFIELD ────────────────────────────────────────────────────────

async function createInput(offsetX, offsetY) {
  const states = [
    { name: "Default",  border: "color/border/default",   error: false, opacity: 1   },
    { name: "Focus",    border: "color/action/primary",    error: false, opacity: 1   },
    { name: "Error",    border: "color/feedback/error",    error: true,  opacity: 1   },
    { name: "Disabled", border: "color/border/default",   error: false, opacity: 0.4 },
  ];

  const comps = [];

  for (const state of states) {
    const comp = figma.createComponent();
    comp.name = `State=${state.name}`;
    comp.resize(280, state.error ? 90 : 68);
    comp.fills = [];
    comp.clipsContent = false;

    // Label
    const label = makeText({ chars: "Label", size: 12, style: "Medium", x: 0, y: 0 });
    await applyTextColor(label, "color/text/secondary");
    comp.appendChild(label);

    // Input box
    const box = figma.createRectangle();
    box.resize(280, 44);
    box.x = 0; box.y = 22;
    box.cornerRadius = 8;
    await applyFill(box, "color/background/surface");
    await applyStroke(box, state.border);
    if (state.name === "Disabled") box.opacity = 0.45;
    comp.appendChild(box);

    // Placeholder text
    const ph = makeText({
      chars: state.name === "Disabled" ? "Campo desabilitado" : "Digite aqui...",
      size: 14, x: 12, y: 33
    });
    await applyTextColor(ph, "color/text/secondary");
    comp.appendChild(ph);

    // Error message
    if (state.error) {
      const errMsg = makeText({ chars: "⚠  Campo obrigatório", size: 12, x: 0, y: 72 });
      await applyTextColor(errMsg, "color/feedback/error");
      comp.appendChild(errMsg);
    }

    // Focus ring
    if (state.name === "Focus") {
      const ring = figma.createRectangle();
      ring.resize(284, 48);
      ring.x = -2; ring.y = 20;
      ring.cornerRadius = 10;
      ring.fills = [];
      await applyStroke(ring, "color/action/primary", 2.5);
      ring.opacity = 0.25;
      comp.insertChild(comp.children.length - 2, ring);
    }

    comps.push(comp);
  }

  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = "Input / TextField";
  set.x = offsetX;
  set.y = offsetY;
  set.paddingLeft = 24;
  set.paddingRight = 24;
  set.paddingTop = 24;
  set.paddingBottom = 24;
  set.itemSpacing = 32;
  return set;
}

// ─── BADGE ────────────────────────────────────────────────────────────────────

async function createBadge(offsetX, offsetY) {
  const types = [
    { name: "Default", bg: "color/background/hover",         text: "color/text/secondary"           },
    { name: "Primary", bg: "color/action/primary-subtle",    text: "color/action/secondary-foreground" },
    { name: "Success", bg: "color/feedback/success",         text: "color/action/primary-foreground" },
    { name: "Warning", bg: "color/feedback/warning",         text: "color/action/primary-foreground" },
    { name: "Error",   bg: "color/feedback/error",           text: "color/action/primary-foreground" },
    { name: "Info",    bg: "color/feedback/info",            text: "color/action/primary-foreground" },
  ];

  const comps = [];

  for (const type of types) {
    const comp = figma.createComponent();
    comp.name = `Type=${type.name}`;
    comp.layoutMode = "HORIZONTAL";
    comp.primaryAxisAlignItems = "CENTER";
    comp.counterAxisAlignItems = "CENTER";
    comp.primaryAxisSizingMode = "AUTO";
    comp.counterAxisSizingMode = "FIXED";
    comp.resize(comp.width, 24);
    comp.paddingLeft = 10;
    comp.paddingRight = 10;
    comp.cornerRadius = 100;
    await applyFill(comp, type.bg);

    const label = makeText({ chars: type.name, size: 11, style: "Medium" });
    await applyTextColor(label, type.text);
    comp.appendChild(label);

    comps.push(comp);
  }

  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = "Badge";
  set.x = offsetX;
  set.y = offsetY;
  set.paddingLeft = 24;
  set.paddingRight = 24;
  set.paddingTop = 24;
  set.paddingBottom = 24;
  set.itemSpacing = 16;
  return set;
}

// ─── CARD ─────────────────────────────────────────────────────────────────────

async function createCard(offsetX, offsetY) {
  const comp = figma.createComponent();
  comp.name = "Card";
  comp.resize(320, 200);
  comp.cornerRadius = 12;
  comp.clipsContent = true;
  await applyFill(comp, "color/background/surface");
  await applyStroke(comp, "color/border/default", 1);
  comp.effects = [{
    type: "DROP_SHADOW",
    color: { r: 0, g: 0, b: 0, a: 0.08 },
    offset: { x: 0, y: 4 },
    radius: 16,
    spread: 0,
    visible: true,
    blendMode: "NORMAL",
  }];

  // Title
  const title = makeText({ chars: "Card Title", size: 16, style: "SemiBold", x: 20, y: 20 });
  await applyTextColor(title, "color/text/primary");
  comp.appendChild(title);

  // Subtitle
  const subtitle = makeText({ chars: "Subtítulo ou categoria", size: 12, x: 20, y: 44 });
  await applyTextColor(subtitle, "color/text/secondary");
  comp.appendChild(subtitle);

  // Divider
  const div = figma.createRectangle();
  div.resize(280, 1);
  div.x = 20; div.y = 72;
  await applyFill(div, "color/border/default");
  comp.appendChild(div);

  // Body text
  const body = makeText({
    chars: "Conteúdo do card. Use este componente para agrupar informações relacionadas e apresentar de forma clara.",
    size: 13, x: 20, y: 88, width: 280
  });
  await applyTextColor(body, "color/text/secondary");
  comp.appendChild(body);

  // Footer action
  const action = makeText({ chars: "Ver mais →", size: 13, style: "Medium", x: 20, y: 168 });
  await applyTextColor(action, "color/action/primary");
  comp.appendChild(action);

  comp.x = offsetX;
  comp.y = offsetY;
  return comp;
}

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

async function createTypography(offsetX, offsetY) {
  const frame = figma.createFrame();
  frame.name = "Typography Scale";
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.clipsContent = false;

  const scale = [
    { tag: "H1",      size: 40, style: "Bold",     chars: "Heading 1 — Brand Title" },
    { tag: "H2",      size: 32, style: "Bold",     chars: "Heading 2 — Page Title" },
    { tag: "H3",      size: 24, style: "SemiBold", chars: "Heading 3 — Section Title" },
    { tag: "H4",      size: 20, style: "SemiBold", chars: "Heading 4 — Card Title" },
    { tag: "Body L",  size: 18, style: "Regular",  chars: "Body Large — Primary reading content" },
    { tag: "Body M",  size: 16, style: "Regular",  chars: "Body Medium — Default body text" },
    { tag: "Body S",  size: 14, style: "Regular",  chars: "Body Small — Secondary and helper text" },
    { tag: "Label M", size: 14, style: "Medium",   chars: "Label Medium — Buttons, inputs, navs" },
    { tag: "Label S", size: 12, style: "Medium",   chars: "Label Small — Captions and badges" },
  ];

  let currentY = 24;
  const lineGap = 16;

  for (const s of scale) {
    // Tag label (left column)
    const tagNode = makeText({ chars: s.tag, size: 10, style: "Medium", x: 24, y: currentY + (s.size - 12) / 2 });
    await applyTextColor(tagNode, "color/text/secondary");
    frame.appendChild(tagNode);

    // Divider line
    const line = figma.createRectangle();
    line.resize(1, s.size + 2);
    line.x = 90; line.y = currentY;
    await applyFill(line, "color/border/default");
    frame.appendChild(line);

    // Text example (right column)
    const textNode = makeText({ chars: s.chars, size: s.size, style: s.style, x: 108, y: currentY });
    await applyTextColor(textNode, "color/text/primary");
    frame.appendChild(textNode);

    currentY += s.size + lineGap;
  }

  frame.resize(640, currentY + 24);
  frame.x = offsetX;
  frame.y = offsetY;
  return frame;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

figma.ui.onmessage = async (msg) => {
  if (msg.type === "create-all") {
    try {
      figma.ui.postMessage({ type: "status", text: "⏳ Carregando fontes Inter..." });
      await loadFonts();

      figma.ui.postMessage({ type: "status", text: "⏳ Criando Input / TextField (1/4)..." });
      const input = await createInput(0, 0);

      figma.ui.postMessage({ type: "status", text: "⏳ Criando Badge (2/4)..." });
      const badge = await createBadge(0, 200);

      figma.ui.postMessage({ type: "status", text: "⏳ Criando Card (3/4)..." });
      const card = await createCard(400, 0);

      figma.ui.postMessage({ type: "status", text: "⏳ Criando Typography Scale (4/4)..." });
      const typo = await createTypography(780, 0);

      // Zoom to fit all created nodes
      figma.viewport.scrollAndZoomIntoView([input, badge, card, typo]);

      figma.ui.postMessage({
        type: "success",
        text: "✅ 4 componentes criados! Input, Badge, Card e Typography estão no canvas.",
      });

    } catch (err) {
      figma.ui.postMessage({ type: "error", text: `❌ Erro: ${err.message}` });
    }
  }

  if (msg.type === "close") figma.closePlugin();
};
