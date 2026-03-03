import React, { Suspense } from 'react';
import WorkDetailContent from './WorkDetailContent';

const WorkDetailPage = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-[#F2EFE6]">
      <p className="text-xl text-gray-600">Loading work details...</p>
    </div>}>
      <WorkDetailContent />
    </Suspense>
  );
};

export default WorkDetailPage;