// DS Super Generator — Based on Material Design 3
// https://m3.material.io/components

figma.showUI(__html__, { width: 500, height: 620, title: "DS Super Generator" });

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function loadFonts() {
  await Promise.all([
    { family: "Inter", style: "Regular" },
    { family: "Inter", style: "Medium" },
    { family: "Inter", style: "SemiBold" },
    { family: "Inter", style: "Bold" },
  ].map(f => figma.loadFontAsync(f)));
}

let _v = null;
async function V() {
  if (_v) return _v;
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const col = cols.find(c => c.name === "Semantic");
  if (!col) return (_v = {});
  const all = await figma.variables.getLocalVariablesAsync();
  _v = {};
  for (const v of all) if (v.variableCollectionId === col.id) _v[v.name] = v;
  return _v;
}

function bp(variable) {
  return figma.variables.setBoundVariableForPaint(
    { type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }, "color", variable
  );
}

async function F(node, name) {
  const v = (await V())[name];
  if (v) node.fills = [bp(v)];
}
async function S(node, name, w = 1.5) {
  const v = (await V())[name];
  if (!v) return;
  node.strokes = [bp(v)];
  node.strokeWeight = w;
  node.strokeAlign = "INSIDE";
}
async function TC(node, name) {
  const v = (await V())[name];
  if (v) node.fills = [bp(v)];
}

function T(chars, size, style) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: style || "Regular" };
  t.fontSize = size || 14;
  t.characters = chars;
  return t;
}

function AL(dir, gap, pH, pV) {
  const f = figma.createFrame();
  f.layoutMode = dir === "H" ? "HORIZONTAL" : "VERTICAL";
  f.primaryAxisAlignItems = "CENTER";
  f.counterAxisAlignItems = "CENTER";
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.itemSpacing = gap ?? 8;
  f.paddingLeft = pH ?? 0; f.paddingRight = pH ?? 0;
  f.paddingTop = pV ?? 0; f.paddingBottom = pV ?? 0;
  f.fills = [];
  return f;
}

function compSet(comps, name, padH = 24, padV = 24, gap = 16) {
  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = name;
  set.paddingLeft = padH; set.paddingRight = padH;
  set.paddingTop = padV; set.paddingBottom = padV;
  set.itemSpacing = gap;
  return set;
}

async function sectionLabel(text, x, y) {
  const t = T(text, 11, "Bold");
  t.opacity = 0.4;
  await TC(t, "color/text/secondary");
  t.x = x; t.y = y;
  figma.currentPage.appendChild(t);
}

// ─── BUTTON ──────────────────────────────────────────────────────────────────

async function createButton(x, y) {
  const defs = [
    { n: "Variant=Filled,State=Default",    bg: "color/action/primary",        fg: "color/action/primary-foreground",    border: null,                   shadow: false },
    { n: "Variant=Filled,State=Disabled",   bg: "color/background/hover",      fg: "color/text/secondary",               border: null,                   op: 0.5 },
    { n: "Variant=Outlined,State=Default",  bg: null,                          fg: "color/action/primary",               border: "color/action/primary"  },
    { n: "Variant=Outlined,State=Disabled", bg: null,                          fg: "color/text/secondary",               border: "color/border/default",  op: 0.5 },
    { n: "Variant=Text,State=Default",      bg: null,                          fg: "color/action/primary",               border: null },
    { n: "Variant=Elevated,State=Default",  bg: "color/background/surface",    fg: "color/action/primary",               border: null,                   shadow: true },
    { n: "Variant=Tonal,State=Default",     bg: "color/action/primary-subtle", fg: "color/action/secondary-foreground",  border: null },
  ];

  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n;
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.paddingLeft = 24; c.paddingRight = 24;
    c.paddingTop = 10; c.paddingBottom = 10;
    c.cornerRadius = 100;
    c.primaryAxisSizingMode = "AUTO";
    c.counterAxisSizingMode = "FIXED";
    c.resize(c.width, 40);
    if (d.bg) await F(c, d.bg); else c.fills = [];
    if (d.border) await S(c, d.border, 1.5);
    if (d.shadow) c.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.12 }, offset: { x: 0, y: 2 }, radius: 8, spread: 0, visible: true, blendMode: "NORMAL" }];
    if (d.op) c.opacity = d.op;
    const lbl = T("Label", 14, "Medium");
    await TC(lbl, d.fg);
    c.appendChild(lbl);
    comps.push(c);
  }
  const set = compSet(comps, "Button");
  set.x = x; set.y = y;
  return set;
}

