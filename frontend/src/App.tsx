import type React from "react";
import {
  use,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
} from "react";

interface textProps {
  name: string;
  dimension: string;
}

interface featureTextProps extends textProps {
  value: string;
}

interface sliderProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

interface props extends featureTextProps, sliderProps {}

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
      <input type="range" min="0" max="100" step="10" onChange={onChange} />
    </div>
  );
};

const Property: React.FC<featureTextProps> = ({ name, dimension, value }) => {
  return (
    <p className="characteristics">
      {dimension} of the {name} (in cm) : {value}
    </p>
  );
};

const PropertySlider: React.FC<props> = ({
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

const App: React.FC = () => {
  const [sliderValue1, setNewSliderValue1] = useState(50);
  const [sliderValue2, setNewSliderValue2] = useState(50);
  const [sliderValue3, setNewSliderValue3] = useState(50);
  const [sliderValue4, setNewSliderValue4] = useState(50);

  const handleSlider1Change = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNewSliderValue1(parseInt(newValue));
  };

  const handleSlider2Change = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNewSliderValue2(parseInt(newValue));
  };

  const handleSlider3Change = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNewSliderValue3(parseInt(newValue));
  };

  const handleSlider4Change = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNewSliderValue4(parseInt(newValue));
  };

  const sliders = [
    {
      name: "Sepal",
      dimension: "Length",
      value: sliderValue1,
      handler: handleSlider1Change,
      id: 1,
    },
    {
      name: "Sepal",
      dimension: "Width",
      value: sliderValue2,
      handler: handleSlider2Change,
      id: 2,
    },
    {
      name: "Petal",
      dimension: "Length",
      value: sliderValue3,
      handler: handleSlider3Change,
      id: 3,
    },
    {
      name: "Petal",
      dimension: "Width",
      value: sliderValue4,
      handler: handleSlider4Change,
      id: 4,
    },
  ];

  const handleClick = () => {
    sliders.forEach(({ name, dimension, value }) =>
      console.log(`${dimension} of ${name}: ${value}`)
    );
  };

  return (
    <div className="container">
      <h1>IRIS PREDICTOR WEB APP</h1>
      {sliders.map(({ name, dimension, value, handler, id }) => (
        <PropertySlider
          key={id}
          name={name}
          dimension={dimension}
          value={value.toString()}
          onChange={handler}
        />
      ))}
      <button id="prediction-button" onClick={handleClick}>
        PREDICTION
      </button>
    </div>
  );
};

export default App;
