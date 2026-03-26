// Design System Variables Plugin — White Label Payment Platform
// Cria automaticamente as colecoes Primitives e Semantic (5 modos)
// Modos: Wireframe, Brand A (iFood), Brand B (POS Verde), Brand C (POS Azul), Brand D (POS Roxo)

// Helper: converte hex para RGB no formato do Figma (0 a 1)
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0, a: 1 };
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: 1
  };
}

// ─── TOKENS PRIMITIVOS ───────────────────────────────────────────────
const PRIMITIVES = {
  // Neutros
  "color/neutral/0":   "#ffffff",
  "color/neutral/50":  "#fafafa",
  "color/neutral/100": "#f5f5f5",
  "color/neutral/200": "#e5e5e5",
  "color/neutral/300": "#d4d4d4",
  "color/neutral/400": "#a3a3a3",
  "color/neutral/500": "#737373",
  "color/neutral/600": "#525252",
  "color/neutral/700": "#404040",
  "color/neutral/800": "#262626",
  "color/neutral/900": "#171717",
  // Wireframe
  "color/wireframe/100": "#F2F2F2",
  "color/wireframe/200": "#E5E5E5",
  "color/wireframe/300": "#CCCCCC",
  "color/wireframe/400": "#999999",
  "color/wireframe/500": "#666666",
  // Red (iFood)
  "color/red/50":  "#FFF0F0",
  "color/red/500": "#E00C2C",
  "color/red/600": "#B8091F",
  // Orange
  "color/orange/500": "#FF6B1F",
  // Green (POS Verde)
  "color/green/50":  "#F0FFF0",
  "color/green/500": "#228B22",
  "color/green/600": "#1A6B1A",
  // Yellow
  "color/yellow/500": "#FFD700",
  // Blue (POS Azul)
  "color/blue/50":  "#F0F7FF",
  "color/blue/500": "#0066CC",
  "color/blue/600": "#0052A3",
  // Amber
  "color/amber/500": "#FFCC00",
  // Purple (POS Roxo)
  "color/purple/50":  "#F5F0FF",
  "color/purple/500": "#6A0DAD",
  "color/purple/600": "#550A8A",
  // Feedback
  "color/feedback/success": "#22C55E",
  "color/feedback/warning": "#F59E0B",
  "color/feedback/error":   "#EF4444",
  "color/feedback/info":    "#3B82F6"
};

// ─── TOKENS SEMANTICOS (5 modos) ──────────────────────────────────────
const SEMANTIC_TOKENS = [
  {
    name: "color/action/primary",
    wireframe: "color/wireframe/400", brandA: "color/red/500",
    brandB: "color/green/500",        brandC: "color/blue/500",
    brandD: "color/purple/500"
  },
  {
    name: "color/action/primary-hover",
    wireframe: "color/wireframe/500", brandA: "color/red/600",
    brandB: "color/green/600",        brandC: "color/blue/600",
    brandD: "color/purple/600"
  },
  {
    name: "color/action/primary-subtle",
    wireframe: "color/wireframe/100", brandA: "color/red/50",
    brandB: "color/green/50",         brandC: "color/blue/50",
    brandD: "color/purple/50"
  },
  {
    name: "color/action/primary-foreground",
    wireframe: "color/neutral/0",     brandA: "color/neutral/0",
    brandB: "color/neutral/0",        brandC: "color/neutral/0",
    brandD: "color/neutral/0"
  },
  {
    name: "color/action/secondary-foreground",
    wireframe: "color/wireframe/500", brandA: "color/red/500",
    brandB: "color/green/500",        brandC: "color/blue/500",
    brandD: "color/purple/500"
  },
  {
    name: "color/background/default",
    wireframe: "color/neutral/0",     brandA: "color/neutral/0",
    brandB: "color/neutral/900",      brandC: "color/neutral/0",
    brandD: "color/neutral/900"
  },
  {
    name: "color/background/surface",
    wireframe: "color/wireframe/100", brandA: "color/neutral/50",
    brandB: "color/neutral/800",      brandC: "color/neutral/50",
    brandD: "color/neutral/800"
  },
  {
    name: "color/background/hover",
    wireframe: "color/wireframe/200", brandA: "color/neutral/100",
    brandB: "color/neutral/700",      brandC: "color/neutral/100",
    brandD: "color/neutral/700"
  },
  {
    name: "color/text/primary",
    wireframe: "color/wireframe/500", brandA: "color/neutral/900",
    brandB: "color/neutral/0",        brandC: "color/neutral/900",
    brandD: "color/neutral/0"
  },
  {
    name: "color/text/secondary",
    wireframe: "color/wireframe/400", brandA: "color/neutral/500",
    brandB: "color/neutral/400",      brandC: "color/neutral/500",
    brandD: "color/neutral/400"
  },
  {
    name: "color/text/inverse",
    wireframe: "color/neutral/0",     brandA: "color/neutral/0",
    brandB: "color/neutral/900",      brandC: "color/neutral/0",
    brandD: "color/neutral/900"
  },
  {
    name: "color/border/default",
    wireframe: "color/wireframe/200", brandA: "color/neutral/200",
    brandB: "color/neutral/700",      brandC: "color/neutral/200",
    brandD: "color/neutral/700"
  },
  {
    name: "color/feedback/success",
    wireframe: "color/wireframe/300", brandA: "color/feedback/success",
    brandB: "color/feedback/success", brandC: "color/feedback/success",
    brandD: "color/feedback/success"
  },
  {
    name: "color/feedback/warning",
    wireframe: "color/wireframe/300", brandA: "color/feedback/warning",
    brandB: "color/feedback/warning", brandC: "color/feedback/warning",
    brandD: "color/feedback/warning"
  },
  {
    name: "color/feedback/error",
    wireframe: "color/wireframe/300", brandA: "color/feedback/error",
    brandB: "color/feedback/error",   brandC: "color/feedback/error",
    brandD: "color/feedback/error"
  },
  {
    name: "color/feedback/info",
    wireframe: "color/wireframe/300", brandA: "color/feedback/info",
    brandB: "color/feedback/info",    brandC: "color/feedback/info",
    brandD: "color/feedback/info"
  }
];

