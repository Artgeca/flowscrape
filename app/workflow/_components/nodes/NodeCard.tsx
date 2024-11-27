'use client';

import useFlowValidation from '@/components/hooks/useFlowValidation';
import { cn } from '@/lib/utils';
import { useReactFlow } from '@xyflow/react';

interface Props {
  children: React.ReactNode;
  nodeId: string;
  isSelected: boolean;
}

const NodeCard = ({ children, nodeId, isSelected }: Props) => {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId);

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;
        if (x === undefined || y === undefined) return;
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        'flex w-[420px] border-separate cursor-pointer flex-col gap-1 rounded-md border-2 bg-background text-xs',
        isSelected && 'border-primary',
        hasInvalidInputs && 'border-2 border-destructive'
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
