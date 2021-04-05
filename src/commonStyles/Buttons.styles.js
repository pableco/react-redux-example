import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import responsiveFonts from './helpers/responsiveFonts.styles';

const disabled = css`
    &:disabled,
    &[disabled] {
        background: ${(props) => props.theme.buttonDisabledBg
            || props.theme.neutral100};
        border: ${(props) => props.theme.buttonDisabledBorder
            || `1px solid ${props.theme.neutral200}`};
        color: ${(props) => props.theme.buttonDisabledColor
            || props.theme.neutral200};

        svg {
            fill: ${(props) => props.theme.buttonDisabledColor
                || props.theme.neutral200};
        }
    }
`;

const focus = css`
    &:focus {
        outline: ${({ theme })=> theme.outline};
        outline-offset: 0;
    }
`;

const mods = {
    default: css`
        &,
        &:hover,
        &:visited,
        &:active {
            background-color: ${({ theme }) => theme.buttonDefaultBg || 'transparent'};
            border: ${({ theme }) => theme.buttonDefaultBorder
                || `${theme.borderWidthS} solid ${theme.neutral200}`};
            color: ${({ theme }) => theme.buttonDefaultColor || theme.neutral500};
        }
        ${disabled}
        ${focus}
    `,
    primary: css`
        &,
        &:hover,
        &:visited,
        &:active {
            background-color: ${({ theme }) => theme.buttonPrimaryBgColor
                || theme.colorMain};
            border: ${({ theme }) => theme.buttonPrimaryBorder
                || `${theme.borderWidthS} solid transparent`};
            color: ${(props) => props.theme.buttonPrimaryTextColor
                || props.theme.neutral000};
        }
        ${disabled}
        ${focus}
    `,
    primaryOver: css`
        ${({ theme }) => css`
            &:hover,
            &:active {
                background-color: ${(props) => props.theme.buttonPrimaryBgColorOver
                    || props.theme.colorMain700};
                border: ${(props) => props.theme.buttonPrimaryBorderOver
                    || `${theme.borderWidthS} solid transparent`};
                color: ${(props) => props.theme.buttonPrimaryTextColorOver
                    || props.theme.neutral100};
            }
        `}
    `,
    secondary: css`
        &,
        &:hover,
        &:visited,
        &:active {
            background-color: ${(props) => props.theme.buttonSecondaryBgColor
                || props.theme.neutral000};
            border: ${(props) => props.theme.buttonSecondaryBorder
                || `1px solid ${props.theme.neutral200}`};
            color: ${(props) => props.theme.buttonSecondaryColor
                || props.theme.neutral500};
        }
        ${disabled}
        ${focus}
    `,
    success: css`
        &,
        &:hover,
        &:visited,
        &:active {
            background-color: ${(props) => props.theme.buttonSuccessBgColor
                || props.theme.colorSuccess};
            border: ${(props) => props.theme.buttonSuccessBorder
                || '0'};
            color: ${(props) => props.theme.buttonSuccessColor
                || props.theme.neutral000};
        }
        ${disabled}
        ${focus}
    `,
    danger: css`
        &,
        &:hover,
        &:visited,
        &:active {
            background-color: ${(props) => props.theme.buttonDangerBgColor
                || props.theme.colorDanger};
            border: ${(props) => props.theme.buttonDangerBorder
                || '0'};
            color: ${(props) => props.theme.buttonDangerColor
                || props.theme.neutral000};
        }
        ${disabled}
        ${focus}
    `,
    full: css`
        margin: ${({ theme }) => `${theme.r150} ${theme.r200}`};
        width: ${({ theme }) => `calc(100% - ${theme.r400})`};
    `,
    rounded: css`
        border-radius: ${(props) => props.theme.buttonRounded || props.theme.round};
    `,
    actionRounded: css`
        border-radius: ${(props) => props.theme.buttonIconsRound || props.theme.round};
    `,
    large: css`
        ${responsiveFonts.LtoXL}
        padding: 1.1em;
    `,
    base: css`
        ${responsiveFonts.BtoL}
        padding: .8em;
    `,
    small: css`
        ${responsiveFonts.StoB}
        padding: .6em;
    `,
    disabled: css`
        &,
        &:hover,
        &:visited,
        &:active {
            background: ${(props) => props.theme.buttonDisabledBg
                || props.theme.neutral100};
            border: ${(props) => props.theme.buttonDisabledBorder
                || `1px solid ${props.theme.neutral200}`};
            color: ${(props) => props.theme.buttonDisabledColor
                || props.theme.neutral200};
        }
    `,
    action: css`
        ${({ theme }) => css`
            &,
            &:visited{
                background-color: ${theme.ButtonActionBgColor || theme.neutral000};
                border: ${theme.ButtonActionBorder || `1px solid ${theme.colorMain}`};
                color: ${theme.ButtonActionColor || theme.colorMain};
                /* stylelint-disable-next-line no-descending-specificity */
                svg {
                    fill: ${theme.ButtonActionColor || theme.colorMain};
                }
            }
        `}
    `,
    actionOver: css`
        ${({ theme }) => css`
            &:hover,
            &:active {
                background-color: ${theme.ButtonActionBgColorOver || theme.colorMain};
                border: ${theme.ButtonActionBorderOver || `1px solid ${theme.neutral000}`};
                color: ${theme.ButtonActionColorOver || theme.neutral000};
                /* stylelint-disable-next-line no-descending-specificity */
                svg {
                    fill: ${theme.ButtonActionColorOver || theme.neutral000};
                }
            }

            ${disabled}
            ${focus}
        `}
    `,
};


