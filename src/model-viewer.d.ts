/// <reference types="@google/model-viewer" />

import React from "react";

export declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          "shadow-intensity"?: string;
          "camera-controls"?: boolean;
          "auto-rotate"?: boolean;
          ar?: boolean;
          "ar-modes"?: string;
          poster?: string;
          "camera-orbit"?: string;
          scale?: string;
          alt?: string;
          exposure?: number;
        },
        HTMLElement
      >;
    }
  }
}
