import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Button from '@/components/base/Button';

interface MyDialogProps {
  title: string;
  description?: string;
  additionalText?: string;
  confirmText: string;
  cancelText: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  className: string;
}

export default function MyDialog({
  title,
  description,
  additionalText,
  confirmText,
  cancelText,
  onClose,
  onConfirm,
  onCancel,
  isOpen,
  className,
}: MyDialogProps): React.ReactElement {
  return (
    <Dialog open={isOpen} onClose={onClose} className={`${className}`}>
      <Dialog.Panel
        className={`bg-slate-800 p-8 rounded-lg text-slate-200 border border-cyan-500`}
      >
        <Dialog.Title className={`text-3xl text-cyan-500`}>
          {title}
        </Dialog.Title>
        <Dialog.Description className={`text-xl my-8`}>
          {description}
        </Dialog.Description>

        <p>{additionalText && additionalText}</p>

        <div className="flex justify-end">
          <Button rounded={true} intent={'secondary'} onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button className="ml-4" rounded={true} onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
        {/* <button onClick={onConfirm}>{confirmText}</button>
        <button onClick={onCancel}>{cancelText}</button> */}
      </Dialog.Panel>
    </Dialog>
  );
}
