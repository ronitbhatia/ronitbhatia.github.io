import { useRef, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

export function useDraggable(
  onPositionChange: (pos: Position) => void,
  initialPos: Position
) {
  const isDragging = useRef(false);
  const startMouse = useRef({ x: 0, y: 0 });
  const startPos = useRef(initialPos);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".mac-btn")) return;
      e.preventDefault();
      isDragging.current = true;
      startMouse.current = { x: e.clientX, y: e.clientY };
      startPos.current = initialPos;

      const onMove = (moveEvent: MouseEvent) => {
        if (!isDragging.current) return;
        const dx = moveEvent.clientX - startMouse.current.x;
        const dy = moveEvent.clientY - startMouse.current.y;
        onPositionChange({
          x: startPos.current.x + dx,
          y: startPos.current.y + dy,
        });
      };

      const onUp = () => {
        isDragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [initialPos, onPositionChange]
  );

  return { onMouseDown };
}
