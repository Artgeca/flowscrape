'use client';

import TooltipWrapper from '@/components/TooltipWrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ExecuteBtn from './ExecuteBtn';
import NavigationTabs from './NavigationTabs';
import SaveBtn from './SaveBtn';

interface Props {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
}

const Topbar = ({ title, subtitle, workflowId, hideButtons }: Props) => {
  const router = useRouter();

  return (
    <header className='sticky top-0 z-10 flex h-[60px] w-full border-separate justify-between border-b-2 bg-background p-2'>
      <div className='flex flex-1 gap-1'>
        <TooltipWrapper content='Back'>
          <Button variant='ghost' size='icon' onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className='truncate text-ellipsis font-bold'>{title}</p>
          {subtitle && (
            <p className='truncate text-ellipsis text-sm text-muted-foreground'>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <NavigationTabs workflowId={workflowId} />
      <div className='flex flex-1 justify-end gap-1'>
        {!hideButtons && (
          <>
            <ExecuteBtn workflowId={workflowId} />
            <SaveBtn workflowId={workflowId} />
          </>
        )}
      </div>
    </header>
  );
};

export default Topbar;
