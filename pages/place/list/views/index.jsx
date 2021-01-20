import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  Acronym,
  FilterTable,
  Snippet,
  Link,
  Header,
  LicenceStatusBanner,
  Search
} from '@asl/components';
import formatters from '../../formatters';

const pageFormatters = {
  name: {
    format: (name, place) => {
      return (
        <Fragment>
          <Link page="place.read" label={name} placeId={place.id} />
          {
            place.restrictions && <i className="icon icon-information" />
          }
        </Fragment>
      );
    }
  },
  nacwos: {
    format: nacwos => {
      return nacwos && nacwos.map(profile => (
        <p key={profile.id} className="no-margins">
          <Link
            page="profile.read"
            profileId={profile.id}
            label={`${profile.firstName} ${profile.lastName}`}
          />
        </p>
      ));
    }
  },
  nvssqps: {
    format: nvssqps => {
      return nvssqps && nvssqps.map(profile => (
        <p key={profile.id} className="no-margins">
          <Link
            page="profile.read"
            profileId={profile.id}
            label={`${profile.firstName} ${profile.lastName}`}
          />
        </p>
      ));
    }
  }
};

export default function Places() {
  const { establishment, allowedActions } = useSelector(state => state.static);
  const { schema } = useSelector(state => state.datatable);

  schema.nacwos.label = <Fragment><Acronym>NACWO</Acronym>s</Fragment>;
  schema.nvssqps.label = <Fragment><Acronym>NVS</Acronym>s / <Acronym>SQP</Acronym>s</Fragment>;

  return (
    <Fragment>
      <LicenceStatusBanner licence={establishment} licenceType="pel" />
      <Header
        title={<Snippet>pages.place.list</Snippet>}
        subtitle={establishment.name}
      />
      <Search label={<Snippet>searchText</Snippet>} />
      <FilterTable
        schema={schema}
        formatters={Object.assign({}, formatters, pageFormatters)}
        createPath={allowedActions.includes('place.create') && 'place.create'}
        className="places-list"
        resultType="approved areas"
        downloadLink={<Link key="csv-download" page="place.list" query={{csv: 1}} label="Download as CSV" />}
      />
    </Fragment>
  );
}
