import React, { Component } from 'react';

import { Card, CardHeader, CardText, CardMedia, CardActions, CardTitle } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import Slider from 'react-slick';

import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';

import './App.css';

import t from 'tcomb-form'
const TForm = t.form.Form;

const TeamType = t.enums.of(['Valor', 'Instinct', 'Mystic']);
const DeviceType = t.enums.of(['iPhone 5/5S', 'iPhone 6/6s', 'Galaxy S6', 'Galaxy S7']);
const GenderType = t.enums({
  M: 'Homem',
  F: 'Mulher'
});

const LootFormSchema = t.struct({
  team: TeamType,
  deviceModel: DeviceType,
  email: t.String,
  gender: GenderType,
});

const SelectFieldTemplate = (locals) => {
  let items = locals.options.map( ({value, text}, i) => {
    return (
      <MenuItem key={"opt_"+i} value={value} primaryText={text} />
    );
  });
  return (
    <SelectField
      value={locals.value}
      onChange={(evt, index, value) => locals.onChange(value) }
      floatingLabelText={locals.label}
      fullWidth>
      {items}
    </SelectField>
  );
};

const CardSelectFieldTemplate = (locals) => {
  let items = locals.options.map( ({value, text}, i) => {
    return (
      <Card className="select-card">
        <CardHeader title={text}/>
        <CardMedia style={{height: "200px", overflow: 'hidden'}}>
          <img style={{position:'absolute'}}
              src={require(`./images/${value.toLowerCase()}.png`)} />
        </CardMedia>
        <CardActions>
          <RaisedButton label="Selecionar" primary
            onTouchTap={() => locals.onChange(value)} />
        </CardActions>
      </Card>
    );
  });
  return (
    <Container>
      <h2 className="mui--text-headline">{locals.label} - {locals.value}</h2>
      <div className="mui-row">
        {items}
      </div>
    </Container>
  );
};

const TextFieldTemplate = (locals) => {
  return (
    <div className="mui-textfield">
      <TextField
        floatingLabelText={locals.label}
        hintText={locals.label}
        value={locals.value}
        floatingLabelFixed
        fullWidth
      />
    </div>
  )
}

const FormTemplate = TForm.templates.struct.clone({
  renderFieldset: (children, locals) => {
    return (
      <Container>
        {children.map( (child,i) => (<div key={i}>{child}</div>) )}
      </Container>
    )
  }
});

class LootPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      form: {
        team: 'Valor',
        deviceModel: 'iPhone 5/5S',
        gender: 'M',
        email: '',
      }
    }

    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(value){
    this.setState({
      form: value
    })
  }

  render() {
    let options = {
      template: FormTemplate,
      fields: {
        team: {
          label: 'Escolha seu time',
          template: CardSelectFieldTemplate,
          nullOption: false
        },
        deviceModel: {
          label: 'Qual o seu smartphone',
          template: SelectFieldTemplate,
          nullOption: false
        },
        gender: {
          label: 'Sexo',
          template: SelectFieldTemplate,
          nullOption: false
        },
        email: {
          template: TextFieldTemplate
        }
      }
    };
    return (
      <div>
        <AppBar title="Pokemon Loot" showMenuIconButton={false}/>
        <Container className="App">
          <Card>
            <CardHeader
              title="Formulário"
              subtitle="Monte seu loot de acordo com seu time"
            />
            <Form>
              <TForm ref="form"
                type={LootFormSchema}
                options={options}
                value={this.state.form}
                onChange={this.onFormChange}/>
            </Form>
          </Card>
        </Container>
      </div>
    );
  }
}

export default LootPage;
