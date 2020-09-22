import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from '@storybook/react';
import Button, { ButtonType } from "./Button";
import { faCoffee, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { withKnobs, optionsKnob as options, boolean } from "@storybook/addon-knobs";
import cartesian from 'storybook-cartesian'


export default {
  title: "Button",
  component: Button,
  decorators: [withKnobs]
};

const buttonTypeOptions = {
  Primary: ButtonType.primary,
  Secondary: ButtonType.secondary,
  Error: ButtonType.error,
  Gold: ButtonType.gold
}

export const Text = () => <Button onClick={() => { }} isSquare={boolean('Is Square', false)} type={options('Button Type', buttonTypeOptions, buttonTypeOptions.Primary, { display: 'inline-radio' })}>Hello Button</Button>;

export const WithIcon = () => (
  <Button icon={faCoffee} onClick={() => { }} isSquare={boolean('Is Square', false)} type={options('Button Type', buttonTypeOptions, buttonTypeOptions.Primary, { display: 'inline-radio' })}>
    With Icons
  </Button >
);

cartesian(storiesOf('Button/Cartesian', module))
  .add<any>(() => ({
    types: [
      ButtonType.primary,
      ButtonType.secondary,
      ButtonType.error,
      ButtonType.gold,
    ],
    icon: [faCoffee, faMinus, faPlus],
    text: ['Click Me', '', '👨‍💻👨‍💻👨‍💻👨‍💻'],
    isSquare: [true, false]
  }),
    props => <Button isSquare={props.isSquare} icon={props.icon} onClick={action('Clicked')} type={props.types}>
      {props.text}
    </Button>
    , {})