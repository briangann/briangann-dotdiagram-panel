/*jshint esversion: 6 */

import { SampleDiagram } from './SampleDiagrams';
describe('SampleDiagrams test', () => {
  it('Diagram1 should have an LR diagram', () => {
    expect(SampleDiagram.Diagram1).toContain('rankdir = LR');
  });
  it('Diagram2 should have subgraph', () => {
    expect(SampleDiagram.Diagram2).toContain('subgraph');
  });
  it('Diagram3 should have digraph', () => {
    expect(SampleDiagram.Diagram3).toContain('digraph');
  });
});
