import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from "@react-three/postprocessing";
import { KernelSize, BlendFunction, Resolution } from "postprocessing";

export const OutlineEffect = ({
  children,
  enabled,
  auraColor,
}: {
  children: JSX.Element;
  enabled: boolean;
  auraColor: number;
}) => {
  return (
    <Selection enabled>
      <EffectComposer autoClear={false}>
        <Outline
          selectionLayer={10} // selection layer
          edgeStrength={100} // the edge strength
          pulseSpeed={0.5} // a pulse speed. A value of zero disables the pulse effect
          visibleEdgeColor={auraColor} // the color of visible edges
          hiddenEdgeColor={0x00ff00} // the color of hidden edges
          blendFunction={BlendFunction.SCREEN} // set this to BlendFunction.ALPHA for dark outlines
          width={Resolution.AUTO_SIZE} // render width
          height={Resolution.AUTO_SIZE} // render height
          kernelSize={KernelSize.LARGE} // blur kernel size
          blur={true} // whether the outline should be blurred
          xRay={true} // indicates whether X-Ray outlines are enabled
        />
      </EffectComposer>

      <Select enabled={enabled}>{children}</Select>
    </Selection>
  );
};