// ─── FAB ─────────────────────────────────────────────────────────────────────

async function createFAB(x, y) {
  const defs = [
    { n: "Size=Small",    sz: 40, r: 12 },
    { n: "Size=Regular",  sz: 56, r: 16 },
    { n: "Size=Large",    sz: 96, r: 28 },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n;
    c.resize(d.sz, d.sz);
    c.cornerRadius = d.r;
    await F(c, "color/action/primary");
    c.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.15 }, offset: { x: 0, y: 4 }, radius: 12, spread: 0, visible: true, blendMode: "NORMAL" }];
    const icon = T("+", d.sz === 40 ? 20 : d.sz === 56 ? 24 : 36, "Regular");
    await TC(icon, "color/action/primary-foreground");
    icon.x = (d.sz - icon.width) / 2;
    icon.y = (d.sz - icon.height) / 2;
    c.appendChild(icon);
    comps.push(c);
  }
  // Extended FAB
  const ext = figma.createComponent();
  ext.name = "Size=Extended";
  ext.layoutMode = "HORIZONTAL";
  ext.primaryAxisAlignItems = "CENTER";
  ext.counterAxisAlignItems = "CENTER";
  ext.paddingLeft = 20; ext.paddingRight = 20;
  ext.primaryAxisSizingMode = "AUTO";
  ext.counterAxisSizingMode = "FIXED";
  ext.resize(ext.width, 56);
  ext.cornerRadius = 16;
  ext.itemSpacing = 8;
  await F(ext, "color/action/primary");
  const ei = T("+", 18, "Regular"); await TC(ei, "color/action/primary-foreground"); ext.appendChild(ei);
  const el = T("Extended", 14, "Medium"); await TC(el, "color/action/primary-foreground"); ext.appendChild(el);
  comps.push(ext);

  const set = compSet(comps, "FAB");
  set.x = x; set.y = y;
  return set;
}

// ─── TEXT FIELD ──────────────────────────────────────────────────────────────

async function createTextField(x, y) {
  const defs = [
    { n: "Style=Outlined,State=Default",  border: "color/border/default",  filled: false, err: false },
    { n: "Style=Outlined,State=Focus",    border: "color/action/primary",  filled: false, err: false },
    { n: "Style=Outlined,State=Error",    border: "color/feedback/error",  filled: false, err: true  },
    { n: "Style=Outlined,State=Disabled", border: "color/border/default",  filled: false, err: false, op: 0.4 },
    { n: "Style=Filled,State=Default",    border: "color/border/default",  filled: true,  err: false },
    { n: "Style=Filled,State=Focus",      border: "color/action/primary",  filled: true,  err: false },
    { n: "Style=Filled,State=Error",      border: "color/feedback/error",  filled: true,  err: true  },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n;
    c.resize(280, d.err ? 90 : 68);
    c.fills = []; c.clipsContent = false;
    if (d.op) c.opacity = d.op;

    const lbl = T("Label", 12, "Medium"); await TC(lbl, "color/text/secondary");
    lbl.x = 0; lbl.y = 0; c.appendChild(lbl);

    const box = figma.createRectangle();
    box.resize(280, 44); box.x = 0; box.y = 22;
    if (d.filled) {
      box.topLeftRadius = 8; box.topRightRadius = 8;
      box.bottomLeftRadius = 0; box.bottomRightRadius = 0;
      await F(box, "color/background/hover");
      const line = figma.createRectangle();
      line.resize(280, 2); line.x = 0; line.y = 64;
      const bv = (await V())[d.border];
      if (bv) line.fills = [bp(bv)];
      c.appendChild(line);
    } else {
      box.cornerRadius = 8;
      await F(box, "color/background/surface");
      await S(box, d.border, 1.5);
    }
    c.appendChild(box);

    const ph = T("Placeholder...", 14, "Regular"); await TC(ph, "color/text/secondary");
    ph.x = 12; ph.y = 33; c.appendChild(ph);

    if (d.err) {
      const em = T("⚠  Mensagem de erro", 12, "Regular"); await TC(em, "color/feedback/error");
      em.x = 0; em.y = 72; c.appendChild(em);
    }
    comps.push(c);
  }
  const set = compSet(comps, "Text Field", 24, 24, 24);
  set.x = x; set.y = y;
  return set;
}

