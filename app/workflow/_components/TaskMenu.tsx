'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { TaskType } from '@/types/task';

export const TaskMenu = () => {
  return (
    <aside className='w=[340px] h-full min-w-[340px] max-w-[340px] border-separate overflow-auto border-r-2 p-2 px-4'>
      <Accordion
        type='multiple'
        className='w-full'
        defaultValue={['extraction']}
      >
        <AccordionItem value='extraction'>
          <AccordionTrigger className='font-bold'>
            Data extraction
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-1'>
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export const TaskMenuBtn = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Button
      variant={'secondary'}
      className='flex w-full items-center justify-between gap-2 border'
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
    >
      <div className='flex gap-2'>
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
};
