import React from "react";
import { cleanup, render } from "react-testing-library";
import "jest-dom/extend-expect";
import { dataDetails } from "../../__mocks__/mockData.js";

global.window.__NEXT_DATA__ = {
  ids: []
};

const DetailsPage = require("../../pages/details").default;

afterEach(cleanup); // <-- add this

test("Renders DetailsPage", async () => {
  const { getByTestId, getAllByTestId } = render(
    <DetailsPage data={dataDetails} controlParam="SA-11" />
  );

  const releaseLinks = getAllByTestId("release-link");
  const controlBoxes = getAllByTestId("control-box");
  const controlBoxTitles = getAllByTestId("control-box-title");
  const references = getAllByTestId("references");
  const components = getAllByTestId("component");

  expect(getByTestId("main-header-h1")).toHaveTextContent(
    "Are we compliant yet?"
  );
  expect(getByTestId("print-message")).toHaveTextContent(
    "Print this page (PDF)"
  );
  expect(getByTestId("print-link")).toHaveAttribute(
    "href",
    "/pdf-details/SA-11/"
  );

  expect(getByTestId("cds-logo")).toHaveAttribute(
    "id",
    "CDS Logo White Outline"
  );

  expect(getByTestId("verification-h1")).toHaveTextContent("Verification:");
  expect(getByTestId("collapsible-h2")).toHaveTextContent("SA-11");
  expect(getByTestId("toggle-read")).toHaveTextContent(
    "Read the SA-11 description"
  );

  expect(releaseLinks).toHaveLength(9);
  expect(releaseLinks[0]).toHaveAttribute(
    "href",
    "/singlerelease/6a29e06ffcb4adef8e8e332ac688e71f57450abf-1549898889619"
  );

  expect(getByTestId("control-list"));
  expect(controlBoxes).toHaveLength(27);

  expect(controlBoxTitles).toHaveLength(27);
  expect(controlBoxTitles[0]).toHaveTextContent("10:28:17 AM, 11-02-2019");

  expect(references).toHaveLength(27);
  expect(references[0]).toHaveTextContent(
    "Reference(s): https://github.com/cds-snc/report-a-cybercrime/blob/master/frontend/.eslintrc.json"
  );

  expect(components).toHaveLength(27);
  expect(components[0]).toHaveTextContent("Component: Source code");

  expect(getByTestId("back-to-top")).toHaveTextContent("Back To Top of Page");
  expect(getByTestId("back-to-top")).toHaveAttribute(
    "aria-label",
    "click or press 'Enter' on this link to navigate to the top of the page"
  );
});

test("Renders DetailsPage", async () => {
  const { getByTestId } = render(<DetailsPage />);
  expect(getByTestId("api-fail")).toHaveTextContent(
    "Failed to fetch GraphQL API data"
  );
});