// ─── CHECKBOX ────────────────────────────────────────────────────────────────

async function createCheckbox(x, y) {
  const defs = [
    { n: "State=Unchecked,Enabled=True",     ch: false, ind: false, dis: false },
    { n: "State=Checked,Enabled=True",       ch: true,  ind: false, dis: false },
    { n: "State=Indeterminate,Enabled=True", ch: false, ind: true,  dis: false },
    { n: "State=Unchecked,Enabled=False",    ch: false, ind: false, dis: true  },
    { n: "State=Checked,Enabled=False",      ch: true,  ind: false, dis: true  },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n;
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.itemSpacing = 10;
    c.primaryAxisSizingMode = "AUTO"; c.counterAxisSizingMode = "AUTO";
    c.fills = [];
    if (d.dis) c.opacity = 0.38;

    const wrap = figma.createFrame();
    wrap.resize(20, 20); wrap.cornerRadius = 4; wrap.clipsContent = false;
    if (d.ch || d.ind) {
      await F(wrap, "color/action/primary"); wrap.strokes = [];
      const mark = T(d.ind ? "—" : "✓", 11, "Bold"); await TC(mark, "color/action/primary-foreground");
      mark.x = 2; mark.y = 1; wrap.appendChild(mark);
    } else {
      wrap.fills = []; await S(wrap, "color/border/default", 2);
    }
    c.appendChild(wrap);

    const lbl = T("Checkbox", 14, "Regular"); await TC(lbl, "color/text/primary");
    c.appendChild(lbl);
    comps.push(c);
  }
  const set = compSet(comps, "Checkbox");
  set.x = x; set.y = y;
  return set;
}

// ─── RADIO ───────────────────────────────────────────────────────────────────

async function createRadio(x, y) {
  const defs = [
    { n: "State=Unselected,Enabled=True",  sel: false, dis: false },
    { n: "State=Selected,Enabled=True",    sel: true,  dis: false },
    { n: "State=Unselected,Enabled=False", sel: false, dis: true  },
    { n: "State=Selected,Enabled=False",   sel: true,  dis: true  },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n;
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.itemSpacing = 10;
    c.primaryAxisSizingMode = "AUTO"; c.counterAxisSizingMode = "AUTO";
    c.fills = [];
    if (d.dis) c.opacity = 0.38;

    const wrap = figma.createFrame();
    wrap.resize(20, 20); wrap.fills = [];
    const ring = figma.createEllipse(); ring.resize(20, 20);
    ring.fills = []; await S(ring, d.sel ? "color/action/primary" : "color/border/default", 2);
    wrap.appendChild(ring);
    if (d.sel) {
      const dot = figma.createEllipse(); dot.resize(10, 10); dot.x = 5; dot.y = 5;
      await F(dot, "color/action/primary"); dot.strokes = [];
      wrap.appendChild(dot);
    }
    c.appendChild(wrap);

    const lbl = T("Opção", 14, "Regular"); await TC(lbl, "color/text/primary");
    c.appendChild(lbl);
    comps.push(c);
  }
  const set = compSet(comps, "Radio");
  set.x = x; set.y = y;
  return set;
}

// ─── SWITCH ──────────────────────────────────────────────────────────────────

