import { Fragment } from 'react'

import { DisplayMessage, DisplayMessageType } from '@/components/DisplayMessage'
import SelectForm from '@/components/SelectForm'

export default function Home() {
  return (
    <Fragment>
      <SelectForm />
      <DisplayMessage
        message="Select a language and date then press the search button to see the
        Wiki Top Articles of that language and date."
        type={DisplayMessageType.INFO}
      />
    </Fragment>
  )
}
