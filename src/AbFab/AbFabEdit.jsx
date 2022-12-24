import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, Field } from '@plone/volto/components';
import AbFabView from './AbFabView';

const AbFabEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  return (
    <div>
      <SidebarPortal selected={selected}>
        <Segment.Group raised>
          <header className="header pulled">
            <h2>AbFab component</h2>
          </header>

          <Form>
            <Field
              id="snippet"
              widget="textarea"
              title="Snippet"
              value={data?.snippet || ''}
              onChange={(id, value) =>
                onChangeBlock(block, { ...data, [id]: value })
              }
            />
          </Form>
        </Segment.Group>
      </SidebarPortal>

      <AbFabView />
    </div>
  );
};

export default AbFabEdit;