async function createSwitch(x, y) {
  const defs = [
    { n: "State=Off,Enabled=True",  on: false, dis: false },
    { n: "State=On,Enabled=True",   on: true,  dis: false },
    { n: "State=Off,Enabled=False", on: false, dis: true  },
    { n: "State=On,Enabled=False",  on: true,  dis: true  },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n;
    c.resize(160, 32); c.fills = [];
    if (d.dis) c.opacity = 0.38;

    const track = figma.createRectangle();
    track.resize(52, 32); track.x = 0; track.y = 0; track.cornerRadius = 100;
    if (d.on) { await F(track, "color/action/primary"); }
    else { await F(track, "color/background/hover"); await S(track, "color/border/default", 2); }
    c.appendChild(track);

    const sz = d.on ? 24 : 20;
    const thumb = figma.createEllipse();
    thumb.resize(sz, sz);
    thumb.x = d.on ? 52 - sz - 4 : 4;
    thumb.y = (32 - sz) / 2;
    await F(thumb, d.on ? "color/action/primary-foreground" : "color/text/secondary");
    thumb.strokes = [];
    c.appendChild(thumb);

    const lbl = T(d.on ? "On" : "Off", 14, "Regular");
    await TC(lbl, "color/text/primary");
    lbl.x = 62; lbl.y = 7;
    c.appendChild(lbl);
    comps.push(c);
  }
  const set = compSet(comps, "Switch");
  set.x = x; set.y = y;
  return set;
}

// ─── CHIP ────────────────────────────────────────────────────────────────────

async function createChip(x, y) {
  const defs = [
    { n: "Type=Assist,Selected=False",     label: "Assist",      sel: false },
    { n: "Type=Filter,Selected=False",     label: "Filter",      sel: false },
    { n: "Type=Filter,Selected=True",      label: "✓ Filter",    sel: true  },
    { n: "Type=Input,Selected=False",      label: "Input  ×",    sel: false },
    { n: "Type=Suggestion,Selected=False", label: "Suggestion",  sel: false },
    { n: "Type=Suggestion,Selected=True",  label: "✓ Suggestion",sel: true  },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n;
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.paddingLeft = 16; c.paddingRight = 16;
    c.primaryAxisSizingMode = "AUTO";
    c.counterAxisSizingMode = "FIXED";
    c.resize(c.width, 32); c.cornerRadius = 8;
    if (d.sel) { await F(c, "color/action/primary-subtle"); await S(c, "color/action/primary", 1); }
    else { c.fills = []; await S(c, "color/border/default", 1); }
    const lbl = T(d.label, 13, "Medium");
    await TC(lbl, d.sel ? "color/action/secondary-foreground" : "color/text/primary");
    c.appendChild(lbl);
    comps.push(c);
  }
  const set = compSet(comps, "Chip", 24, 24, 12);
  set.x = x; set.y = y;
  return set;
}

// ─── CARD ────────────────────────────────────────────────────────────────────

async function createCard(x, y) {
  const defs = [
    { n: "Variant=Elevated", shadow: true,  border: false, bg: "color/background/surface" },
    { n: "Variant=Filled",   shadow: false, border: false, bg: "color/background/hover"   },
    { n: "Variant=Outlined", shadow: false, border: true,  bg: "color/background/surface" },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n; c.resize(280, 176); c.cornerRadius = 12; c.clipsContent = true;
    await F(c, d.bg);
    if (d.border) await S(c, "color/border/default", 1);
    if (d.shadow) c.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.08 }, offset: { x: 0, y: 4 }, radius: 16, spread: 0, visible: true, blendMode: "NORMAL" }];

    const title = T("Card Title", 16, "SemiBold"); await TC(title, "color/text/primary");
    title.x = 16; title.y = 16; c.appendChild(title);
    const sub = T("Subtítulo ou categoria", 12, "Regular"); await TC(sub, "color/text/secondary");
    sub.x = 16; sub.y = 40; c.appendChild(sub);
    const body = T("Texto de suporte que descreve o\nconteúdo do card brevemente.", 13, "Regular");
    await TC(body, "color/text/secondary"); body.x = 16; body.y = 64; c.appendChild(body);
    const div = figma.createRectangle(); div.resize(248, 1); div.x = 16; div.y = 136;
    await F(div, "color/border/default"); c.appendChild(div);
    const act = T("Ação →", 13, "Medium"); await TC(act, "color/action/primary");
    act.x = 16; act.y = 150; c.appendChild(act);
    comps.push(c);
  }
  const set = compSet(comps, "Card", 24, 24, 20);
  set.x = x; set.y = y;
  return set;
}

