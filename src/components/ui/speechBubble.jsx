import clsx from 'clsx'

export const SpeechBubble = ({ text, time, isBot, className }) => {
  return (
    <div
      className={clsx(
        'flex items-start gap-2.5',
        isBot ? 'rtl:justify-start' : 'justify-end',
      )}
    >
      <div
        data-aos={isBot ? 'fade-up-right' : 'fade-up-left'}
        className={clsx(
          'flex flex-col w-full max-w-[320px] p-4 border-gray-200 min-w-80',
          isBot
            ? 'rounded-e-xl rounded-es-xl bg-gray-700'
            : `rounded-s-xl rounded-se-xl bg-violet-950`,
          className,
        )}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {isBot ? 'Bot' : 'Você'}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {time}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {text}
        </p>
      </div>
    </div>
  )
}
