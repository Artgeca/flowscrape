import { cn } from '@/lib/utils';
import { TaskParam } from '@/types/task';
import { Handle, Position, useEdges } from '@xyflow/react';
import useFlowValidation from '@/components/hooks/useFlowValidation';
import NodeParamField from './NodeParamField';
import { ColorForHandle } from './common';

export const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex flex-col gap-2 divide-y'>{children}</div>;
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) => {
  const { invalidInputs } = useFlowValidation();
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );
  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);

  return (
    <div
      className={cn(
        'relative flex w-full justify-start bg-secondary p-3',
        hasErrors && 'bg-destructive/30'
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type='target'
          position={Position.Left}
          className={cn(
            '!-left-2 !h-4 !w-4 !border-2 !border-background !bg-muted-foreground',
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};
