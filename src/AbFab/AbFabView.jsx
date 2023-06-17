import React from 'react';

const AbFabView = (props) => {
  const { data } = props;
  const path = data?.path;
  if (!path) {
    return <div>AbFabView: path not set</div>;
  }
  const snippet = `<script type="module" src="/++api++/~/abfab/element.svelte.js"></script>
  <abfab-element componentpath="${path}"></abfab-element>`;
  return <div dangerouslySetInnerHTML={{ __html: snippet }}></div>;
};

export default AbFabView;
