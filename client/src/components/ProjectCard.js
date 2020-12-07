import React from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function ProjectCard({ project: { name, description, tasks, createdAt, id, username }}){

    return (
        <Card fluid>
    <Image src='https://icons-for-free.com/iconfiles/png/512/desk+furniture+lamp+office+table+work+icon-1320185905879312737.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
    <Card.Meta as={Link} to={`/projects/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
    <Button as='div' labelPosition='right'>
      <Button color='yellow'>
        <Icon name='fork' />
        View Tasks
      </Button>
      <Label as='a' basic color='yellow' pointing='left'>
        {tasks.length}
      </Label>
    </Button>
    </Card.Content>
  </Card>
)
}


export default ProjectCard;