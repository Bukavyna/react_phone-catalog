import React, { forwardRef, useEffect, useCallback } from 'react';
import { Player } from '@lordicon/react';

import wiredTrolley from '../../img/wiredTrolley1.json';

interface WiredTrolleyProps {
  className?: string;
  trigger?: number;
}

export const WiredTrolley = forwardRef<Player, WiredTrolleyProps>(
  ({ className, trigger }, ref) => {
    const playerRef = ref as React.RefObject<Player>;

    const playAnimation = useCallback(() => {
      playerRef.current?.playFromBeginning();
    }, [playerRef]);

    useEffect(() => {
      if (trigger && trigger > 0) {
        playAnimation();
      }
    }, [trigger, playAnimation]);

    return (
      <div className={className} onMouseEnter={playAnimation}>
        <Player icon={wiredTrolley} ref={playerRef} />
      </div>
    );
  },
);

WiredTrolley.displayName = 'WiredTrolley';
