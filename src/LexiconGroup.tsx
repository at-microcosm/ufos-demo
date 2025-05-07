import { useState } from 'react'
import './LexiconGroup.css'


function LexiconGroup({ group, max }: {
  group: any,
  max: number,
}) {
  const [expand, setExpand] = useState(false)

  let bar_width = 100 * (Math.log(group.n) + 1) / (Math.log(max) + 1);

  return (
    <div className="lex-group">
      <div className="bar" style={{width: `calc(${bar_width}% - 4em)`}}>
        <span className="bar-number">{ group.n }</span>
      </div>
      <h3 className="mono" onClick={() => setExpand(expanded => !expanded)}>
        <span>{ group.group }</span>
        <button>
          .[{ group.things.length }]
        </button>
      </h3>
      {expand && <div>
        {group.things.map((thing: any) => (
          <Suffix
            key={thing.thing}
            group={group.group}
            thing={thing}
            max={max}
          />
        ))}
      </div>}
    </div>
  );
}

function Suffix({ group, thing, max }: {
  group: string,
  thing: any,
  max: number,
}) {
  let bar_width = 100 * (Math.log(thing.n) + 1) / (Math.log(max) + 1);
  return (
    <div className="suffix-group">
      <div className="bar" style={{width: `calc(${bar_width}% - 4em)`}}>
        <span className="bar-number">{ thing.n }</span>
      </div>
      <h4 className="mono">
        <a href={`#${group}.${thing.thing}`} className="link-ish">
          {thing.thing}
        </a>
      </h4>
    </div>
  );
}

export default LexiconGroup;
