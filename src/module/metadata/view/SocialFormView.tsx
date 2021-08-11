import { Button, TextField } from '@material-ui/core'
import { last } from 'lodash'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useState } from 'react'

import { getKeys } from '../../../lib/typescript/getKeys'
import { useStrings } from '../../locale/useStrings'

interface SocialFormViewProps {
  onChanges: (socials: string[]) => void
}

export const SocialFormView = observer<SocialFormViewProps>(({ onChanges }) => {
  const strings = useStrings()

  const [socials, setSocials] = useState<{ [key in number]: string }>({ 0: '' })

  useEffect(() => {
    onChanges(Object.values(socials))
  }, [onChanges, socials])

  return (
    <div>
      {getKeys(socials).map((key, index) => {
        const socialText = socials[key]

        return (
          <TextField
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            label={strings.link}
            value={socialText}
            onChange={(e) =>
              setSocials((prev) => ({
                ...prev,
                [key]: e.target.value,
              }))
            }
          />
        )
      })}
      <Button
        onClick={() => {
          const lastItemKey = last(getKeys(socials))
          if (!!lastItemKey) {
            const lastItemValue = socials[lastItemKey]
            if (!!lastItemValue) {
              setSocials((prev) => ({
                ...prev,
                [lastItemKey + 1]: '',
              }))
            }
          }
        }}
      >
        {strings.actions.add}
      </Button>
    </div>
  )
})
