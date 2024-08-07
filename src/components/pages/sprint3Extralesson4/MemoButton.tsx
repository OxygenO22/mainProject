import { Button, ButtonProps } from '@mui/material';
import React, { memo } from 'react'

type MemoButtonPT = ButtonProps & {};

export const MemoButton = memo(
  ({ ...props }: MemoButtonPT) => {
    return (
      <Button
        {...props}
      >
        {props.children}
      </Button>
    );
  }
);
