import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CurrencyRow from './CurrencyRow';
import { Currency } from '../types';

interface SortableCurrencyRowProps {
  id: string;
  currency: Currency;
  value: string;
  isBase: boolean;
  onValueChange: (val: string) => void;
  onRemove: () => void;
  disabled?: boolean;
}

const SortableCurrencyRow: React.FC<SortableCurrencyRowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1, // 确保拖拽时在上方（虽然 Overlay 会覆盖它，但这有助于原位元素的层级）
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <CurrencyRow
        {...props}
        isDragging={isDragging}
        dragHandleProps={listeners}
      />
    </div>
  );
};

export default SortableCurrencyRow;
