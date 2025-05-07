import { useEffect, useState, JSX } from 'react';

const loadingDefault = () => (
  <p><em>Loading&hellip;</em></p>
);

const errorDefault = (err: unknown) => (
  <p className="error mono">
    <strong>Error</strong>:<br/>{`${err}`}
  </p>
);

type AsyncData<T> = { state: null }
                  | { state: 'loading' }
                  | { state: 'error', err: unknown }
                  | { state: 'done', data: T };

function Fetch({ get, ok, loading, error }: {
  get: string,
  ok: (collections: any) => JSX.Element,
  loading?: (getting: string) => JSX.Element,
  error?: (error: unknown) => JSX.Element,
}) {
  const [asyncData, setAsyncData] = useState<AsyncData<any>>({ state: null });

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
    return ok(asyncData.data);
  }
}

export default Fetch;
