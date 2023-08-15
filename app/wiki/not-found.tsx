import { DisplayMessage, DisplayMessageType } from '@/components/DisplayMessage'

export default function NotFound() {
  return (
    <DisplayMessage
      message="Page not found! Please go back to the home page."
      type={DisplayMessageType.DANGER}
    />
  )
}
