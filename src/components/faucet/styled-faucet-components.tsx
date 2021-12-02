import styled from 'styled-components/macro'

import { RowBetween } from '../Row'

export const TitleRow = styled(RowBetween)`
  color: ${({ theme }) => theme.text2};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
  `};
`
export const Wrapper = styled.div`
  display: flex;
  position: relative;
  padding: 8px;
  max-width: 870px;
  width: 100%;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 800px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    max-width: 500px;
  `};
`

export const FormWrapper = styled.div`
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.bg0};
  padding: 1rem;
  border-radius: 1.25rem;
`

export const Form = styled.form`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.bg0};
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
`
export const Feedback = styled.p`
  color: ${({ theme }) => theme.primary1};
`

export const TokenAddressPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.bg1};
  z-index: 1;
  width: 100%;

  :hover {
    cursor: pointer;
  }
`

export const ContainerRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

export const TokenAddressContainer = styled.div`
  flex: 1;
  padding: 1rem;
`

export const TokenAddress = styled.div`
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text1};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`

export const DropDownContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  text-align: left;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.bg1};
`

export const DropDownHeader = styled.button`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: transparent;
  margin: 0;
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.bg2};
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text1};

  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`

export const DropDownListContainer = styled('div')`
  position: absolute;
  width: 100%;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border: 1px solid ${({ theme }) => theme.bg0};
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    bottom: unset;
    right: 0;
    left: unset;
  `};
`

export const DropDownList = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
  padding-left: 1em;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;

  &:first-child {
    padding-top: 0.8em;
  }
`

export const ListItem = styled('span')`
  list-style: none;
  margin-bottom: 0.8em;
  color: ${({ theme }) => theme.text2};

  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }

  padding: 0.5rem 0.5rem;
  font-size: 1.25rem;
`

export const UniIcon = styled.div`
  transition: transform 0.3s ease;

  :hover {
    transform: rotate(-10deg);
  }
`
