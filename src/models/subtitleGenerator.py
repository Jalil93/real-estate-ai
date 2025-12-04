import openai
import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()


def transcribeAudio(audioFile):
    """
    Transcribe audio file to subtitles using OpenAI's Whisper API
    Args:
        audioFile (str): Path to the audio file
    Returns:
        str: Transcribed text
    """


    """
    application sends GraphQL API request to transcribe video sending the video ID as parameter, which initiates subTitleGenerator python function for that video id. 
    
    subTitleGenerator 
    - retrieves video file and executes convertToAudio function or existing audio file from S3 Cloudfront bucket. 
    - sends audio file to OpenAPI Transcribe Whisper model 
    - another function processes generated subtitle file 
    - that subtitle file is added back into that same S3 Cloudfront bucket | another API call is executed to ADD_SUBTITLES with that generated srt file. 
    
    
    GraphQL GENERATE_SUBTITLE_WITH_AI --> Python subtitle generation flow --> GraphQL ADD_SUBTITLES --> send successful response to GENERATE_SUBTITLE_WITH_AI 
    
    
    In a nutshell, AI team "owns" the python model interfaces that receives GraphQL requests from the applications, retrieves relavent files if necessary from S3 or makes other Graph calls, and sends that response back to user and adds the added file to the S3 storage. 
    """
    try:
        # Check if file exists
        if not Path(audioFile).exists():
            raise FileNotFoundError(f"Audio file not found: {audioFile}")

        # Check if OpenAI API key is set
        if not os.getenv("OPENAI_API_KEY"):
            raise ValueError("OpenAI API key not found. Please set OPENAI_API_KEY environment variable")

        # Open and read the audio file
        with open(audioFile, "rb") as audio_file:
            # Call OpenAI's transcription API
            client = OpenAI()
            transcription = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                response_format="srt"  # Get output in SubRip format
            )

            return transcription

    except Exception as e:
        print(f"Error during transcription: {str(e)}")
        return None

def main():
    # Example usage
    audio_path = "//src/data/audio/VOXTAB_Academic_audio.mp3"
    subtitles = transcribeAudio(audio_path)

    if subtitles:
        # Save subtitles to a file
        output_path = Path(audio_path).with_suffix('.srt')
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(subtitles)
        print(f"Subtitles saved to: {output_path}")

if __name__ == "__main__":
    main()