// ─── BADGE ───────────────────────────────────────────────────────────────────

async function createBadge(x, y) {
  const defs = [
    { n: "Type=Default", bg: "color/background/hover",        fg: "color/text/secondary"                },
    { n: "Type=Primary", bg: "color/action/primary-subtle",   fg: "color/action/secondary-foreground"   },
    { n: "Type=Success", bg: "color/feedback/success",        fg: "color/action/primary-foreground"     },
    { n: "Type=Warning", bg: "color/feedback/warning",        fg: "color/action/primary-foreground"     },
    { n: "Type=Error",   bg: "color/feedback/error",          fg: "color/action/primary-foreground"     },
    { n: "Type=Info",    bg: "color/feedback/info",           fg: "color/action/primary-foreground"     },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n;
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisAlignItems = "CENTER"; c.counterAxisAlignItems = "CENTER";
    c.paddingLeft = 10; c.paddingRight = 10;
    c.primaryAxisSizingMode = "AUTO"; c.counterAxisSizingMode = "FIXED";
    c.resize(c.width, 24); c.cornerRadius = 100;
    await F(c, d.bg);
    const lbl = T(d.n.split("=")[1], 11, "Medium"); await TC(lbl, d.fg);
    c.appendChild(lbl);
    comps.push(c);
  }
  const set = compSet(comps, "Badge", 24, 24, 12);
  set.x = x; set.y = y;
  return set;
}

// ─── AVATAR ──────────────────────────────────────────────────────────────────

async function createAvatar(x, y) {
  const defs = [
    { n: "Size=XS", sz: 24, fs: 9 },
    { n: "Size=SM", sz: 32, fs: 11 },
    { n: "Size=MD", sz: 40, fs: 14 },
    { n: "Size=LG", sz: 48, fs: 16 },
    { n: "Size=XL", sz: 64, fs: 20 },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n; c.resize(d.sz, d.sz); c.cornerRadius = 100;
    await F(c, "color/action/primary-subtle");
    const init = T("AB", d.fs, "SemiBold"); await TC(init, "color/action/secondary-foreground");
    init.textAlignHorizontal = "CENTER";
    init.resize(d.sz, d.fs + 4);
    init.x = 0; init.y = (d.sz - d.fs - 4) / 2;
    c.appendChild(init);
    comps.push(c);
  }
  const set = compSet(comps, "Avatar");
  set.x = x; set.y = y;
  return set;
}

// ─── PROGRESS LINEAR ─────────────────────────────────────────────────────────

