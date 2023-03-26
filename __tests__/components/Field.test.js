import React from "react";
import renderer from "react-test-renderer";

import Field from "../../components/Field";

describe("<Field />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Field
          options={{
            outfield: {
              fillColor: "none",
              strokeColor: "black",
              strokeWidth: 10,
            },
            infieldDirt: {
              fillColor: "none",
              strokeColor: "black",
              strokeWidth: 10,
            },
            infieldGrass: {
              fillColor: "none",
              strokeColor: "black",
              strokeWidth: 10,
            },
            bases: {
              fillColor: "black",
              strokeColor: "black",
              strokeWidth: 4,
            },
            home: {
              fillColor: "black",
              strokeColor: "black",
              strokeWidth: 4,
            },
            mound: {
              fillColor: "none",
              strokeColor: "black",
              strokeWidth: 10,
            },
            rubber: {
              fillColor: "black",
              strokeColor: "black",
              strokeWidth: 3,
            },
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
