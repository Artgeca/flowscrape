'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ParamProps } from '@/types/appNode';
import { useId, useState } from 'react';

const StringParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  return (
    <div className='w-full space-y-1 p-1'>
      <Label htmlFor={id} className='flex text-xs'>
        {param.name}
        {param.required && <p className='px-2 text-red-400'>*</p>}
      </Label>
      <Input
        id={id}
        className='text-xs'
        value={internalValue}
        placeholder='Enter value here'
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className='px-2 text-muted-foreground'>{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
