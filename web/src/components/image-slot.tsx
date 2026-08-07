import Image from "next/image";
import type { CSSProperties } from "react";

type ImageSlotProps = {
  src?: string;
  alt: string;
  placeholder: string;
  shape?: "rect" | "circle";
  radius?: number;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
};

/**
 * Production stand-in for the design tool's <image-slot>: renders a real
 * image when one has been sourced, otherwise a striped placeholder box
 * naming what belongs there. `style` sizes/positions the slot itself —
 * wrap it in a positioned container for full-bleed underlays.
 */
export function ImageSlot({
  src,
  alt,
  placeholder,
  shape = "rect",
  radius = 0,
  style,
  sizes,
  priority,
}: ImageSlotProps) {
  const borderRadius = shape === "circle" ? "50%" : radius ? `${radius}px` : undefined;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius,
        ...style,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          style={{ objectFit: "cover" }}
          priority={priority}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 12,
            boxSizing: "border-box",
            background:
              "repeating-linear-gradient(135deg, rgba(244,246,248,0.05) 0px, rgba(244,246,248,0.05) 1px, transparent 1px, transparent 12px), rgba(244,246,248,0.03)",
            border: "1px dashed rgba(244,246,248,0.22)",
            color: "rgba(199,209,219,0.65)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 11,
            lineHeight: 1.5,
            letterSpacing: "0.01em",
          }}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}
