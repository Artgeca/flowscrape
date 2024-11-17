'use client';

import { Workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from './FlowEditor';
import Topbar from './topbar/Topbar';

const Editor = ({ workflow }: { workflow: Workflow; }) => {
  return (
    <ReactFlowProvider>
      <div className='flex flex-col w-full h-full overflow-hidden'>
        <Topbar title='Workflow editor' subtitle={workflow.name} workflowId={workflow.id} />
        <section className='flex h-full overflow-auto'>
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
