import { Trans } from '@lingui/macro'
import { Token } from '@uniswap/sdk-core'
import { useCallback, useState } from 'react'

import { ReactComponent as Logo } from '../../assets/svg/uzh-logo.svg'
import { ButtonSecondary } from '../../components/Button'
import { ColumnCenter } from '../../components/Column'
import FaucetDropDown from '../../components/faucet/FaucetDropDown'
import FaucetTokenAddressPanel from '../../components/faucet/FaucetTokenAddressPanel'
import {
  Feedback,
  Form,
  FormWrapper,
  TitleRow,
  UniIcon,
  Wrapper,
} from '../../components/faucet/styled-faucet-components'
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
import useTheme from '../../hooks/useTheme'
import { useSingleCallResult } from '../../state/multicall/hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { TYPE } from '../../theme'

/*
IMPORT TOKENS
 */

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

export default function Faucet() {
  const [darkMode] = useDarkModeManager()
  const { white, black } = useTheme()
  const faucetContract = useFaucetContract()
  const [claimable, setClaimable] = useState<boolean>(true)
  const [claimFeedback, setClaimFeedback] = useState<string>('')
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(faucetTokens[0])
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<string>(faucetTokens[0].address)
  const faucetState = useSingleCallResult(faucetContract, 'claim', [selectedTokenAddress])

  /*
  handle request timeout of 60 seconds
   */
  const updateClaimTimeout = useCallback(() => {
    setClaimable(false)
    setTimeout(() => {
      setClaimable(true)
      setClaimFeedback('')
    }, 60000)
  }, [])

  /*
  handle token claim
   */
  const onClaimToken = useCallback(async () => {
    if (faucetContract && faucetState.valid) {
      try {
        const claim = await faucetContract.claim(selectedTokenAddress)
        updateClaimTimeout()
        setClaimFeedback(
          `Your transaction has been submitted. This can take a moment. Afterwards, check your Meta Mask for more infos.
           \n TX Hash: ${claim.hash}`
        )
      } catch (e) {
        try {
          if (e.code === 4001) {
            setClaimFeedback(e.message)
          } else if (e.data.message === 'execution reverted: Faucet Timeout Limit: Try again later') {
          } else {
            console.debug('Error:', e)
            setClaimFeedback(`Error: ${e.message}`)
          }
        } catch (e) {
          setClaimFeedback(`Unexpected error: ${e}`)
        }
      }
    } else {
      setClaimFeedback(`Something went wrong!`)
    }
  }, [faucetContract, faucetState.valid, selectedTokenAddress, updateClaimTimeout])

  return (
    <>
      <Wrapper>
        <ColumnCenter style={{ justifyContent: 'center' }}>
          <TitleRow style={{ marginTop: '1rem', justifyContent: 'center', marginBottom: '1rem' }} padding={'0'}>
            <TYPE.body fontSize={'20px'} style={{ justifyContent: 'center' }}>
              <UniIcon>
                <Logo fill={darkMode ? white : black} width="175" height="100%" title="logo" />
              </UniIcon>
            </TYPE.body>
          </TitleRow>
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
                <ButtonSecondary
                  disabled={!claimable}
                  style={{ width: '100%', height: '60%' }}
                  onClick={(e) => {
                    // prevent page reload
                    e.preventDefault()
                    onClaimToken()
                  }}
                >
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
