import { Trans } from '@lingui/macro'
import { useCallback, useState } from 'react'

import { AutoColumn } from '../Column'
import { MouseoverTooltip } from '../Tooltip'
import { ContainerRow, TokenAddress, TokenAddressContainer, TokenAddressPanel } from './styled-faucet-components'

export default function FaucetTokenAddressPanel({ tokenAddress }: { tokenAddress: string }) {
  const [tooltipText, setTooltipText] = useState<string>('Click to copy to clipboard.')

  const copiedFeedback = useCallback(async () => {
    await navigator.clipboard.writeText(tokenAddress)
    const beforeTooltipText = tooltipText
    setTooltipText('COPIED TO CLIPBOARD!')
    setTimeout(() => {
      setTooltipText(beforeTooltipText)
    }, 2000)
  }, [tokenAddress, tooltipText])

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
