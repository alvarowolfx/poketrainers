import React, { Component } from 'react';

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ContentWeb from 'material-ui/svg-icons/communication/contact-mail';

class AboutPage extends Component {

  render() {
    return (
      <Card>
        <CardTitle
          title="Poke Trainers"
          subtitle="Sobre o site"
        />
        <CardText>
          <p>
            O site <b>Poke Trainers</b> foi começou a ser criado em 10/08/2016
            com o intuito de ajudar os jogadores de Pokemon Go. Foi inspirado
            no grande trabalho feito pelo site <a href="https://pokeassistant.com" target="_blank">
            Poke Assistant</a> e da união de diversas pessoas no Reddit, Github e outras fontes
            que foram utilizadas para apresentar as informações aqui.
          </p>
          <p>
            A intenção do projeto foi criar um site com uma interface mais moderna
            e que com algumas funcionalidades que não tinha visto em outros sites
            com o mesmo intuito, como por exemplo comparar os IVs de diversos pokemons,
            calcular XP por evolução com vários pokemons também, entre outras coisas.
          </p>          
          <p>
            Espero que possa ajudar desde jogadores iniciantes até os mais avançados.
          </p>
          Abraços,<br/>
          Alvaro Viebrantz
        </CardText>
        <CardActions>
          <RaisedButton primary label="Site do autor" icon={<ContentWeb/>}
            href="https://aviebrantz.com.br" target="_blank"/>
        </CardActions>
      </Card>
    );
  }
}

export default AboutPage;
