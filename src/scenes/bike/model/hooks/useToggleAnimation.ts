import { useState } from "react";
import * as THREE from "three";

export function useToggleAnimation(action: THREE.AnimationAction | null) {
  const [isReversed, setIsReversed] = useState(false);

  const toggleAnimation = () => {
    if (action) {
      // Set up the animation to play once and stop at the last frame
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;

      // Set the time scale based on the direction
      action.timeScale = isReversed ? -1 : 1;

      if (!action.isRunning()) {
        action.reset();
        if (isReversed) {
          action.time = action.getClip().duration;
        }
      }

      action.play();
      setIsReversed(!isReversed);
    }
  };

  return toggleAnimation;
}
