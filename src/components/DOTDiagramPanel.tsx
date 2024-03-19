import React from 'react';
import { PanelProps, GrafanaTheme } from '@grafana/data';
import { DOTDiagramOptions } from 'types';
import { DOTDiagram } from './DOTDiagram';
import { css, cx } from 'emotion';
import { useStyles } from '@grafana/ui';
import { DOTDiagramProcessRaw } from '../core/dot_processor/DOTProcessor';

interface Props extends PanelProps<DOTDiagramOptions> {}

const getComponentStyles = (theme: GrafanaTheme) => {
  return {
    wrapper: css`
      position: relative;
    `,
    chartContainer: css`
      align-items: center;
      justify-content: center;
      display: flex;
      height: 100%;
      width: 100%;
      & svg > g > polygon {
        fill: transparent;
      }
    `,
  };
};

export const DOTDiagramPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = useStyles(getComponentStyles);
  const { content, fontSize } = options;
  const processedData = DOTDiagramProcessRaw(data);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div className={cx(styles.chartContainer)}>
        <DOTDiagram
          data={processedData}
          fontSize={fontSize}
          panelWidth={width}
          panelHeight={height}
          content={content}
        />
      </div>
    </div>
  );
};
