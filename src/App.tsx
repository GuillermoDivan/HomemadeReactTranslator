import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Stack, FormText } from 'react-bootstrap';
import './App.css';
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/icons';
import { useStore } from './hooks/useStore';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { translateText } from './services/translate';
import { useEffect } from 'react';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const {fromLanguage, toLanguage, fromText, result, loading,
    interchangeLaguages, setFromLaguage, setToLaguage,
    setFromText, setResult} = useStore()

  const debouncedFromText = useDebounce(fromText, 400);

  useEffect(() => {
    if (fromText === ''|| fromLanguage === toLanguage) return;
      translateText(debouncedFromText, toLanguage)
      .then(result => {
        if (result == null) return;
        setResult(result);
      })
      .catch(()=>{setResult('Error')})
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }


  return (
    <Container fluid>
      <h1>Homemade Translator</h1>

      <Row>
        <Col>
        <Stack gap={2}>
          <LanguageSelector type={SectionType.From} value={fromLanguage}
          onChange={setFromLaguage}/>
          <TextArea
          type = {SectionType.From}
          value = {fromText}
          onChange = {setFromText}
          />
        </Stack>
        </Col>

        <Col xs='auto' >
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLaguages}> <ArrowsIcon /> </Button>
        </Col>
        
        <Col>
        <Stack gap={2}>
          <LanguageSelector type={SectionType.To} value={toLanguage}
          onChange={setToLaguage}/>
          <div style={{position: 'relative'}} >
          <TextArea 
          loading = {loading}
          type = {SectionType.To}
          value = {result}
          onChange = {setResult}
           />
           <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
            <Button
              variant='link'
              onClick={handleClipboard}>
                <ClipboardIcon />
            </Button>
            <Button
              variant='link'
              onClick={handleSpeak}>
                <SpeakerIcon />
            </Button>
            </div>
          </div>
        </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
