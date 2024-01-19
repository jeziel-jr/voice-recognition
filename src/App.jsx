import { SpeechBubble } from './components/ui/speechBubble'
import useSpeechRecognition from './hooks/useSpeechRecognitionHooks'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import clsx from 'clsx'
import { useEffect } from 'react'

export function App() {
  const {
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
    firstPersonMessages,
    isLoading,
  } = useSpeechRecognition()

  useEffect(() => {
    AOS.init()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'm' && !isListening) {
        startListening()
      }
    }

    const handleKeyUp = (event) => {
      if (event.key === 'm' && isListening) {
        stopListening()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isListening, startListening, stopListening])

  return (
    <div
      className="flex w-full h-screen justify-center items-center flex-col gap-4 bg-zinc-700 px-8"
      onKeyDown={startListening}
      onKeyUp={stopListening}
    >
      {hasRecognitionSupport ? (
        <>
          <div className="bg-zinc-900 min-h-[90dvh] w-full rounded px-3 py-3 flex flex-col gap-4 justify-end overflow-hidden">
            {firstPersonMessages.map(({ text, isBot, time, index }) => (
              <SpeechBubble key={index} text={text} time={time} isBot={isBot} />
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <p
              className={clsx(
                'text-2xl',
                isListening ? 'animate-pulse text-teal-400' : 'text-white',
              )}
            >
              Pressione e segure &quot;M&quot; para falar
            </p>
          </div>
        </>
      ) : (
        <p>
          Desculpe, parece que seu navegador não suporta esta ferramenta. Por
          favor, tente usar um navegador baseado em Chromium para uma melhor
          experiência. Obrigado!
        </p>
      )}
    </div>
  )
}
