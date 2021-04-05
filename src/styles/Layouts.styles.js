import styled, { css } from 'styled-components';

export const ListStyles = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

export const ItemListStyles = styled.li`
    ${({ theme }) => css`
        align-items: center;
        border-radius: ${theme.roundedCard};
        box-shadow: ${theme.boxShadowBottom2};
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin: ${theme.r200};
        padding: ${theme.r150};
    `};
`;

export const KeypadStyles = styled.div`
    ${({ theme }) => css`
        button {
            margin: ${theme.r100};
        }
    `};
`;

export const SearchFormStyles = styled.form`
    ${({ theme }) => css`
        background-color: ${theme.colorBg};
        box-shadow: ${theme.boxShadowBottom3};
        display: flex;
        justify-content: center;
        padding: ${theme.r150};
        position: sticky;
        top: 0;
        width: 100%;

        button {
            margin-left: ${theme.r100};
        }
    `};
`;
