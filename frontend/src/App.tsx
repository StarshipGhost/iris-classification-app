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
  const [sepalLengthSliderValue, setSepalLengthSliderValue] = useState(50);
  const [sepalWidthSliderValue, setSepalWidthSliderValue] = useState(50);
  const [petalLengthSliderValue, setPetalLengthSliderValue] = useState(50);
  const [petalWidthSliderValue, setPetalWidthSliderValue] = useState(50);

  const handleSepalLengthSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSepalLengthSliderValue(parseInt(newValue));
  };

  const handleSepalWidthSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSepalWidthSliderValue(parseInt(newValue));
  };

  const handlePepalLengthSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPetalLengthSliderValue(parseInt(newValue));
  };

  const handlePetalWidthSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPetalWidthSliderValue(parseInt(newValue));
  };

  const sliders = [
    {
      name: "Sepal",
      dimension: "Length",
      value: sepalLengthSliderValue,
      handler: handleSepalLengthSliderChange,
      id: 1,
    },
    {
      name: "Sepal",
      dimension: "Width",
      value: sepalWidthSliderValue,
      handler: handleSepalWidthSliderChange,
      id: 2,
    },
    {
      name: "Petal",
      dimension: "Length",
      value: petalLengthSliderValue,
      handler: handlePepalLengthSliderChange,
      id: 3,
    },
    {
      name: "Petal",
      dimension: "Width",
      value: petalWidthSliderValue,
      handler: handlePetalWidthSliderChange,
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
