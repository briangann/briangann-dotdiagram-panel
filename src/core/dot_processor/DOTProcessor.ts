import { DOTDiagramData, DOTDiagramProcessed } from 'core/dot_processor/datamodel';

// @ts-ignore
import { parse, AST, convert } from '@ts-graphviz/parser';
//import parse from 'dotparser';
// @ts-ignore
import { toDot, NodeRef, EdgeAttributes, DotObjectModel, DotObjectType, Node, Graph, fromDot } from 'ts-graphviz';

export function ProcessDOTDiagram(data: DOTDiagramData, content: string): string {
  //  const graph = parse(content);
  console.log('inside ProcessDOTDiagram');
  const graph = fromDot(content);
  console.log('parsed raw dot diagram');
  console.log(graph);

  // state -> color
  // fontColor -> Value Color
  //

  /*
  type Node =
    | typeof URL
    | typeof area
    | typeof color
    | typeof colorscheme
    | typeof comment
    | typeof distortion
    | typeof fillcolor
    | typeof fixedsize
    | typeof fontcolor
    | typeof fontname
    | typeof fontsize
    | typeof gradientangle
    | typeof group
    | typeof height
    | typeof href
    | typeof id
    | typeof image
    | typeof imagepos
    | typeof imagescale
    | typeof label
    | typeof labelloc
    | typeof layer
    | typeof margin
    | typeof nojustify
    | typeof ordering
    | typeof orientation
    | typeof penwidth
    | typeof peripheries
    | typeof pin
    | typeof pos
    | typeof rects
    | typeof regular
    | typeof root
    | typeof samplepoints
    | typeof shape
    | typeof shapefile
    | typeof showboxes
    | typeof sides
    | typeof skew
    | typeof sortv
    | typeof style
    | typeof target
    | typeof tooltip
    | typeof vertices
    | typeof width
    | typeof xlabel
    | typeof xlp
    | typeof z;
  */

  /*
  URL
  href
  label
  tooltip
  xlabel
  style = filled or ""
  */

  // SVG has a TITLE tooltip by default, might interfere with panel

  for (let aNode of graph.nodes) {
    //console.log(aNode.attributes.values);
    const item = DOTDiagramFind(data.Processed, aNode.id);
    if (item) {
      aNode.attributes.apply({
        color: 'grey',
        fillcolor: 'blue',
        fontcolor: 'green',
        fontsize: 15,
        tooltip: aNode.id + ' tooltip',
        href: 'meh',
        style: 'filled',
        label: aNode.id + '\n' + item.ValueFormatted,
      });
    }
    //console.log(aNode.attributes.values);
    //aNode.fontcolor("grey");
  }

  /*

    type Edge =
    | typeof URL
    | typeof arrowhead
    | typeof arrowsize
    | typeof arrowtail
    | typeof color
    | typeof colorscheme
    | typeof comment
    | typeof constraint
    | typeof decorate
    | typeof dir
    | typeof edgeURL
    | typeof edgehref
    | typeof edgetarget
    | typeof edgetooltip
    | typeof fillcolor
    | typeof fontcolor
    | typeof fontname
    | typeof fontsize
    | typeof headURL
    | typeof head_lp
    | typeof headclip
    | typeof headhref
    | typeof headlabel
    | typeof headport
    | typeof headtarget
    | typeof headtooltip
    | typeof href
    | typeof id
    | typeof label
    | typeof labelURL
    | typeof labelangle
    | typeof labeldistance
    | typeof labelfloat
    | typeof labelfontcolor
    | typeof labelfontname
    | typeof labelfontsize
    | typeof labelhref
    | typeof labeltarget
    | typeof labeltooltip
    | typeof layer
    | typeof len
    | typeof lhead
    | typeof lp
    | typeof ltail
    | typeof minlen
    | typeof nojustify
    | typeof penwidth
    | typeof pos
    | typeof samehead
    | typeof sametail
    | typeof showboxes
    | typeof style
    | typeof tailURL
    | typeof tail_lp
    | typeof tailclip
    | typeof tailhref
    | typeof taillabel
    | typeof tailport
    | typeof tailtarget
    | typeof tailtooltip
    | typeof target
    | typeof tooltip
    | typeof weight
    | typeof xlabel
    | typeof xlp;

  */

  /*
    these will be interesting
      weight
      labeltooltip
      labelhref
      href
      tooltip
      fontsize
      fillcolor
      fontcolor
      fontsize

      headlabel
      headhref
      taillabel
      tailhref


  */
  for (let anEdge of graph.edges) {
    const attributesOfEdge = anEdge.attributes;
    const edgeLabel = attributesOfEdge.get('label');
    if (edgeLabel) {
      const item = DOTDiagramFind(data.Processed, edgeLabel.toString());
      if (item) {
        anEdge.attributes.apply({
          color: 'orange',
          label: item?.Name + '\n' + item?.ValueFormatted,
        });
      }
    }

    const fromNodeEdge = anEdge.targets[0] as NodeRef;
    const fromItem = DOTDiagramFind(data.Processed, fromNodeEdge.id);
    if (fromItem) {
      anEdge.attributes.apply({
        color: 'yellow',
        fontcolor: 'green',
        fontsize: 8,
        taillabel: fromNodeEdge.id + '\nlabel',
      });
    }
    const toNodeEdge = anEdge.targets[1] as NodeRef;
    const toItem = DOTDiagramFind(data.Processed, toNodeEdge.id);
    if (toItem) {
      anEdge.attributes.apply({
        color: 'yellow',
        fontcolor: 'green',
        fontsize: 8,
        headlabel: toNodeEdge.id + '\nlabel',
      });
    }
  }
  //console.log(toDot(graph));
  //const graph2 = AST.parse(content);
  //const zz = AST.stringify(graph2); // output is correct
  //const meh = parse(content); // meh has lost doublecircle on ABC
  //const yy = toDot(meh);
  //const ugh = convert(graph2); // this whacks the whole thing
  //console.log(toDot(meh));
  console.log(toDot(graph));
  return toDot(graph);
}

/**
 * Converts dataframes to DOT model
 *
 * @param   {any}             data  [data description]
 *
 * @return  {DOTDiagramData}        [return description]
 */
export function DOTDiagramProcessRaw(data: any): DOTDiagramData | null {
  return null;
}

/**
 * Checks processed data for matching series
 *
 * @param   {DOTDiagramProcessed[]}  data  [data description]
 * @param   {string}                 name  [name description]
 *
 * @return  {DOTDiagramProcessed}          [return description]
 */
export function DOTDiagramFind(data: DOTDiagramProcessed[], name: string): DOTDiagramProcessed | null {
  for (let anItem of data) {
    if (anItem.Name === name) {
      return anItem;
    }
  }
  return null;
}
