import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonMobile = (props) => (
   <ContentLoader
      speed={2}
      width={195}
      height={232}
      viewBox="0 0 195 232"
      backgroundColor="#f3f3f3"
      foregroundColor="#c7c3c3"
      {...props}>
      <rect x="42" y="201" rx="2" ry="2" width="137" height="23" />
      <rect x="42" y="170" rx="2" ry="2" width="137" height="23" />
      <rect x="33" y="18" rx="2" ry="2" width="158" height="140" />
   </ContentLoader>
);
export default SkeletonMobile;
