import { Trans } from '@lingui/macro'
import { useCallback, useState } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'

import { AutoColumn } from '../Column'
import Tooltip, { MouseoverTooltip } from '../Tooltip'

const TokenAddressPanel = styled.div`
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

const ContainerRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

const TokenAddressContainer = styled.div`
  flex: 1;
  padding: 1rem;
`

const TokenAddress = styled.div`
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
export default function FaucetTokenAddressPanel({ tokenAddress }: { tokenAddress: string }) {
  const [tooltipText, setTooltipText] = useState<string>('Click to copy to clipboard.')

  const copiedFeedback = useCallback(async () => {
    await navigator.clipboard.writeText(tokenAddress)
    const beforeTooltipText = tooltipText
    setTooltipText('COPIED TO CLIPBOARD!')
    setTimeout(() => {
      setTooltipText(beforeTooltipText)
    }, 2000)
  }, [])

  return (
    <MouseoverTooltip text={<Trans>{tooltipText}</Trans>}>
      <TokenAddressPanel onClick={copiedFeedback}>
        <ContainerRow>
          <TokenAddressContainer>
            <AutoColumn gap="md">
              <TokenAddress>
                <Trans>{tokenAddress}</Trans>
              </TokenAddress>
            </AutoColumn>
          </TokenAddressContainer>
        </ContainerRow>
      </TokenAddressPanel>
    </MouseoverTooltip>
  )
}