async function createProgress(x, y) {
  const vals = [0, 25, 50, 75, 100];
  const comps = [];
  for (const v of vals) {
    const c = figma.createComponent();
    c.name = `Value=${v}%`; c.resize(240, 4); c.cornerRadius = 100;
    await F(c, "color/background/hover");
    if (v > 0) {
      const bar = figma.createRectangle();
      bar.resize(Math.max(4, 240 * v / 100), 4); bar.cornerRadius = 100;
      await F(bar, "color/action/primary"); bar.x = 0; bar.y = 0;
      c.appendChild(bar);
    }
    comps.push(c);
  }
  const set = compSet(comps, "Progress / Linear", 24, 24, 20);
  set.x = x; set.y = y;
  return set;
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────

async function createDivider(x, y) {
  const defs = [
    { n: "Orientation=Horizontal", w: 240, h: 1  },
    { n: "Orientation=Vertical",   w: 1,   h: 80 },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n; c.resize(d.w, d.h);
    await F(c, "color/border/default");
    comps.push(c);
  }
  const set = compSet(comps, "Divider");
  set.x = x; set.y = y;
  return set;
}

// ─── SNACKBAR ────────────────────────────────────────────────────────────────

async function createSnackbar(x, y) {
  const defs = [
    { n: "Variant=Default",      action: false },
    { n: "Variant=With Action",  action: true  },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n;
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisAlignItems = "CENTER"; c.counterAxisAlignItems = "CENTER";
    c.paddingLeft = 16; c.paddingRight = 16;
    c.paddingTop = 14; c.paddingBottom = 14;
    c.itemSpacing = 16; c.cornerRadius = 8;
    c.primaryAxisSizingMode = "AUTO"; c.counterAxisSizingMode = "AUTO";
    await F(c, "color/text/primary");
    const msg = T("Ação realizada com sucesso", 13, "Regular");
    await TC(msg, "color/action/primary-foreground"); c.appendChild(msg);
    if (d.action) {
      const act = T("Desfazer", 13, "Medium"); await TC(act, "color/action/primary-subtle");
      c.appendChild(act);
    }
    comps.push(c);
  }
  const set = compSet(comps, "Snackbar");
  set.x = x; set.y = y;
  return set;
}

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────

async function createTooltip(x, y) {
  const defs = [
    { n: "Position=Top",    top: true  },
    { n: "Position=Bottom", top: false },
  ];
  const comps = [];
  for (const d of defs) {
    const c = figma.createComponent();
    c.name = d.n;
    c.layoutMode = "VERTICAL";
    c.primaryAxisAlignItems = "CENTER"; c.counterAxisAlignItems = "CENTER";
    c.itemSpacing = 2; c.primaryAxisSizingMode = "AUTO"; c.counterAxisSizingMode = "AUTO";
    c.fills = [];

    const arrow = T(d.top ? "▼" : "▲", 8, "Regular"); await TC(arrow, "color/text/primary");
    const bubble = figma.createFrame();
    bubble.layoutMode = "HORIZONTAL"; bubble.primaryAxisAlignItems = "CENTER"; bubble.counterAxisAlignItems = "CENTER";
    bubble.paddingLeft = 12; bubble.paddingRight = 12; bubble.paddingTop = 6; bubble.paddingBottom = 6;
    bubble.cornerRadius = 6; bubble.primaryAxisSizingMode = "AUTO"; bubble.counterAxisSizingMode = "AUTO";
    await F(bubble, "color/text/primary");
    const tt = T("Tooltip text", 12, "Regular"); await TC(tt, "color/action/primary-foreground");
    bubble.appendChild(tt);

    if (!d.top) c.appendChild(arrow);
    c.appendChild(bubble);
    if (d.top) c.appendChild(arrow);
    comps.push(c);
  }
  const set = compSet(comps, "Tooltip", 24, 24, 20);
  set.x = x; set.y = y;
  return set;
}

// ─── TABS ────────────────────────────────────────────────────────────────────

async function createTabs(x, y) {
  const f = figma.createFrame();
  f.name = "Tabs"; f.layoutMode = "VERTICAL";
  f.primaryAxisSizingMode = "AUTO"; f.counterAxisSizingMode = "FIXED";
  f.resize(480, f.height); f.itemSpacing = 0; f.cornerRadius = 8;
  await F(f, "color/background/surface"); await S(f, "color/border/default", 1);

  const row = figma.createFrame();
  row.layoutMode = "HORIZONTAL"; row.primaryAxisSizingMode = "FIXED";
  row.counterAxisSizingMode = "AUTO"; row.resize(480, row.height); row.itemSpacing = 0; row.fills = [];

  for (const [i, name] of ["Overview", "Features", "Pricing", "Docs"].entries()) {
    const tab = figma.createFrame();
    tab.layoutMode = "VERTICAL"; tab.primaryAxisAlignItems = "CENTER"; tab.counterAxisAlignItems = "CENTER";
    tab.primaryAxisSizingMode = "AUTO"; tab.counterAxisSizingMode = "FIXED";
    tab.resize(120, tab.height); tab.paddingTop = 12; tab.paddingBottom = 0; tab.fills = [];

    const lbl = T(name, 14, i === 0 ? "SemiBold" : "Regular");
    await TC(lbl, i === 0 ? "color/action/primary" : "color/text/secondary");
    tab.appendChild(lbl);

    const ind = figma.createRectangle(); ind.resize(120, 2); ind.cornerRadius = 1;
    if (i === 0) await F(ind, "color/action/primary"); else ind.fills = [];
    tab.appendChild(ind);
    row.appendChild(tab);
  }
  f.appendChild(row);

  const content = figma.createFrame();
  content.layoutMode = "HORIZONTAL"; content.primaryAxisAlignItems = "CENTER"; content.counterAxisAlignItems = "CENTER";
  content.primaryAxisSizingMode = "FIXED"; content.counterAxisSizingMode = "FIXED";
  content.resize(480, 72); content.fills = [];
  const ct = T("Área de conteúdo da aba", 14, "Regular"); await TC(ct, "color/text/secondary");
  content.appendChild(ct); f.appendChild(content);

  f.x = x; f.y = y;
  figma.currentPage.appendChild(f);
  return f;
}

// ─── NAVIGATION BAR ──────────────────────────────────────────────────────────

async function createNavBar(x, y) {
  const f = figma.createFrame();
  f.name = "Navigation Bar"; f.layoutMode = "HORIZONTAL";
  f.primaryAxisAlignItems = "CENTER"; f.counterAxisAlignItems = "CENTER";
  f.primaryAxisSizingMode = "FIXED"; f.counterAxisSizingMode = "AUTO";
  f.resize(360, f.height); f.paddingTop = 12; f.paddingBottom = 16; f.itemSpacing = 0;
  await F(f, "color/background/surface"); await S(f, "color/border/default", 1);

  for (const [i, item] of [["⊞","Home"], ["◎","Explorar"], ["♡","Salvos"], ["◉","Perfil"]].entries()) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL"; col.primaryAxisAlignItems = "CENTER"; col.counterAxisAlignItems = "CENTER";
    col.primaryAxisSizingMode = "AUTO"; col.counterAxisSizingMode = "FIXED";
    col.resize(90, col.height); col.itemSpacing = 4; col.fills = [];

    const pill = figma.createRectangle(); pill.resize(64, 32); pill.cornerRadius = 100;
    if (i === 0) await F(pill, "color/action/primary-subtle"); else pill.fills = [];

    const ico = T(item[0], 18, i === 0 ? "SemiBold" : "Regular");
    await TC(ico, i === 0 ? "color/action/primary" : "color/text/secondary");

    const lbl = T(item[1], 11, i === 0 ? "Medium" : "Regular");
    await TC(lbl, i === 0 ? "color/action/primary" : "color/text/secondary");

    col.appendChild(pill); col.appendChild(ico); col.appendChild(lbl);
    f.appendChild(col);
  }

  f.x = x; f.y = y;
  figma.currentPage.appendChild(f);
  return f;
}

