/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { Count, PassFailText } from "../index";
import { theme, roundedEdges, mediaQuery } from "../styles";

const statusBarFailed = css`
  background: ${theme.colour.redDark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${theme.spacing.lg} ${theme.spacing.xxl} ${theme.spacing.lg}
    ${theme.spacing.xxl};
  ${roundedEdges};

  ${mediaQuery.xl(css`
    margin: ${theme.spacing.lg} ${theme.spacing.xxl} ${theme.spacing.lg}
      ${theme.spacing.xxl};
  `)};

  ${mediaQuery.lg(css`
    margin: ${theme.spacing.lg} ${theme.spacing.xl} ${theme.spacing.lg}
      ${theme.spacing.xl};
  `)};
`;

const statusBarPassed = css`
${statusBarFailed}
background: ${theme.colour.greenDark};
`;

const errorMessage = css`
  border: 1px solid ${theme.colour.grayOutline};
  background: ${theme.colour.white};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.md} ${theme.spacing.xxl};

  ${mediaQuery.lg(css`
    margin: ${theme.spacing.md} ${theme.spacing.xl};
  `)}
`;

const IsReady = ({ data, statusRef }) => {
  if (data) {
    return (
      <div>
        {data.map(release => {
          return (
            <div
              data-testid="status-bar"
              key="statusBar"
              css={
                release.passed === "true" ? statusBarPassed : statusBarFailed
              }
              ref={statusRef}
              tabIndex="0"
            >
              <PassFailText status={data} />
              <Count status={data} />
            </div>
          );
        })}
      </div>
    );
  }
  if (!data) {
    return (
      <p css={errorMessage} data-testid="error-message">
        <strong>
          Sorry, something went wrong. The status of the release could not be
          found.
        </strong>
      </p>
    );
  }
};

export default IsReady;
