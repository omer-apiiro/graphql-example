import { gql, useQuery } from "@apollo/client";
import {
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

import { AuthorCard } from "../components/AuthorCard";
import { Author } from "../types";

export const AUTHORS_QUERY = gql`
  query {
    authors {
      id
      name
      photo {
        url
      }
    }
  }
`;

export const AuthorsPage: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery<{
    authors: Author[];
  }>(AUTHORS_QUERY);

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <span>Loading authors...</span>
      </div>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Could not load authors...</Alert>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Authors
      </Typography>

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={3}
      >
        {data.authors.map((author) => (
          <Grid item key={author.id}>
            <AuthorCard author={author} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};