// ─── TYPOGRAPHY ──────────────────────────────────────────────────────────────

async function createTypography(x, y) {
  const f = figma.createFrame();
  f.name = "Typography Scale"; f.layoutMode = "VERTICAL";
  f.primaryAxisAlignItems = "MIN"; f.counterAxisAlignItems = "MIN";
  f.primaryAxisSizingMode = "AUTO"; f.counterAxisSizingMode = "AUTO";
  f.itemSpacing = 12; f.paddingLeft = 24; f.paddingRight = 40; f.paddingTop = 24; f.paddingBottom = 24;
  await F(f, "color/background/surface"); f.cornerRadius = 8;

  const scale = [
    ["Display L",  57, "Regular",  "Display Large — Hero"],
    ["Display M",  45, "Regular",  "Display Medium"],
    ["H1",         40, "Bold",     "Heading 1 — Brand Title"],
    ["H2",         32, "Bold",     "Heading 2 — Page Title"],
    ["H3",         24, "SemiBold", "Heading 3 — Section"],
    ["H4",         20, "SemiBold", "Heading 4 — Card Title"],
    ["Title L",    22, "Regular",  "Title Large"],
    ["Title M",    16, "Medium",   "Title Medium"],
    ["Body L",     18, "Regular",  "Body Large — Primary text"],
    ["Body M",     16, "Regular",  "Body Medium — Default"],
    ["Body S",     14, "Regular",  "Body Small — Helper"],
    ["Label L",    14, "Medium",   "Label Large — Buttons"],
    ["Label M",    12, "Medium",   "Label Medium — Captions"],
    ["Label S",    11, "Medium",   "Label Small — Overline"],
  ];

  for (const [tag, sz, style, chars] of scale) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL"; row.primaryAxisAlignItems = "CENTER";
    row.counterAxisAlignItems = "MIN"; row.primaryAxisSizingMode = "AUTO";
    row.counterAxisSizingMode = "AUTO"; row.itemSpacing = 16; row.fills = [];

    const tagN = T(tag, 10, "Medium"); await TC(tagN, "color/text/secondary");
    tagN.opacity = 0.6; tagN.resize(64, tagN.height); row.appendChild(tagN);

    const line = figma.createRectangle(); line.resize(1, Math.max(sz, 16));
    await F(line, "color/border/default"); row.appendChild(line);

    const textN = T(chars, sz, style); await TC(textN, "color/text/primary");
    row.appendChild(textN); f.appendChild(row);
  }
  f.x = x; f.y = y;
  figma.currentPage.appendChild(f);
  return f;
}

