import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  zIndex: number;
  isMinimized?: boolean;
  isFocused?: boolean;
  /** Phone / narrow: edge-to-edge sheet, no drag/resize */
  isMobile?: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  icon?: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  initialPosition = { x: 80, y: 60 },
  initialSize = { width: 560, height: 420 },
  zIndex,
  isMinimized = false,
  isFocused = false,
  isMobile = false,
  onClose,
  onMinimize,
  onFocus,
  icon,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const handleTitleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) {
        onFocus();
        return;
      }
      if ((e.target as HTMLElement).closest(".mac-btn")) return;
      e.preventDefault();
      onFocus();
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY, posX: position.x, posY: position.y };

      const onMove = (ev: MouseEvent) => {
        if (!isDragging.current) return;
        setPosition({
          x: dragStart.current.posX + ev.clientX - dragStart.current.x,
          y: Math.max(24, dragStart.current.posY + ev.clientY - dragStart.current.y),
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
    [position, onFocus, isMobile]
  );

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      e.preventDefault();
      e.stopPropagation();
      isResizing.current = true;
      resizeStart.current = { x: e.clientX, y: e.clientY, w: size.width, h: size.height };

      const onMove = (ev: MouseEvent) => {
        if (!isResizing.current) return;
        const newW = Math.max(320, resizeStart.current.w + ev.clientX - resizeStart.current.x);
        const newH = Math.max(240, resizeStart.current.h + ev.clientY - resizeStart.current.y);
        setSize({ width: newW, height: newH });
      };
      const onUp = () => {
        isResizing.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [size, isMobile]
  );

  if (isMinimized) return null;

  const desktopStyle = {
    left: position.x,
    top: position.y,
    width: size.width,
    height: size.height,
    zIndex,
  } as const;

  const mobileStyle = {
    left: 0,
    right: 0,
    top: "var(--mac-mobile-window-top)",
    width: "100%",
    maxWidth: "100%",
    height: "var(--mac-mobile-window-height)",
    maxHeight: "var(--mac-mobile-window-height)",
    zIndex,
  } as const;

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        className={`mac-window touch-manipulation${isFocused ? " focused" : ""}${isMobile ? " mac-window--mobile" : ""}`}
        initial={{ opacity: 0, scale: isMobile ? 1 : 0.9, y: isMobile ? 8 : 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: isMobile ? 1 : 0.88, y: isMobile ? 6 : 10 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={isMobile ? mobileStyle : desktopStyle}
        onMouseDown={onFocus}
        onPointerDown={isMobile ? onFocus : undefined}
      >
        {/* Title Bar */}
        <div
          className={`mac-titlebar active`}
          onMouseDown={handleTitleMouseDown}
        >
          <div className="mac-btn-group flex items-center gap-1.5">
            <button
              className="mac-btn mac-btn-close"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              title="Close"
            />
            <button
              className="mac-btn mac-btn-minimize"
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              title="Minimize"
            />
            <button className="mac-btn mac-btn-maximize" title="Zoom" />
          </div>
          <div className="mac-titlebar-title flex items-center justify-center gap-1.5">
            {icon && <span className="opacity-70">{icon}</span>}
            <span>{title}</span>
          </div>
          <div style={{ width: 52 }} />
        </div>

        {/* Content */}
        <div className="window-content mac-scroll">
          {children}
        </div>

        {!isMobile && (
          <div
            className="resize-handle"
            onMouseDown={handleResizeMouseDown}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M12 12L6 12M12 8L8 12M12 4L12 12' stroke='%23999' stroke-width='1'/%3E%3C/svg%3E")`,
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Window;
