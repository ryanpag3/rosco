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
  const [isInit, setIsInit] = useState(false)
  const [words, setWords] = useState([] as any);

  useEffect(() => {
    if (isInit === true)
      return;

    AutoModApi.getBannedWordsData(props.server.id)
      .then((data) => {
        setWords(data.data.words.map((w: string) => {
          return {
            label: w,
            value: w
          }
        }))
        setIsInit(true);
      });
  });

  async function submitWords(words: MultiValue<unknown>) {
    console.log(words);
    AutoModApi.setBannedWords(props.server.id, words.length === 0 ? [] : words.map((v: any) => v.value))
      .then();
    setWords(words);
  }

  return (
    <Container>
      <CreatableSelect
        isMulti
        isClearable
        onChange={submitWords}
        styles={{ ...SelectStyle, ...CreatableStyle }}
        options={words}
        value={words}
      />
    </Container>
  )
}

const Container = styled(Column)`

`;

const CreatableStyle: StylesConfig = {

}

export default SetBannedWordsInput