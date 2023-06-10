import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { YogaItem } from "./YogaItem";
import { YogaBlog } from "../models/yogaList.interface";

const testItem: YogaBlog = {
  id: 1,
  title: "ABC",
  details: "XYZ",
  youtubeId: "123",
};

test("Render yoga item component", async () => {
  render(<YogaItem item={testItem} />, { wrapper: BrowserRouter });

  expect(screen.getByRole("link")).toHaveTextContent("ABC");
  expect(screen.getByTestId("details")).toHaveTextContent("XYZ");
});
