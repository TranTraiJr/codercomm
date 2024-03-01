import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: #eef2ff;
    background-color: #4f46e5;

    &:hover {
      background-color: #4338ca;
    }
  `,
  secondary: css`
    color: #d1d5db;
    background: #18212f;
    border: 1px solid #374151;

    &:hover {
      background-color: #111827;
    }
  `,
  danger: css`
    color: #fee2e2;
    background-color: #b91c1c;

    &:hover {
      background-color: #991b1b;
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
