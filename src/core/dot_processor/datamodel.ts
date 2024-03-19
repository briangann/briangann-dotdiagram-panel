/**
 * DOTDiagramProcessed
 *
 * Holds Node and Edge Values
 */
export interface DOTDiagramProcessed {
  Name: string;
  Value: number;
  ValueFormatted: string;
  Color: string;
  Filled?: boolean;
  URL?: string;
}

/**
 * DOTDiagramData list of all processed data
 *
 * add thresholds/config options?
 */
export interface DOTDiagramData {
  Processed: DOTDiagramProcessed[];
}
