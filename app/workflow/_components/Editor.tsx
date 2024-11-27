'use client';

import { Workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';
import { FlowValidationContextProvider } from '@/components/context/FlowValidationContext';
import FlowEditor from './FlowEditor';
import Topbar from './topbar/Topbar';
import { TaskMenu } from './TaskMenu';

const Editor = ({ workflow }: { workflow: Workflow }) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className='flex h-full w-full flex-col overflow-hidden'>
          <Topbar
            title='Workflow editor'
            subtitle={workflow.name}
            workflowId={workflow.id}
          />
          <section className='flex h-full overflow-auto'>
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};

export default Editor;
