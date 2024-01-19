/* eslint-disable no-undef */
/* eslint-disable new-cap */

import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'

let recognition = null
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.lang = 'pt-BR'
}

const useSpeechRecognition = () => {
  const [text, setText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [firstPersonMessages, setFirstPersonMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { speak, cancel, voices } = useSpeechSynthesis()

  const postGpt = async (params) => {
    setIsLoading(true)
    try {
      const {
        data: { message },
      } = await axios.post('http://localhost:3000/api/gpt', {
        params,
      })

      setFirstPersonMessages((prevMessages) => [
        ...prevMessages,
        {
          index: prevMessages.length,
          text: message,
          isBot: true,
          time: moment().format('HH:mm'),
        },
      ])
      speak({
        text: message,
        rate: 1.2,
        volume: 1,
        voice: voices[16],
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!recognition) return

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setText(text)
      postGpt(text)
      setFirstPersonMessages((prevMessages) => [
        ...prevMessages,
        {
          index: prevMessages.length,
          text,
          isBot: false,
          time: moment().format('HH:mm'),
        },
      ])

      recognition.stop()
    }
  }, [recognition, firstPersonMessages])

  const startListening = () => {
    cancel()
    setText(' ')
    setIsListening(true)
    recognition.start()
  }

  const stopListening = () => {
    setIsListening(false)
    recognition.stop()
  }

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
    firstPersonMessages,
    isLoading,
  }
}

export default useSpeechRecognition
