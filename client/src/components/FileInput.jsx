import { useEffect, useState, forwardRef, useRef } from "react";

export const FileInput = forwardRef(
  ({ onFileChange, ...rest }, externalRef) => {
    const [isDragging, setIsDragging] = useState(false);
    const internalRef = useRef(null);
    useEffect(() => {
      if (!externalRef) return;
      if (typeof externalRef === "function") {
        externalRef(internalRef.current);
      } else {
        externalRef.current = internalRef.current;
      }
    });
    useEffect(() => {
      const dragoverHandler = (e) => {
        e.preventDefault();
        setIsDragging(true);
      };
      const dragEndHandler = () => {
        setIsDragging(false);
      };
      document.addEventListener("dragover", dragoverHandler);
      document.addEventListener("dragend", dragEndHandler);
      document.addEventListener("dragleave", dragEndHandler);
      return () => {
        document.removeEventListener("dragover", dragoverHandler);
        document.removeEventListener("dragend", dragEndHandler);
        document.removeEventListener("dragleave", dragEndHandler);
      };
    }, []);

    return (
      <span style={{ display: "inline-block", paddingLeft: "10px" }}>
        <input
          placeholder="Select File"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && onFileChange) {
              onFileChange(file);
            }
          }}
          type="file"
          {...rest}
          ref={internalRef}
        />
        {isDragging && (
          <div
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(false);
              if (e.dataTransfer?.files && internalRef.current) {
                internalRef.current.files = e.dataTransfer.files;
                onFileChange && onFileChange(e.dataTransfer.files[0]);
              }
            }}
          ></div>
        )}
      </span>
    );
  },
);