const ButtonBase = styled.button`
    background-clip: padding-box;
    cursor: pointer;
    display: inline-block;
    margin: unset;
    letter-spacing: inherit;
    outline: none;
    outline-offset: 0;
    text-align: center;
    text-decoration: none;
    text-transform: ${({ theme }) => theme.buttonTextTransform || 'uppercase'};
    transition-delay: 0;
    transition-duration: ${({ theme }) => theme.animationTimeS};
    transition-property: all;
    transition-timing-function: ease-in-out;
    ${mods.base}
    ${mods.rounded}
`;

const Button = styled(ButtonBase)`
    ${mapModifiers}
`;

function mapModifiers(props) {
    return props.mods ? props.mods.map((mod) => mods[mod]) : mods.default;
}

Button.Primary = styled(Button)`
    ${mods.primary}
    ${mods.primaryOver}
`;

Button.Common = styled(Button)`
    ${mods.large}
    ${mods.full}
    ${mods.primary}
`;

Button.CommonAlt = styled(Button)`
    ${mods.large}
    ${mods.full}
    ${mods.secondary}
`;

Button.Rounded = styled(Button)`
    ${mods.rounded}
    ${mods.primary}
`;

Button.RoundedAlt = styled(Button)`
    ${mods.rounded}
    ${mods.secondary}
`;

Button.Invert = styled(ButtonBase)`
    ${mods.rounded}
    ${mods.action}
    ${mods.actionOver}
    ${(props) => !!props.mods?.length && mapModifiers}
`;

Button.ActionSvg = styled(ButtonBase)`
    letter-spacing: inherit;
    ${mods.base}
    ${mods.rounded}
    ${mods.action}
    ${mods.rounded}
    /* stylelint-disable-next-line order/properties-alphabetical-order */
    align-items: center;
    display: flex;
    justify-content: center;

    /* stylelint-disable-next-line no-descending-specificity */
    & svg {
        fill: currentColor;
        height: 1em;
        margin-right: ${({ theme }) => theme.r100};
        width: 1em;
    }

    ${(props) => !!props.mods?.length && mapModifiers}
`;

Button.ActionDefault = styled.button`
    display: inline-block;
    height: ${({ theme }) => theme.iconDefaultSize};
    text-decoration: none;
    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${mods.actionRounded}
    width: ${({ theme }) => theme.iconDefaultSize};
    /* stylelint-disable-next-line no-descending-specificity */
    & svg {
        fill: currentColor;
    }
`;

Button.Action = styled(Button.ActionDefault)`
    ${mods.action}
    ${mods.actionOver}
`;

Button.ActionAlt = styled(Button.ActionDefault)`
    ${mods.secondary}
`;

Button.Success = styled(Button)`
    ${mods.success}
`;

Button.propTypes = {
    mods: PropTypes.arrayOf(PropTypes.oneOf(
        [
            '',
            'default',
            'primary',
            'secondary',
            'success',
            'danger',
            'full',
            'rounded',
            'large',
            'base',
            'small',
            'disabled',
            'action',
        ],
    )),
};

Button.defaultProps = {
    mods: ['default'],
};

export {
    disabled,
    mods,
};
export default Button;
