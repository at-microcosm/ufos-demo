import { useEffect, useState } from 'react';

const loadingDefault = () => (
  <p><em>Loading&hellip;</em></p>
);

const errorDefault = ({ err }) => (
  <p className="error mono">
    <strong>Error</strong>:<br/>{`${asyncData.err}`}
  </p>
);

function Fetch({ get, ok, loading, error }) {
  const [asyncData, setAsyncData] = useState({ state: null });

  useEffect(() => {
    let ignore = false;
    setAsyncData({ state: 'loading' });
    (async () => {
      try {
        const res = await fetch(get);
        const data = await res.json();
        if (!ignore) {
          setAsyncData({ state: 'done', data });
        }
      } catch (err) {
        if (!ignore) {
          setAsyncData({ state: 'error', err });
        }
      }
    })();
    return () => {
      ignore = true;
    }
  }, [get]);


  if (asyncData.state === 'loading') {
    return (loading || loadingDefault)(get);
  } else if (asyncData.state === 'error') {
    return (error || errorDefault)(asyncData.err);
  } else if (asyncData.state === null) {
    return <p>wat, request has not started (bug?)</p>;
  } else {
    if (asyncData.state !== 'done') { console.warn(`unexpected async data state: ${asyncData.state}`); }
    return ok(asyncData.data);
  }
}

export default Fetch;