// ─── MAIN ────────────────────────────────────────────────────────────────────
figma.showUI(__html__, { width: 460, height: 380, title: "Design System — White Label Payment Platform" });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-variables') {
    try {
      figma.ui.postMessage({ type: 'status', text: 'Criando colecao Primitives...' });

      const primitivesCollection = figma.variables.createVariableCollection("Primitives");
      const defaultModeId = primitivesCollection.defaultModeId;
      primitivesCollection.renameMode(defaultModeId, "Default");

      const primitiveVarIds = {};

      for (const [name, hex] of Object.entries(PRIMITIVES)) {
        const variable = figma.variables.createVariable(name, primitivesCollection, "COLOR");
        variable.setValueForMode(defaultModeId, hexToRgb(hex));
        primitiveVarIds[name] = variable.id;
      }

      figma.ui.postMessage({ type: 'status', text: 'Criando colecao Semantic (5 modos)...' });

      const semanticCollection = figma.variables.createVariableCollection("Semantic");
      const wireframeModeId = semanticCollection.defaultModeId;
      semanticCollection.renameMode(wireframeModeId, "Wireframe");
      const brandAModeId = semanticCollection.addMode("Brand A — iFood");
      const brandBModeId = semanticCollection.addMode("Brand B — POS Verde");
      const brandCModeId = semanticCollection.addMode("Brand C — POS Azul");
      const brandDModeId = semanticCollection.addMode("Brand D — POS Roxo");

      for (const token of SEMANTIC_TOKENS) {
        const variable = figma.variables.createVariable(token.name, semanticCollection, "COLOR");

        const modeMap = [
          [wireframeModeId, token.wireframe],
          [brandAModeId,    token.brandA],
          [brandBModeId,    token.brandB],
          [brandCModeId,    token.brandC],
          [brandDModeId,    token.brandD],
        ];

        for (const [modeId, primitiveName] of modeMap) {
          variable.setValueForMode(modeId, {
            type: 'VARIABLE_ALIAS',
            id: primitiveVarIds[primitiveName]
          });
        }
      }

      const totalPrimitives = Object.keys(PRIMITIVES).length;
      const totalSemantic = SEMANTIC_TOKENS.length;
      figma.ui.postMessage({
        type: 'success',
        text: `Pronto! ${totalPrimitives} primitivos + ${totalSemantic} tokens semanticos x 5 modos criados.`
      });

    } catch (err) {
      figma.ui.postMessage({ type: 'error', text: `Erro: ${err.message}` });
    }
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
