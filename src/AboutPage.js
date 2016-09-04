import React, { Component } from 'react';

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ContentWeb from 'material-ui/svg-icons/communication/contact-mail';

import translate from './translate';

class AboutPage extends Component {

  render() {
    let { t } = this.props;
    return (
      <Card>
        <CardTitle
          title="Poke Trainers"
          subtitle={t('about.title')}
        />
        <CardText dangerouslySetInnerHTML={{ __html: t('about.desc')}}/>
        <CardActions>
          <RaisedButton primary label={t('about.authorSite')} icon={<ContentWeb/>}
            href="https://aviebrantz.com.br" target="_blank"/>
        </CardActions>
      </Card>
    );
  }
}

export default translate(AboutPage);
