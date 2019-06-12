/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { I18N } from "../I18N";
import { theme, passingText, failingText, mediaQuery } from "../styles";
import { Timestamp } from "./Timestamp";

const topInfo = css`
  display: flex;
  justify-content: space-between;
  h2 {
    font-size: ${theme.font.lg};
    font-weight: 700;
    margin-top: 0;
    margin-bottom: ${theme.spacing.md};
    margin-left: ${theme.spacing.lg};
    width: 80%;
  }
  span:first-of-type {
    margin-right: ${theme.spacing.lg};
    font-size: ${theme.font.sm};
    font-weight: 700;
    height: 1.4rem;
    width: 5rem;
  }

  ${mediaQuery.sm(css`
    margin-bottom: ${theme.spacing.sm};
    justify-content: flex-start;
    h2 {
      width: auto;
      font-size: ${theme.font.md};
      margin-bottom: ${theme.spacing.sm};
    }

    span:first-of-type {
      position: relative;
      font-size: ${theme.font.xs};
      font-weight: 700;
      margin-left: ${theme.spacing.lg};
      margin-bottom: 0;
      height: 1.1rem;
    }
  `)};
`;

const passingTitle = css`
  color: ${theme.colour.greenDark};
`;

const failingTitle = css`
  color: ${theme.colour.redDark};
`;

export const Header = ({
  title,
  status,
  timestamp,
  titleTimestamp,
  titleColour,
  formattedDate
}) => {
  return (
    <div data-testid="top-container" css={topInfo}>
      <h2
        css={
          status === "true" && titleColour === true
            ? passingTitle
            : status === "false" && titleColour === true
            ? failingTitle
            : null
        }
        name="control-box-title"
        data-testid="control-box-title"
      >
        {titleTimestamp ? `${timestamp}` : title}
      </h2>
      {status === "true" ? (
        <span
          name="passing-badge"
          data-testid="control-box-pass"
          css={passingText}
        >
          <I18N t="passed" />
        </span>
      ) : (
        <span
          name="failing-badge"
          data-testid="control-box-fail"
          css={failingText}
        >
          <I18N t="failed" />
        </span>
      )}
    </div>
  );
};
