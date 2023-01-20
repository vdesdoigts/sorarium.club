import type { FC } from 'react';
import { memo, useEffect } from 'react';
import type { ConnectDragPreview } from 'react-dnd/src/types/index.js';

export interface DragPreviewImageProps {
  connect: ConnectDragPreview;
  src: string;
}
/**
 * A utility for rendering a drag preview image
 */
const CardDndPreview: FC<DragPreviewImageProps> = memo(
  function DragPreviewImage({ connect, src }) {
    useEffect(() => {
      if (typeof Image === 'undefined') return;

      let connected = false;
      const img = new Image();
      img.style.cssText = 'width: 100px';
      img.src = src;
      img.onload = () => {
        const newDiv = document.createElement('div');
        newDiv.appendChild(img);
        connect(newDiv);
        connected = true;
      };

      return () => {
        if (connected) {
          connect(null);
        }
      };
    });

    return null;
  }
);

export default CardDndPreview;
