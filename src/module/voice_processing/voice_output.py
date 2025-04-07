import pyttsx3
import threading

# Initialize the pyttsx3 engine
engine = pyttsx3.init()


# Create a lock for thread-safe access to the engine
engine_lock = threading.Lock()


def speak(text):
    """Convert text to speech."""
    with engine_lock:
        engine.setProperty('rate', 300)         # Set speech rate
        # engine.setProperty('volume', 1)       # Set volume level
        engine.say(text)
        engine.runAndWait()

def on_volumn():
    print('=== on_volumn ===')
    engine.setProperty('volume', 1)   

def off_volumn():
    print('=== off_volumn ===')
    engine.setProperty('volume', 0)      

def set_volumn():
    print('=== set_volumn ===')
    engine.setProperty('volume', 0.5)      