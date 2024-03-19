import React, { useState } from 'react';

import { IconName, Button, Input, Select, Field, FieldSet, Switch, Card, IconButton, Modal, Alert } from '@grafana/ui';
import { DisplayModes, CompositeItemProps, CompositeMetric, CompositeItemType } from './types';
import { CompositeMetricItem } from './CompositeMetricItem';
import { SelectableValue } from '@grafana/data';
import { v4 as uuidv4 } from 'uuid';

export const CompositeItem: React.FC<CompositeItemProps> = (options: CompositeItemProps) => {
  const [composite, _setComposite] = useState(options.composite);
  const setComposite = (value: CompositeItemType) => {
    _setComposite(value);
    options.setter(composite.order, value);
  };
  //const [composite, setComposite] = useState(options.composite);
  //const [showName, setShowName] = useState(composite.showName);
  //const [metrics, setMetrics] = useState<Array<CompositeMetric>>(options.composite.metrics)
  const [visibleIcon] = useState<IconName>('eye');
  const [hiddenIcon] = useState<IconName>('eye-slash');
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  //const [metricSelectValue, setMetricSelectValue] = useState<SelectableValue<string>>();

  const getMatchingMetricText = () => {
    return (
      <>
        <Alert title="Some very important message" severity="info" />
        stuff goes here
      </>
    );
  };
  const removeItem = () => {
    //alert('high');
    options.remover(composite.order);
    // call parent remove function
  };

  const toggleShowName = () => {
    const currentState = composite.showName;
    //setShowName(!currentState);
    setComposite({ ...composite, showName: !currentState });
  };

  const removeMetric = (index: number) => {
    let newstuff = [...options.composite.metrics];
    newstuff.splice(index, 1);
    //options.composite.metrics = newstuff;
    setComposite({ ...options.composite, metrics: newstuff });
  };
  const updateMetric = (index: number, v: SelectableValue) => {
    const newstuff = options.composite.metrics;
    newstuff[index].seriesMatch = { label: v.label, value: v.value };
    //setMetrics(newstuff);
    setComposite({ ...options.composite, metrics: newstuff });
  };

  const addMetric = () => {
    const newMetric: CompositeMetric = {
      seriesMatch: {
        label: '',
        value: '',
      },
      ID: uuidv4(),
      order: 0,
    };
    if (!composite.metrics) {
      const currentMetrics: CompositeMetric[] = [];
      currentMetrics.push(newMetric);
      setComposite({ ...composite, metrics: currentMetrics });
    } else {
      const currentMetrics: CompositeMetric[] = composite.metrics;
      newMetric.order = currentMetrics.length;
      currentMetrics.push(newMetric);
      setComposite({ ...composite, metrics: currentMetrics });
    }
  };

  return (
    <Card heading="" key={`composite-card-${options.ID}`}>
      <Card.Meta>
        <FieldSet>
          <Field label="Composite Name" description="Name or Regular Expression" disabled={!composite.showComposite}>
            <Input
              value={composite.name}
              placeholder=""
              onChange={(e) => setComposite({ ...composite, name: e.currentTarget.value })}
            />
          </Field>
          <Field label="Show Name" description="Toggle Display of composite name" disabled={!composite.showComposite}>
            <Switch
              transparent={true}
              value={composite.showName}
              disabled={!composite.showComposite}
              onChange={toggleShowName}
            ></Switch>
          </Field>
          <Field label="Show Value" description="Toggle Display of composite value" disabled={!composite.showComposite}>
            <Switch
              transparent={true}
              value={composite.showValue}
              disabled={!composite.showComposite}
              onChange={() => setComposite({ ...composite, showValue: !composite.showValue })}
            />
          </Field>
          <Field
            label="Show Members"
            description="Toggle Display of composite members"
            disabled={!composite.showComposite}
          >
            <Switch
              transparent={true}
              value={composite.showMembers}
              disabled={!composite.showComposite}
              onChange={() => setComposite({ ...composite, showMembers: !composite.showMembers })}
            />
          </Field>
          <Field
            label="Display Mode"
            description="All will display all members, Triggered will only display those meeting threshold settings"
            disabled={!composite.showComposite}
          >
            <Select
              value={composite.displayMode}
              onChange={(v) => {
                setComposite({ ...composite, displayMode: v });
              }}
              options={DisplayModes}
            />
          </Field>
          <Field label="Clickthrough URL" description="URL to Open on Click" disabled={!composite.showComposite}>
            <Input
              value={composite.clickThrough}
              placeholder="https://"
              onChange={(e) => setComposite({ ...composite, clickThrough: e.currentTarget.value })}
            />
          </Field>
          <Field label="Sanitize URL" description="Sanitize URL before evaluating" disabled={!composite.showComposite}>
            <Switch
              transparent={false}
              disabled={!composite.showComposite}
              value={composite.clickThroughSanitize}
              onChange={() => setComposite({ ...composite, clickThroughSanitize: !composite.clickThroughSanitize })}
            />
          </Field>
          <Field label="Open in New Tab" description="Open link in new tab" disabled={!composite.showComposite}>
            <Switch
              transparent={false}
              value={composite.clickThroughOpenNewTab}
              disabled={!composite.showComposite}
              onChange={() => setComposite({ ...composite, clickThroughOpenNewTab: !composite.clickThroughOpenNewTab })}
            />
          </Field>
          <Field>
            <Button key="addMetric" variant="primary" icon="plus" onClick={addMetric}>
              Add Metric
            </Button>
          </Field>
          {composite.metrics &&
            composite.metrics.map((item: CompositeMetric, index: number) => {
              // generate ID if it doesn't exist
              if (!item.ID) {
                item.ID = uuidv4();
              }
              return (
                <CompositeMetricItem
                  key={`composite-metric-id-${item.ID}`}
                  metric={item}
                  index={index}
                  disabled={!composite.showComposite}
                  updateMetric={updateMetric}
                  removeMetric={removeMetric}
                />
              );
            })}
        </FieldSet>
      </Card.Meta>

      <Card.SecondaryActions>
        <IconButton
          key="showComposite"
          name={composite.showComposite ? visibleIcon : hiddenIcon}
          tooltip="Hide/Show Composite"
          onClick={() => setComposite({ ...composite, showComposite: !composite.showComposite })}
        />
        <IconButton
          key="showMatching"
          name="info-circle"
          tooltip="Show Matches"
          onClick={() => setPreviewIsOpen(true)}
        />
        <IconButton key="copyComposite" name="copy" tooltip="Duplicate" />
        <IconButton
          key="deleteComposite"
          variant="destructive"
          name="trash-alt"
          tooltip="Delete Composite"
          onClick={removeItem}
        />
        <Modal
          title="Matching Metrics"
          icon="apps"
          iconTooltip="Shows Matching Metrics for Composite"
          closeOnBackdropClick
          isOpen={previewIsOpen}
          onDismiss={() => setPreviewIsOpen(false)}
        >
          {getMatchingMetricText()}
          <Modal.ButtonRow>
            <Button variant="secondary" onClick={() => setPreviewIsOpen(false)}>
              Close
            </Button>
          </Modal.ButtonRow>
        </Modal>
      </Card.SecondaryActions>
    </Card>
  );
};
