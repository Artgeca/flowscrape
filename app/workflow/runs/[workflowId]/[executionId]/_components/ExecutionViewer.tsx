'use client';

import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/getWorkflowExecutionWithPhases';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DatesToDurationString } from '@/lib/helper/dates';
import { GetPhasesTotalCost } from '@/lib/helper/phases';
import { WorkflowExecutionStatus } from '@/types/workflow';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from 'lucide-react';
import { ReactNode, useState } from 'react';

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

const ExecutionViewer = ({ initialData }: { initialData: ExecutionData }) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ['execution', initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  const duration = DatesToDurationString(
    query.data?.completedAt,
    query.data?.startedAt
  );

  const creditsConsumed = GetPhasesTotalCost(query.data?.phases || []);

  return (
    <div className='flex h-full w-full'>
      <aside className='flex w-[440px] min-w-[440px] max-w-[440px] border-separate flex-col overflow-hidden border-r-2'>
        <div className='px-2 py-4'>
          <ExecutionLabel
            icon={CircleDashedIcon}
            label='Status'
            value={query.data?.status}
          />
          <ExecutionLabel
            icon={CalendarIcon}
            label='Started at'
            value={
              <span className='lowercase'>
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data.startedAt), {
                      addSuffix: true,
                    })
                  : '-'}
              </span>
            }
          />
          <ExecutionLabel
            icon={ClockIcon}
            label='Duration'
            value={
              duration || <Loader2Icon className='animate-spin' size={20} />
            }
          />
          <ExecutionLabel
            icon={CoinsIcon}
            label='Credits consumed'
            value={creditsConsumed}
          />
          <Separator />
          <div className='flex items-center justify-center px-4 py-2'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <WorkflowIcon size={20} className='stroke-muted-foreground/80' />
              <span className='font-semibold'>Phases</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className='h-full overflow-auto px-2 py-4'>
          {query.data?.phases.map((phase, index) => (
            <Button
              key={phase.id}
              className='w-full justify-between'
              variant={selectedPhase === phase.id ? 'secondary' : 'ghost'}
              onClick={() => {
                if (isRunning) return;
                setSelectedPhase(phase.id);
              }}
            >
              <div className='flex items-center gap-2'>
                <Badge variant='outline'>{index + 1}</Badge>
                <p className='font-semibold'>{phase.name}</p>
              </div>
              <p className='text-xs text-muted-foreground'>{phase.status}</p>
            </Button>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default ExecutionViewer;

const ExecutionLabel = ({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}) => {
  const Icon = icon;
  return (
    <div className='flex items-center justify-between px-4 py-2'>
      <div className='flex items-center gap-2 text-muted-foreground'>
        <Icon size={20} className='stroke-muted-foreground/80' />
        <span>{label}</span>
      </div>
      <div className='flex items-center gap-2 font-semibold capitalize'>
        {value}
      </div>
    </div>
  );
};
