import type React from "react";
import {
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
} from "react";
import axios from "axios";

interface textProps {
  name: string;
  dimension: string;
}

interface featureTextProps extends textProps {
  value: number;
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
      <input type="range" min="0.0" max="10.0" step="0.1" onChange={onChange} />
    </div>
  );
};

const Property: React.FC<featureTextProps> = ({ name, dimension, value }) => {
  return (
    <p className="characteristics">
      {dimension} of the {name} (in cm) : {value.toFixed(1)}
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
  const [sepalLengthSliderValue, setSepalLengthSliderValue] = useState(5.0);
  const [sepalWidthSliderValue, setSepalWidthSliderValue] = useState(5.0);
  const [petalLengthSliderValue, setPetalLengthSliderValue] = useState(5.0);
  const [petalWidthSliderValue, setPetalWidthSliderValue] = useState(5.0);
  const [species, setSpecies] = useState("");

  const handleSepalLengthSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSepalLengthSliderValue(parseFloat(newValue));
  };

  const handleSepalWidthSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSepalWidthSliderValue(parseFloat(newValue));
  };

  const handlePepalLengthSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPetalLengthSliderValue(parseFloat(newValue));
  };

  const handlePetalWidthSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPetalWidthSliderValue(parseFloat(newValue));
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

  const handleClick = async () => {
    const data = {
      sepal_length: sepalLengthSliderValue,
      sepal_width: sepalWidthSliderValue,
      petal_length: petalLengthSliderValue,
      petal_width: petalWidthSliderValue,
    };

    const response = await axios.post("http://localhost:8000/prediction", data);
    console.log(response.data);
    setSpecies(response.data.species)

    // sliders.forEach(({ name, dimension, value }) =>
    //   console.log(`${dimension} of ${name}: ${value}`)
    // );
  };

  return (
    <div className="container">
      <h1>IRIS PREDICTOR WEB APP</h1>
      {species && <p>Prediction: {species}</p>}
      {sliders.map(({ name, dimension, value, handler, id }) => (
        <PropertySlider
          key={id}
          name={name}
          dimension={dimension}
          value={value}
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
