import RequestWrapper from "./RequestWrapper";
import { render, screen } from "@testing-library/react";

describe("RequestWrapper", () => {
  it("renders without crashing", () => {
    const { rerender, getByTestId } = render(<RequestWrapper>test</RequestWrapper>);

    expect(screen.getByText("test")).toBeInTheDocument();
    rerender(<RequestWrapper isLoading={true}>test</RequestWrapper>);

    expect(screen.queryByText("test")).not.toBeInTheDocument();
    expect(getByTestId("loader")).toBeInTheDocument();

  });
});
