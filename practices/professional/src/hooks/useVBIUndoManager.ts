import { useEffect, useState } from 'react';
import type { VBIBuilder } from '@visactor/vbi';

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable || target.closest('[contenteditable="true"]')) {
    return true;
  }

  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
};

export const useVBIUndoManager = (builder: VBIBuilder | undefined) => {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    if (!builder) {
      return;
    }

    const sync = () => {
      setCanUndo(builder.undoManager.canUndo());
      setCanRedo(builder.undoManager.canRedo());
    };

    sync();
    builder.doc.on('update', sync);
    return () => {
      builder.doc.off('update', sync);
    };
  }, [builder]);

  useEffect(() => {
    if (!builder) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target) || event.altKey) {
        return;
      }

      if (!(event.ctrlKey || event.metaKey)) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key === 'z' && !event.shiftKey && builder.undoManager.canUndo()) {
        event.preventDefault();
        builder.undoManager.undo();
      } else if (
        (key === 'y' || (key === 'z' && event.shiftKey)) &&
        builder.undoManager.canRedo()
      ) {
        event.preventDefault();
        builder.undoManager.redo();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [builder]);

  return {
    canUndo,
    canRedo,
    undo: () => builder?.undoManager.undo(),
    redo: () => builder?.undoManager.redo(),
  };
};