// ─── COMPONENT MAP ───────────────────────────────────────────────────────────

const COMP_MAP = {
  button:     { label: "Button",          fn: createButton    },
  fab:        { label: "FAB",             fn: createFAB       },
  textfield:  { label: "Text Field",      fn: createTextField },
  checkbox:   { label: "Checkbox",        fn: createCheckbox  },
  radio:      { label: "Radio",           fn: createRadio     },
  switch_:    { label: "Switch",          fn: createSwitch    },
  chip:       { label: "Chip",            fn: createChip      },
  card:       { label: "Card",            fn: createCard      },
  badge:      { label: "Badge",           fn: createBadge     },
  avatar:     { label: "Avatar",          fn: createAvatar    },
  progress:   { label: "Progress",        fn: createProgress  },
  divider:    { label: "Divider",         fn: createDivider   },
  snackbar:   { label: "Snackbar",        fn: createSnackbar  },
  tooltip:    { label: "Tooltip",         fn: createTooltip   },
  tabs:       { label: "Tabs",            fn: createTabs      },
  navbar:     { label: "Nav Bar",         fn: createNavBar    },
  typography: { label: "Typography",      fn: createTypography},
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────

figma.ui.onmessage = async (msg) => {
  if (msg.type === "generate") {
    try {
      figma.ui.postMessage({ type: "status", text: "⏳ Carregando fontes..." });
      await loadFonts();

      const ids = msg.components;
      const COLS = 3, COL_W = 580, ROW_H = 460;
      const nodes = [];

      for (let i = 0; i < ids.length; i++) {
        const { label, fn } = COMP_MAP[ids[i]];
        const col = i % COLS, row = Math.floor(i / COLS);
        const x = col * COL_W, y = row * ROW_H;

        figma.ui.postMessage({ type: "progress", current: i + 1, total: ids.length, label });
        await sectionLabel(label.toUpperCase(), x, y - 24);
        const node = await fn(x, y);
        nodes.push(node);
      }

      figma.viewport.scrollAndZoomIntoView(nodes);
      figma.ui.postMessage({ type: "success", text: `✅ ${ids.length} componentes criados!` });

    } catch (err) {
      figma.ui.postMessage({ type: "error", text: `❌ ${err.message}` });
    }
  }
  if (msg.type === "close") figma.closePlugin();
};
