import React from 'react';

function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <div className="loading-skeleton-item loading-skeleton-title"></div>
      <div className="loading-skeleton-item loading-skeleton-image"></div>
      <div className="loading-skeleton-item loading-skeleton-text"></div>
    </div>
  );
}

export default LoadingSkeleton;
