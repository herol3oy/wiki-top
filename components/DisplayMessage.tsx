interface DisplayMessageProps {
  message: string
  type: DisplayMessageType
}

export enum DisplayMessageType {
  INFO = 'info',
  DANGER = 'danger',
}

export function DisplayMessage({ message, type }: DisplayMessageProps) {
  return (
    <h6
      className={`col-span-4 mx-auto w-fit rounded-md p-5 text-center text-sm font-bold ${
        type === DisplayMessageType.INFO
          ? 'bg-blue-100 text-blue-600'
          : 'bg-red-100 text-red-600'
      }`}
    >
      {message}
    </h6>
  )
}
