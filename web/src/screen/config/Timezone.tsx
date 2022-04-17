import Section from 'component/Section'
import React, { useEffect, useState } from 'react'
import { StylesConfig } from 'react-select'
import ct from 'countries-and-timezones';
import Select from 'component/Select';
import * as GuildApi from 'api/guild';

const Timezone = (props: {
  server: any;
}) => {
  const [timezone, setTimezone] = useState();
  const timezones = Object.keys(ct.getAllTimezones());

  useEffect(() => {
    if (!props.server || !timezone)
      return;
    GuildApi.updateTimezone(props.server.id, timezone)
      .then();
  }, [ timezone ]);

  return (
    <Section
      title="Timezone"
      description="Configure the timezone for your server."
    >
      <Select
        styles={SelectStyle}
        options={timezones.map((t: string) => {
          return {
            label: t,
            value: t
          }
        })}
        onChange={(val: any) => {
          setTimezone(val.value);
        }}
      />
    </Section>
  )
}

const SelectStyle: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    width: `18em`,
    cursor: 'pointer'
  })
};

export default Timezone