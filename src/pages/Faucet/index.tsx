import { Trans } from '@lingui/macro'
import { useState } from 'react'
import styled from 'styled-components/macro'

import { ButtonSecondary } from '../../components/Button'
import { ColumnCenter } from '../../components/Column'
import FaucetDropDown from '../../components/faucet/FaucetDropDown'
import FaucetTokenAddressPanel from '../../components/faucet/FaucetTokenAddressPanel'
import { RowBetween } from '../../components/Row'
import { useFaucetContract } from '../../hooks/useContract'
import { useSingleCallResult } from '../../state/multicall/hooks'
import { TYPE } from '../../theme'

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

const faucetTokens = [
  {
    name: 'UzhUniToken',
    address: '0xd0948BF75F37679ae6F10589a05E014A8Bd70630',
  },
  {
    name: 'UZHSushi',
    address: '0x2FBD50A221E7fD24270ef3EbA9357f4ef01b6C85',
  },
  {
    name: 'UZHCro',
    address: '0xbc03c6fB1fCe0027C21126a51c6175890971A2F9',
  },
  {
    name: 'Incoingnito',
    address: '0x82299e7E86353B248aeAe9Eb453953edAef7385d',
  },
  {
    name: 'Intellicoin',
    address: '0x856E6FB873282A59aA6fE32e013e3e1f4438c6A8',
  },
  {
    name: 'Privatepedia',
    address: '0xE93f4F6ff8E841649C762D8f50f3a9acb1B67758',
  },
  {
    name: 'Coinicious',
    address: '0x388EE3B1843254A0D266392bD3bD0Ad95E86C8CF',
  },
  {
    name: 'Cryptofficialcoin',
    address: '0xbA2AFd13C87011AaA12B6370c29590c3e29B59C8',
  },
]

export default function Faucet() {
  const faucetContract = useFaucetContract()

  const [selectedToken, setSelectedToken] = useState(faucetTokens[0].name)
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(faucetTokens[0].address)
  const faucetState = useSingleCallResult(faucetContract, 'claim', [selectedTokenAddress])

  const claimTokenFaucet = async () => {
    if (faucetContract && faucetState.valid) {
      await faucetContract.claim(selectedTokenAddress)
    } else {
      throw new Error('Claim faucet did not work')
    }
  }

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
              <div style={{ display: 'flex', width: '100%', gap: '30px', alignItems: 'center' }}>
                <ButtonSecondary style={{ width: '30%', height: '60%' }} onClick={claimTokenFaucet}>
                  Send request!
                </ButtonSecondary>
                <div style={{ width: '70%' }}>
                  <Trans>How it works</Trans>
                  <p>
                    You can send a Faucet request every 60 seconds and, if not already done, import the token into
                    Metamask with the provided token contract address
                  </p>
                </div>
              </div>
            </Form>
          </FormWrapper>
        </ColumnCenter>
      </Wrapper>
    </>
  )
}
