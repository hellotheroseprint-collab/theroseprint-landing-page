import RoseIcon from "./RoseIcon";

/**
 * 3D card-flip container.
 *
 * .scene  → sets perspective so rotateY has visible depth
 * .card   → preserve-3d + spin keyframe
 * .face   → each side uses backface-visibility: hidden
 * .face--back is pre-rotated 180 deg so it shows when the card
 * passes 90 deg.
 *
 * At exactly 90 / 270 deg the rose appears paper-thin — this
 * happens naturally with preserve-3d, no extra tricks needed.
 */
export default function RotatingRose() {
  return (
    <div className="scene">
      <div className="card">
        <div className="face face--front">
          <RoseIcon variant="pink" size={160} />
        </div>
        <div className="face face--back">
          <RoseIcon variant="outline" size={160} />
        </div>
      </div>
    </div>
  );
}
