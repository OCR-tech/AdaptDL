def record_audio(duration=5):
    import pyaudio
    import wave

    audio = pyaudio.PyAudio()
    stream = audio.open(format=pyaudio.paInt16, channels=1, rate=44100, input=True, frames_per_buffer=1024)

    frames = []

    for _ in range(0, int(44100 / 1024 * duration)):
        data = stream.read(1024)
        frames.append(data)

    stream.stop_stream()
    stream.close()
    audio.terminate()

    wave_file = wave.open("output.wav", 'wb')
    wave_file.setnchannels(1)
    wave_file.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
    wave_file.setframerate(44100)
    wave_file.writeframes(b''.join(frames))
    wave_file.close()


def recognize_audio():
    import speech_recognition as sr

    recognizer = sr.Recognizer()
    with sr.AudioFile("output.wav") as source:
        audio_data = recognizer.record(source)
        try:
            command = recognizer.recognize_google(audio_data)
            return command
        except sr.UnknownValueError:
            return "Could not understand audio"
        except sr.RequestError as e:
            return f"Could not request results from Google Speech Recognition service; {e}"


def process_voice_command():
    record_audio()
    command = recognize_audio()
    return command