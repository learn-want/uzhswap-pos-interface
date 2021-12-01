import { Trans } from '@lingui/macro'
import { Token } from '@uniswap/sdk-core'
import { useCallback, useState } from 'react'
import styled from 'styled-components/macro'

import { ButtonSecondary } from '../../components/Button'
import { ColumnCenter } from '../../components/Column'
import FaucetDropDown from '../../components/faucet/FaucetDropDown'
import FaucetTokenAddressPanel from '../../components/faucet/FaucetTokenAddressPanel'
import { RowBetween } from '../../components/Row'
import Tooltip, { MouseoverTooltip } from '../../components/Tooltip'
import {
  COINICIOUS,
  CRYPTOOFFICIALCOIN,
  INCOINGNITO,
  INTELLICOIN,
  PRIVATEPEDIA,
  UZHCRO,
  UZHSUSHI,
  UZHUNI,
} from '../../constants/tokens'
import { useFaucetContract } from '../../hooks/useContract'
import { useSingleCallResult } from '../../state/multicall/hooks'
import { TYPE } from '../../theme'
import { CustomLightSpinner } from '../../theme'

const faucetTokens: Token[] = [
  UZHUNI,
  UZHSUSHI,
  UZHCRO,
  INTELLICOIN,
  INCOINGNITO,
  COINICIOUS,
  CRYPTOOFFICIALCOIN,
  PRIVATEPEDIA,
]

const TitleRow = styled(RowBetween)`
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

const FormWrapper = styled.div`
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.bg0};
  padding: 1rem;
  border-radius: 1.25rem;
`

const Form = styled.form`
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
const Feedback = styled.p`
  color: ${({ theme }) => theme.primary1};
`

export default function Faucet() {
  const faucetContract = useFaucetContract()

  const [claimable, setClaimable] = useState<boolean>(true)
  const [claimFeedback, setClaimFeedback] = useState<string>('')
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(faucetTokens[0])
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<string>(faucetTokens[0].address)
  const faucetState = useSingleCallResult(faucetContract, 'claim', [selectedTokenAddress])

  const updateClaimTimeout = useCallback(async () => {
    setClaimable(false)
    setTimeout(() => {
      setClaimable(true)
      setClaimFeedback('')
    }, 60000)
  }, [])

  const onClaimToken = useCallback(async () => {
    if (faucetContract && faucetState.valid) {
      try {
        const claim = await faucetContract.claim(selectedTokenAddress)
        console.log('selectedTokenAddress', selectedTokenAddress, '')
        updateClaimTimeout()
        setClaimFeedback(
          `Your transaction has been submitted. This can take a moment. Afterwards, check your Meta Mask for more infos.
           \n TX Hash: ${claim.hash}`
        )
      } catch (e) {
        if (e.data.message === 'execution reverted: Faucet Timeout Limit: Try again later') {
          // button is disabled for 60 seconds after claiming
          setClaimFeedback(`Timeout Error try again in 60 seconds!`)
        } else {
          setClaimFeedback(`Error: ${e.message}`)
        }
      }
    } else {
      setClaimFeedback(`Something went wrong!`)
      throw new Error('Claim faucet did not work')
    }
  }, [])

  return (
    <>
      <Wrapper>
        <ColumnCenter style={{ justifyContent: 'center' }}>
          <TitleRow style={{ marginTop: '1rem', justifyContent: 'center', marginBottom: '2rem' }} padding={'0'}>
            <TYPE.body fontSize={'20px'} style={{ justifyContent: 'center' }}>
              <Trans>UZH Ethereum Faucet</Trans>
            </TYPE.body>
          </TitleRow>
          <FormWrapper>
            <Form>
              <div style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '30%', gap: '8px' }}>
                  <div>
                    <Trans>Select Token</Trans>
                  </div>
                  <FaucetDropDown
                    currentToken={selectedToken}
                    updateCurrentToken={setSelectedToken}
                    currentTokenAddress={selectedTokenAddress}
                    updateSelectedTokenAddress={setSelectedTokenAddress}
                    availableTokens={faucetTokens}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '70%', gap: '8px' }}>
                  <Trans>Token Contract Address</Trans>
                  <FaucetTokenAddressPanel tokenAddress={selectedTokenAddress} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}>
                  <Trans>How it works:</Trans>
                  <p>
                    You can send a request to the faucet every 60 seconds and, if not already done, import the token
                    into Metamask with the provided token contract address. If the transaction was successfull you will
                    find the claimed tokens in your MetaMask wallet.
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '30px',
                  marginBottom: '40px',
                  width: '40%',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              >
                <ButtonSecondary disabled={!claimable} style={{ width: '100%', height: '60%' }} onClick={onClaimToken}>
                  {claimable ? 'claim tokens' : 'claim timeout'}
                </ButtonSecondary>
              </div>
              <div style={{ display: 'flex', width: '60%', gap: '30px', alignItems: 'center', alignSelf: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '8px',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                >
                  <Feedback>{claimFeedback}</Feedback>
                </div>
              </div>
            </Form>
          </FormWrapper>
        </ColumnCenter>
      </Wrapper>
    </>
  )
}
