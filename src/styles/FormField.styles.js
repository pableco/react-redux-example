import styled, { css } from 'styled-components';
import responsiveFonts from './helpers/responsiveFonts.styles';

export const onFocus = css`
    &:focus {
        outline: ${({ theme }) => theme.outline};
        outline-offset: 0;
    }
`;

const formStyles = {
    field: css`
        background: ${({ theme }) => theme.formFieldBackgorund};
        border: 0;
        border-bottom: ${({ theme }) => theme.formFieldBorder};
        border-radius: ${({ theme }) => theme.formFieldBorderRadius};
        color: ${({ theme }) => theme.formFieldColor};
        font-family: inherit;
    `,
    label: css`
        color: ${({ theme }) => theme.formLabelColor || theme.neutral500};
        display: block;
        /* stylelint-disable-next-line order/properties-alphabetical-order */
        ${responsiveFonts.StoB}
        padding-left: ${({ theme }) => theme.r050};
    `,
    input: css`
        background-color: transparent;
        border: 0;
        color: ${({ theme }) => theme.formFieldColor};
        display: block;
        flex-grow: 1;
        font-family: inherit;
        height: ${({ theme }) => theme.r400};
        letter-spacing: 0;
        line-height: ${({ theme }) => theme.iconDefaultSize};
        outline: none;
        padding: ${({ theme }) => `${theme.r100} 0`};
        text-align: left;
        ${responsiveFonts.StoB}
        ${onFocus};
    `,
};

export const InputTextStyles = styled.div`
    label {
        ${formStyles.label}
    }

    input {
        ${formStyles.input}
    }

    div {
        align-items: center;
        background: ${({ theme }) => theme.formFieldBackgorund};
        border-width: ${({ theme }) => theme.borderWidthM};
        display: flex;
        ${formStyles.field}

        &:focus-within {
            border-bottom: ${({ theme }) => theme.formFieldBorderFocus};

            input {
                color: ${({ theme }) => theme.formFieldColorFocus};
            }
        }
    }
`;
