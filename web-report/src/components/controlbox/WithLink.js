/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { Link } from "react-router-dom";
import { runtimeConfig } from '../../config';


export const WithLink = ({ children, id, link, keyDownSingleRelease }) => {
  const url = `${runtimeConfig.relative_path}/controls/${id}`;
  const label = `Control: ${id}`;
  return link ? (
    <Link
      to={url}
      tabIndex="-1"
      name="control-link"
      onKeyDown={keyDownSingleRelease}
      data-testid="control-box-link"
      aria-label={label}
    >
      {children}
    </Link>
  ) : (
    <div data-testid="with-link-children">{children}</div>
  );
};
