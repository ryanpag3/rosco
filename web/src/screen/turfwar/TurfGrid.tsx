import React, { useEffect, useState } from 'react'
import * as TurfApi from 'api/turfwar';

const TurfGrid = () => {
  const [metadata, setMetadata] = useState();

  useEffect(() => {
    if (metadata)
      return;

    TurfApi.getGraph()
      .then((data) => {
        setMetadata(data);
      });
  }, [ metadata ]);

  return (
    <div>TurfGrid</div>
  )
}

export default TurfGrid