import Accent from "./Accent";
import { STATS } from "../config/landing";

export default function Manifesto() {
  return (
    <section className="manifesto">
      <div className="wrap">
        <h2 className="manifesto__title">
          Not a cure. A <Accent>map</Accent> you can follow on your own skin.
        </h2>
        <div className="stats">
          {STATS.map((stat) => (
            <div className="stats__item" key={stat.n}>
              <span className="stats__num">{stat.n}</span>
              <span className="stats__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
