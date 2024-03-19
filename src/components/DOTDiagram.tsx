import React, { useState, useEffect, useCallback } from 'react';
import * as Viz from '../libs/viz.js/viz.js';
import { Module, render } from '../libs/viz.js/full.render.js';
import { ProcessDOTDiagram } from '../core/dot_processor/DOTProcessor';
import { DOTDiagramData } from 'core/dot_processor/datamodel';

// look at this
//
// https://github.com/mdaines/viz.js/issues/161
// https://github.com/mdaines/viz-examples/blob/0a9f7100aa73ff6f4ec4b4e150a842033a058ade/webpack/index.js#L2-L4

interface DOTDiagramOptions {
  data: DOTDiagramData | null;
  fontSize: number;
  panelWidth: any;
  panelHeight: any;
  content: string;
}

export const DOTDiagram: React.FC<DOTDiagramOptions> = (options) => {
  const [SVG, setSVG] = useState<SVGSVGElement | undefined>();
  //const viz = new Viz({ Module, render });

  const messageStyle = {
    color: 'yellow',
  };

  const renderDOTDiagram = useCallback(
    async (content: string) => {
      const viz = new Viz({ Module, render });
      const svg = await viz.renderSVGElement(content).then((element: any) => {
        //console.log('RenderDiagram: renderSVGElement');
        return element;
      });
      // fill the container
      svg.style.width = options.panelWidth + 'px';
      svg.style.height = options.panelHeight + 'px';
      setSVG(svg);
    },
    [options.panelHeight, options.panelWidth]
  );

  useEffect(() => {
    if (options.data && options.data.Processed) {
      console.log('new data');
      const newContent = ProcessDOTDiagram(options.data, options.content);
      renderDOTDiagram(newContent);
    } else {
      console.info('no data, skipping');
      renderDOTDiagram(options.content);
    }
  }, [options, renderDOTDiagram]);

  if (SVG) {
    // @ts-ignore
    return <div ref={(node) => node?.replaceChildren(SVG)}></div>;
  } else {
    return <div style={messageStyle}>Wait for rendering to complete...</div>;
  }
};

/*
const attributer = (datum: any, index: any, nodes: any) => {
  var selection = d3.select(self);
  const scale = 0.8
  if (datum.tag == "svg") {
      datum.attributes = {
          ...datum.attributes,
          width: '100%',
          height: '100%',
      };
      // svg is constructed by hpcc-js/wasm, which uses pt instead of px, so need to convert
      const px2pt = 3 / 4;

      // get graph dimensions in px. These can be grabbed from the viewBox of the svg
      // that hpcc-js/wasm generates
      const graphWidth = datum.attributes.viewBox.split(' ')[2] / px2pt;
      const graphHeight = datum.attributes.viewBox.split(' ')[3] / px2pt;

      // new viewBox width and height
      const w = graphWidth / scale;
      const h = graphHeight / scale;

      // new viewBox origin to keep the graph centered
      const x = -(w - graphWidth) / 2;
      const y = -(h - graphHeight) / 2;

      const viewBox = `${x * px2pt} ${y * px2pt} ${w * px2pt} ${h * px2pt}`;
      selection.attr('viewBox', viewBox);
      datum.attributes.viewBox = viewBox;
  }
}
*/
