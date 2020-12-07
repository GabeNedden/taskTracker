import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import ProjectCard from '../components/ProjectCard';

function Home() {
    const { loading, data: { getProjects: projects } = {} } = useQuery(FETCH_PROJECTS_QUERY);

    console.log(projects)
    
    return (
        <Grid centered columns={5}>
            <Grid.Row className="page-title">
                <h1>Recent Projects</h1>
            </Grid.Row>
            <Grid.Row>
            {loading ? ( <h1>Loading Projects...</h1> ) : (

                    projects && projects.map(project => (
                        <Grid.Column key={project.id} style={{ marginBottom: 30 }}>
                            <ProjectCard project={project}/>
                        </Grid.Column>
                    ))
            )}

            </Grid.Row>
        </Grid>
    );
};

const FETCH_PROJECTS_QUERY = gql`
    {
        getProjects{
        id
        name
        description
        createdAt
        username
        tasks{
            id
            name
            description
            createdAt
            username
            comments{
                id
                body
                username
                createdAt
            }
            
        }
  }
    }
`

export default Home;