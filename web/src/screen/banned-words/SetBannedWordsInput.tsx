import Column from 'component/Column';
import SelectStyle from 'component/SelectStyle';
import React, { useEffect, useState } from 'react'
import { ActionMeta, MultiValue, StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components'
import * as AutoModApi from 'api/automod';

const SetBannedWordsInput = (props: {
  server: any;
}) => {
  const [words, setWords] = useState([] as any);

  useEffect(() => {
    console.log(words);
    AutoModApi.setBannedWords(props.server.id, words).then();
  }, [ words ])

  return (
    <Container>
      <CreatableSelect
        isMulti
        isClearable
        onChange={(newValue: MultiValue<unknown>, actionMeta: ActionMeta<unknown>) => setWords(newValue.map((v: any) => v.value))}
        styles={{...SelectStyle, ...CreatableStyle }}
      />
    </Container>
  )
}

const Container = styled(Column)`

`;

const CreatableStyle: StylesConfig = {

}

export default SetBannedWordsInput