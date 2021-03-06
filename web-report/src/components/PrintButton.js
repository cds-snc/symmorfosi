/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme } from "./styles";
import { PrinterIcon } from "./icons/PrinterIcon";
import { runtimeConfig } from '../config';
import { I18N } from "./I18N";


const print = css`
  color: #fff;
  span {
    font-size: ${theme.font.md};
  }

  svg {
    height: 1.1rem;
    width: 1.1rem;
    margin-right: ${theme.spacing.sm};
  }

  display: flex;
  align-items: center;
`;

export const PrintButton = ({ link = "" }) => {
  return (
    (runtimeConfig.pdf_report_url !== "" && (!(typeof window !== 'undefined') || !window.location.pathname.includes("/controls/")) ? 
    <a
      data-testid="print-link"
      name="print-button"
      css={print}
      href={`${runtimeConfig.pdf_report_url}${link}`}
    >
      <PrinterIcon />
      <span data-testid="print-message"><I18N t="print-pdf"/></span>
    </a>
  : "" )
  )
};
