import React, { type ChangeEventHandler } from "react";

interface textProps {
  name: string;
  dimension: string;
}

interface measureTextProps extends textProps {
  value: number;
}

interface sliderProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

interface sliderContainerProps extends measureTextProps, sliderProps {}

interface containerProps {
  sliders: {
    name: string;
    dimension: string;
    value: number;
    handler: ChangeEventHandler<HTMLInputElement>;
    id: number;
  }[];
}

const PropertyTitle: React.FC<textProps> = ({ name, dimension }) => {
  return (
    <p className="title-characteristics">
      {name} {dimension}
    </p>
  );
};

const Slider: React.FC<sliderProps> = ({ onChange }) => {
  return (
    <div className="slider">
      <input type="range" min="0.0" max="10.0" step="0.1" onChange={onChange} />
    </div>
  );
};

const Property: React.FC<measureTextProps> = ({ name, dimension, value }) => {
  return (
    <p className="characteristics">
      {dimension} of the {name} (in cm) : {value.toFixed(1)}
    </p>
  );
};

const PropertySlider: React.FC<sliderContainerProps> = ({
  name,
  dimension,
  value,
  onChange,
}) => {
  return (
    <div className="property-box">
      <PropertyTitle name={name} dimension={dimension} />
      <Slider onChange={onChange} />
      <Property name={name} dimension={dimension} value={value} />
    </div>
  );
};

const PropertySliders: React.FC<containerProps> = ({ sliders }) => {
  return sliders.map(({ name, dimension, value, handler, id }) => (
    <PropertySlider
      key={id}
      name={name}
      dimension={dimension}
      value={value}
      onChange={handler}
    />
  ));
};

export default PropertySliders;
