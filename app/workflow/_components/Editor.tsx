'use client';

import { FlowValidationContextProvider } from '@/components/context/FlowValidationContext';
import { WorkflowStatus } from '@/types/workflow';
import { Workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from './FlowEditor';
import { TaskMenu } from './TaskMenu';
import Topbar from './topbar/Topbar';

const Editor = ({ workflow }: { workflow: Workflow }) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className='flex h-full w-full flex-col overflow-hidden'>
          <Topbar
            title='Workflow editor'
            subtitle={workflow.name}
            workflowId={workflow.id}
            isPublished={workflow.status === WorkflowStatus.PUBLISHED}
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
