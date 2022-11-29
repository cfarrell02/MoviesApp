import React from "react";
import { useParams } from 'react-router-dom';
import ActorDetails from "../components/actorComponents/actorDetails/";
import PageTemplate from "../components/actorComponents/templateActorPage";
//import useMovie from "../hooks/useMovie";
import { getPerson } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const PersonDetailsPage = (props) => {
  const { id } = useParams();

  const { data: person, error, isLoading, isError } = useQuery(
    ["person", { id: id }],
    getPerson
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {person ? (
        <>
          <PageTemplate person={person}>
            <ActorDetails person={person} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default PersonDetailsPage;