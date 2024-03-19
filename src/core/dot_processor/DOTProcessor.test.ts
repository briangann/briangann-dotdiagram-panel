import { SampleDiagram } from './SampleDiagrams';
import { ProcessDOTDiagram, DOTDiagramFind } from './DOTProcessor';
import { DOTDiagramData } from 'core/dot_processor/datamodel';

describe('DOT Processor', () => {
  const data: DOTDiagramData = {
    Processed: [
      {
        Name: 'ANode',
        Value: 92.439,
        ValueFormatted: '92.44%',
        Color: 'yellow',
        Filled: true,
      },
      {
        Name: 'AtoCEdge',
        Value: 12.345,
        ValueFormatted: '12.345 Mh/s',
        Color: 'green',
        Filled: true,
      },
      {
        Name: 'CNode',
        Value: 333.0,
        ValueFormatted: '333 Res',
        Color: 'green',
        Filled: true,
      },
    ],
  };
  it('should return item C-Node', () => {
    const resultC = DOTDiagramFind(data.Processed, 'CNode');
    if (resultC !== null) {
      expect(resultC.Value).toEqual(333.0);
    }
  });
  it('should return null item', () => {
    const resultZ = DOTDiagramFind(data.Processed, 'ZNode');
    expect(resultZ).toBeNull();
  });

  it('should return a dot diagram', () => {
    const result = ProcessDOTDiagram(data, SampleDiagram.Diagram3);
    expect(result).toBeDefined();
  });
});
