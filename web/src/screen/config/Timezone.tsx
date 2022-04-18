import Section from 'component/Section'
import React, { useEffect, useState } from 'react'
import { StylesConfig } from 'react-select'
import ct from 'countries-and-timezones';
import Select from 'component/Select';
import * as GuildApi from 'api/guild';
import { SelectedServerContext } from 'context/selected-server-context';

const Timezone = (props: {
  server: any;
}) => {
  const [timezone, setTimezone] = useState(undefined as any);
  const [isLoading, setIsLoading] = useState(true);
  const timezones = Object.keys(ct.getAllTimezones());

  useEffect(() => {
    if (!props.server.timezone)
      return;
    setTimezone({
      value: props.server.timezone,
      label: props.server.timezone
    } as any);
    setIsLoading(false);
  }, [ props.server.timezone ])

  useEffect(() => {
    if (!props.server || !timezone?.value)
      return;
    GuildApi.updateTimezone(props.server.id, timezone?.value)
      .then();
  }, [timezone]);

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
        isLoading={isLoading}
        value={timezone}
        onChange={(val: any) => {
          setTimezone(val);
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