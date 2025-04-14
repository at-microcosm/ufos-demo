// import { useEffect, useState } from 'react';
import Fetch from './Fetch'

import './RecordSamples.css'

const esc = e => { window.history.back(); }
const stopProp = e => e.stopPropagation();

        // const res = await fetch(`http://localhost:9999/records?collection=${collection}`);
        // const res = await fetch(`http://bonilla:9999/records?collection=${collection}`);

function RecordSamples({ collection }) {
  const url = `http://localhost:9999/records?collection=${collection}`
  return (
    <div className="preview-overlay" onClick={esc}>
      <div className="preview" onClick={stopProp}>
        <h3 className="mono">{collection}</h3>
        <Fetch get={url} ok={samples => (
          <div className="samples-view mono">
            {samples.map(sample =>
              <Sample key={`${sample.did}//${sample.rkey}`} data={sample} />)}
          </div>
        )} />
      </div>
    </div>
  );
}


function nice_time_ago(us) {
  let dt = +new Date() - (us / 1000);
  if (dt < 1000) {
    return `${Math.round(dt)} ms`;
  }
  dt /= 1000; // seconds
  if (dt < 60) {
    return `${Math.round(dt)} s`;
  }
  dt /= 60; // minutes
  if (dt < 60) {
    return `${Math.round(dt)} min`;
  }
  dt /= 60; // hours
  if (dt < 48) {
    return `${Math.round(dt)} hrs`;
  }
  dt /= 24; // days
  return `${Math.round(dt)} days`;
}


function Sample({ data }) {
  const { did, collection, rkey, time_us, record } = data;
  const at_uri = `at://${did}/${collection}/${rkey}`;

  return (
    <div className="sample">
      <p className="uri">
        <a href={`https://pdsls.dev/${at_uri}`} target="_blank">{at_uri}</a>
      </p>
      <div className="sample-content">
        <JsonObject object={record} ellide$type={collection} />
      </div>
      <div className="time-ago">{ nice_time_ago(time_us) } ago</div>
    </div>
  );
}


function Json({ data }) {
  if (Array.isArray(data)) {
    return <JsonArray items={data} />;
  }
  if (data === null) {
    return <span className="null">null</span>;
  }
  if (typeof data === "object") {
    return <JsonObject object={data} />;
  }
  if (typeof data === "string") {
    return <JsonString s={data} />;
  }
  if (typeof data === "number") {
    return <JsonNumber n={data} />;
  }
  return '' + data;
}

function JsonArray({ items }) {
  if (
    items.every(item => typeof item === "string") &&
    items.map(item => item.length).reduce((a, b) => a + b, 0) < 80
  ) {
    return <InlineStringArray strings={items} />
  }

  return (
    <>
      [
      <div className="json-indent">
        {items.map((item, i, items) => (
          <div key={i} className="json-array-item">
            <Json data={item} />
            {i < items.length - 1 && ', '}
          </div>
        ))}
      </div>
      <div>]</div>
    </>
  );
}
function InlineStringArray({ strings }) {
  return (
    <>
      [
        {strings.map((s, i, strings) => (
          <span key={i}>
            <JsonString s={s} />
            {i < strings.length - 1 && ', '}
          </span>
        ))}
      ]
    </>
  );
}

function JsonString({ s }) {
  return <span className="s">"{s}"</span>
}

function JsonNumber({ n }) {
  return <span className="n">{n}</span>
}

function JsonObject({ object, ellide$type }) {
  let keys = Object.keys(object).filter(k => !(k === "$type" && object[k] === ellide$type));

  if (
    keys.length === 1 &&
    typeof object[keys[0]] === "string" &&
    keys[0].length + object[keys[0]].length < 100
  ) {
    return <InlineKV k={keys[0]} v={object[keys[0]]} />;
  }

  return (
    <>
      {'{'}
      <div className="json-indent">
        {keys.map(k => (
          <div key={k} className="json-object-kv">
            <span className="json-obj-key">
              "{k}"
            </span>
            :{' '}
            <Json data={object[k]} />
          </div>
        ))}
      </div>
      <div>{'}'}</div>
    </>
  );
}

function InlineKV({ k, v }) {
  return (
    <>
      {'{'}
      <span className="json-obj-key">
        "{k}"
      </span>
      :{' '}
      <JsonString s={v} />
      {'}'}
    </>
  );
}


export default RecordSamples;
