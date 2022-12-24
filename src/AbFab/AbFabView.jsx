import React from 'react';

const AbFabView = (props) => {
  const { data } = props;
  return <div dangerouslySetInnerHTML={{ __html: data?.snippet }}></div>;
};

export default AbFabView;
