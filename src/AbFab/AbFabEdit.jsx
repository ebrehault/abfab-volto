import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, Field } from '@plone/volto/components';
import AbFabView from './AbFabView';

const AbFabEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const editLink = `${data?.path || '/++api++/~'}/@edit`;
  return (
    <div>
      <SidebarPortal selected={selected}>
        <Segment.Group raised>
          <header className="header pulled">
            <h2>AbFab component</h2>
            <a href={editLink}>AbFab editor</a>
          </header>

          <Form>
            <Field id="path" widget="input" title="Path" value={data?.path || ''} onChange={(id, value) => onChangeBlock(block, { ...data, [id]: value })} />
          </Form>
        </Segment.Group>
      </SidebarPortal>
      <div>
        <img src="/++api++/~/abfab/abfab.svg" alt="AbFab logo" />
        <small>{data?.path}</small>
      </div>
      <AbFabView data={data} />
    </div>
  );
};

export default AbFabEdit;
