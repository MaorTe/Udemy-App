import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
   <ContentLoader
      speed={2}
      width={300}
      height={218}
      viewBox="0 0 300 218"
      backgroundColor="#f3f3f3"
      foregroundColor="#c7c3c3"
      {...props}>
      <rect x="81" y="210" rx="2" ry="2" width="140" height="10" />
      <rect x="33" y="171" rx="2" ry="2" width="242" height="24" />
      <rect x="33" y="18" rx="2" ry="2" width="244" height="140" />
   </ContentLoader>
);

export default MyLoader;
