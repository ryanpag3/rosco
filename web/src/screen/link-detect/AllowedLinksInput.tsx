import Column from 'component/Column';
import React, { useEffect, useState } from 'react'
import { MultiValue, StylesConfig } from 'react-select';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import SelectStyle from 'component/SelectStyle';
import * as AutoModApi from 'api/automod';

const AllowedLinksInput = (props: any) => {
    const [isInit, setIsInit] = useState(false);
    const [links, setLinks] = useState([] as any);

    useEffect(() => {
      if (isInit === true)
        return;

      AutoModApi.getLinkDetectData(props.server.id)
        .then((data) => {
          setLinks(data?.data.links.map((l: string) => {
            return {
              label: l,
              value: l
            }
          }))
          setIsInit(true);
        });
    })
  
    async function submit(links: MultiValue<unknown>) {
        AutoModApi.setLinkDetect(props.server.id, links.map((l: any) => l.value))
          .then();
        setLinks(links);
    }
  
    return (
      <Container>
          <CreatableSelect
            isMulti
            isClearable
            onChange={submit}
            styles={{...SelectStyle, ...CreatableStyle}}
            options={links}
            value={links}
          />
      </Container>
  )
}

const Container = styled(Column)`

`;

const CreatableStyle: StylesConfig = {

}

export default AllowedLinksInput