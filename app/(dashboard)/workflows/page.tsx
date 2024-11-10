import { GetWorkflowsForUsers } from '@/actions/workflows/getWorkflowsForUser';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, InboxIcon } from 'lucide-react';
import { Suspense } from 'react';
import CreateWorkflowDialog from './_components/CreateWorkflowDialog';

const page = () => {
  return (
    <div className='flex flex-col flex-1 h-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Workflows</h1>
          <p className='text-muted-foreground'>Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>

      <div className='h-full py-6'>
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};


const UserWorkflowsSkeleton = () => {
  return (
    <div className='space-y-2'>
      {
        [1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className='w-full h-32' />
        ))
      }
    </div>
  );
};

const UserWorkflows = async () => {
  const workflows = await GetWorkflowsForUsers();
  if (!workflows) {
    return (
      <Alert variant={'destructive'}>
        <AlertCircle className='w-4 h-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-full gap-4'>
        <div className='flex items-center justify-center w-20 h-20 rounded-full bg-accent'>
          <InboxIcon size={40} className='stroke-primary' />
        </div>
        <div className='flex flex-col gap-1 text-center'>
          <p className='font-bold'>No workflow created yet</p>
          <p className='text-sm text-muted-foreground'>
            Click the button below to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText='Create your first workflow' />
      </div>
    );
  }

  return (
    <div></div>
  );
};

export default page;
