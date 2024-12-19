'use client';

import TooltipWrapper from '@/components/TooltipWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { WorkflowStatus } from '@/types/workflow';
import { Workflow } from '@prisma/client';
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import DeleteWorkflowDialog from './DeleteWorkflowDialog';
import RunBtn from './RunBtn';

const statusColors = {
  [WorkflowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [WorkflowStatus.PUBLISHED]: 'bg-primary',
};

const WorkflowCard = ({ workflow }: { workflow: Workflow }) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card className='border-separate overflow-hidden rounded-lg border shadow-sm hover:shadow-md dark:shadow-primary/30'>
      <CardContent className='flex h-[100px] items-center justify-between p-4'>
        <div className='flex items-center justify-end space-x-3'>
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              statusColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className='h-5 w-5' />
            ) : (
              <PlayIcon className='h-5 w-5 text-white' />
            )}
          </div>
          <div>
            <h3 className='flex items-center text-base font-bold text-muted-foreground'>
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className='flex items-center hover:underline'
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className='ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-sm font-medium text-yellow-800'>
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          {!isDraft && <RunBtn workflowId={workflow.id} />}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'flex items-center gap-2'
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions
            workflowName={workflow.name}
            workflowId={workflow.id}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const WorkflowActions = ({
  workflowName,
  workflowId,
}: {
  workflowName: string;
  workflowId: string;
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm'>
            <TooltipWrapper content='More actions'>
              <div className='flex h-full w-full items-center justify-center'>
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex items-center gap-2 text-destructive'
            onSelect={() => setShowDeleteDialog((prev) => !prev)}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default WorkflowCard;
