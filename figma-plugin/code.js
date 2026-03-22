// Design System Variables Plugin
// Cria automaticamente as coleções Primitives e Semantic (Brand A / Brand B)

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

// ─── TOKENS PRIMITIVOS (Base) ───────────────────────────────────────────────
const PRIMITIVES = {
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
  "color/indigo/50":   "#eef2ff",
  "color/indigo/100":  "#e0e7ff",
  "color/indigo/400":  "#818cf8",
  "color/indigo/500":  "#6366f1",
  "color/indigo/600":  "#4f46e5",
  "color/indigo/700":  "#4338ca",
  "color/rose/50":     "#fff1f2",
  "color/rose/100":    "#ffe4e6",
  "color/rose/400":    "#fb7185",
  "color/rose/500":    "#f43f5e",
  "color/rose/600":    "#e11d48",
  "color/rose/700":    "#be123c",
  "color/green/500":   "#22c55e",
  "color/amber/500":   "#f59e0b",
  "color/red/500":     "#ef4444",
  "color/blue/500":    "#3b82f6"
};

// ─── TOKENS SEMÂNTICOS (Brand A = Indigo | Brand B = Rose) ──────────────────
const SEMANTIC_TOKENS = [
  // Action
  { name: "color/action/primary",               brandA: "color/indigo/500", brandB: "color/rose/500"   },
  { name: "color/action/primary-hover",         brandA: "color/indigo/600", brandB: "color/rose/600"   },
  { name: "color/action/primary-subtle",        brandA: "color/indigo/50",  brandB: "color/rose/50"    },
  { name: "color/action/primary-foreground",    brandA: "color/neutral/0",  brandB: "color/neutral/0"  },
  { name: "color/action/secondary-foreground",  brandA: "color/indigo/500", brandB: "color/rose/500"   },
  // Background
  { name: "color/background/default",           brandA: "color/neutral/0",   brandB: "color/neutral/0"   },
  { name: "color/background/surface",           brandA: "color/neutral/50",  brandB: "color/neutral/50"  },
  { name: "color/background/hover",             brandA: "color/neutral/100", brandB: "color/neutral/100" },
  // Text
  { name: "color/text/primary",                 brandA: "color/neutral/900", brandB: "color/neutral/900" },
  { name: "color/text/secondary",               brandA: "color/neutral/500", brandB: "color/neutral/500" },
  { name: "color/text/inverse",                 brandA: "color/neutral/0",   brandB: "color/neutral/0"   },
  // Border
  { name: "color/border/default",               brandA: "color/neutral/200", brandB: "color/neutral/200" },
  // Feedback
  { name: "color/feedback/success",             brandA: "color/green/500",  brandB: "color/green/500"  },
  { name: "color/feedback/warning",             brandA: "color/amber/500",  brandB: "color/amber/500"  },
  { name: "color/feedback/error",               brandA: "color/red/500",    brandB: "color/red/500"    },
  { name: "color/feedback/info",                brandA: "color/blue/500",   brandB: "color/blue/500"   }
];

// ─── MAIN ────────────────────────────────────────────────────────────────────
figma.showUI(__html__, { width: 420, height: 340, title: "Design System Variables" });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-variables') {
    try {
      // ETAPA 1: Coleção de Primitivos
      figma.ui.postMessage({ type: 'status', text: '⏳ Criando coleção Primitives...' });

      const primitivesCollection = figma.variables.createVariableCollection("Primitives");
      const defaultModeId = primitivesCollection.defaultModeId;
      primitivesCollection.renameMode(defaultModeId, "Default");

      const primitiveVarIds = {};

      for (const [name, hex] of Object.entries(PRIMITIVES)) {
        const variable = figma.variables.createVariable(name, primitivesCollection, "COLOR");
        variable.setValueForMode(defaultModeId, hexToRgb(hex));
        primitiveVarIds[name] = variable.id;
      }

      figma.ui.postMessage({ type: 'status', text: '⏳ Criando coleção Semantic (Brand A / Brand B)...' });

      // ETAPA 2: Coleção Semântica com 2 modos
      const semanticCollection = figma.variables.createVariableCollection("Semantic");
      const brandAModeId = semanticCollection.defaultModeId;
      semanticCollection.renameMode(brandAModeId, "Brand A");
      const brandBModeId = semanticCollection.addMode("Brand B");

      for (const token of SEMANTIC_TOKENS) {
        const variable = figma.variables.createVariable(token.name, semanticCollection, "COLOR");

        variable.setValueForMode(brandAModeId, {
          type: 'VARIABLE_ALIAS',
          id: primitiveVarIds[token.brandA]
        });

        variable.setValueForMode(brandBModeId, {
          type: 'VARIABLE_ALIAS',
          id: primitiveVarIds[token.brandB]
        });
      }

      const total = Object.keys(PRIMITIVES).length + SEMANTIC_TOKENS.length;
      figma.ui.postMessage({
        type: 'success',
        text: `✅ Pronto! ${Object.keys(PRIMITIVES).length} primitivos + ${SEMANTIC_TOKENS.length} tokens semânticos criados.`
      });

    } catch (err) {
      figma.ui.postMessage({ type: 'error', text: `❌ Erro: ${err.message}` });
    }
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
