import './App.css'
import { useState } from 'react'
import LexiconGroup from './LexiconGroup'
import RecordSamples from './RecordSamples'

import { adapt_new_api, filtering, to_top_groups } from './group_collections'

import SearchFilter from './SearchFilter'
import Fetch from './Fetch'

function App({ hash }: { hash?: string }) {
  window.onkeyup = e => !!hash && e.keyCode === 27 && window.history.back();

  const [filter, setFilter] = useState('');

  return (
    <>
      <p className="wip">very very work-in-progress demo</p>
      <h1>UFOs</h1>
      <p className="def">
        <strong>U</strong>nidentified <strong>F</strong>lying lexic<strong>O</strong>ns <small>(sorry)</small>
      </p>
      <div className="search-filter-card">
        <SearchFilter onSetFilter={setFilter} />
      </div>
      <Fetch get="http://localhost:9999/collections" ok={collections => (
        <div className="nsid-groups">
          {to_top_groups(filtering(adapt_new_api(collections), filter)).map((g, _, all) =>
            <LexiconGroup
              key={g.group}
              group={g}
              max={all[0]?.n}
            />
          )}
        </div>
      )} />
      {!!hash && (<RecordSamples collection={hash} />)}
    </>
  )
}

export default App
