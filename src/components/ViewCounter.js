import React, { useEffect, useRef, useState } from 'react';

const COUNTER_API_BASE = 'https://api.counterapi.dev/v1';

export function buildCounterUrl(workspace, name) {
  return `${COUNTER_API_BASE}/${workspace}/${name}/up`;
}

const ViewCounter = () => {
  const [count, setCount] = useState(null);
  const [failed, setFailed] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const workspace = process.env.REACT_APP_COUNTER_WORKSPACE;
    const name = process.env.REACT_APP_COUNTER_NAME;

    if (!workspace || !name) {
      setFailed(true);
      return;
    }

    fetch(buildCounterUrl(workspace, name))
      .then((res) => {
        if (!res.ok) throw new Error('counter request failed');
        return res.json();
      })
      .then((data) => {
        if (typeof data.count === 'number') {
          setCount(data.count);
        } else {
          setFailed(true);
        }
      })
      .catch(() => setFailed(true));
  }, []);

  if (failed || count === null) return null;

  return (
    <div className="col-span-2 md:col-span-4 flex justify-center items-center text-ink text-xs font-mono gap-1 pt-2">
      <span role="img" aria-label="eye">👁</span>
      <span>{count.toLocaleString()} views</span>
    </div>
  );
};

export default ViewCounter;
