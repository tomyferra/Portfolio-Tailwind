import React, { useEffect, useRef, useState } from 'react';

const COUNTER_API_BASE = 'https://api.counterapi.dev/v2/tomas-ferraris-team-4660/first-counter-4660';

const ViewCounter = () => {
  const [count, setCount] = useState(null);
  const [failed, setFailed] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch(`${COUNTER_API_BASE}/up`)
      .then((res) => {
        if (!res.ok) throw new Error('counter request failed');
        return res.json();
      })
      .then((data) => {
        if (typeof data?.data?.up_count === 'number') {
          setCount(data.data.up_count);
        } else {
          setFailed(true);
        }
      })
      .catch(() => setFailed(true));
  }, []);

  if (failed || count === null) return null;

  return (
    <div className="col-span-2 md:col-span-4 text-center font-mono pt-2">
      <div className="font-serif font-black mb-2 text-5xl leading-none text-ink border-b-[3px] border-rust pb-1.5 inline-block">
        {count.toLocaleString()}
      </div>
      <div className="text-[10px] tracking-[4px] uppercase text-ink/50 mb-2 ">
        Site visits
      </div>
    </div>
  );
};

export default ViewCounter;
