import { PanelPlugin } from '@grafana/data';
import { DOTDiagramOptions } from './types';
import { CompositeItemType } from './core/composites/components/types';
import { getPanelPluginOrFallback } from 'grafana-plugin-support';
import { DOTDiagramPanel } from './components/DOTDiagramPanel';
import { CompositeEditor } from './core/composites/components/CompositeEditor';

export const plugin = getPanelPluginOrFallback(
  'briangann-dotdiagram-panel',
  new PanelPlugin<DOTDiagramOptions>(DOTDiagramPanel).useFieldConfig().setPanelOptions((builder) => {
    builder
      .addUnitPicker({
        path: 'unitFormat',
        name: 'Unit',
        defaultValue: 'short',
      })
      .addColorPicker({
        name: 'Edge Color',
        path: 'edgeColor',
        defaultValue: 'white',
      })
      .addColorPicker({
        name: 'Label Color',
        path: 'labelColor',
        defaultValue: 'white',
      })
      .addNumberInput({
        name: 'Font Size',
        path: 'fontSize',
        defaultValue: 12,
      })
      .addCustomEditor({
        id: 'compositeConfig',
        path: 'compositeConfig',
        name: 'Composites',
        description: 'Composites...',
        editor: CompositeEditor,
        defaultValue: {
          composites: [] as CompositeItemType[],
          enabled: true,
          animationSpeed: '500',
        },
        category: ['Composites'],
      })
      .addTextInput({
        path: 'content',
        name: 'DOT Notation',
        category: ['Diagram Notation'],
        description: 'Notation to be displayed',
        settings: {
          useTextarea: true,
          rows: 10,
        },
        defaultValue: `digraph {
          rankdir = LR;
          node [fontcolor=white,color=green,shape=doublecircle]; A B C;
          node [fontcolor=orange,color=yellow,shape = circle];
          edge [arrowhead=vee,color=white,fontcolor=white];
          A -> C [ arrowhead=dot, color=red, fontcolor=red,label="AtoC" ];
          A -> B [ label = "AtoB" ];
          B -> C [ label = "BtoC" ];
          C -> D [ label = "CtoD" ];
          D -> E [ label = "DtoE" ];
          }
        `,
      });
  })
);
