'use client';

import TooltipWrapper from '@/components/TooltipWrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SaveBtn from './SaveBtn';

interface Props {
  title: string;
  subtitle?: string;
  workflowId: string;
}

const Topbar = ({ title, subtitle, workflowId }: Props) => {
  const router = useRouter();

  return (
    <header className='flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10'>
      <div className='flex flex-1 gap-1'>
        <TooltipWrapper content='Back'>
          <Button variant={'ghost'} size={'icon'} onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className='font-bold truncate text-ellipsis'>{title}</p>
          {subtitle && (
            <p className='text-sm truncate text-muted-foreground text-ellipsis'>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className='flex justify-end flex-1 gap-1'>
        <SaveBtn workflowId={workflowId} />
      </div>
    </header>
  );
};

export default Topbar;
